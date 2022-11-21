import React, { useState, useEffect } from 'react';

import { Line, Bar, Pie } from "react-chartjs-2";

import AggregateByProperty from '../aggregate-by-property';
import Card from '../card';
import Chart from "chart.js/auto";
import SingleNumber from '../single-number';
import DoubleNumber from '../double-number';
import ErrorCard from '../error-card';
import Tooltip from '../tooltip';

import { capitalizeAll } from '../../utils/strings';
import { formatTimestampToDate, getLast30DaysInterval } from '../../utils/date';
import { generateRandomColor, generateRandomColorArray } from '../../utils/color';

import constants from '../../constants/constants.json';
import settings from '../../constants/settings.json';
import styles from './style.module.css';

const DashboardChart = ({ link, linkLabel, type, metric, apiName, icons, title, description, videoId, labels, plural, wrapMetricName, period='day' }) => {
  const { since, until } = getLast30DaysInterval();

  const [isShown, setIsShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [tooltipInfo, setToolTipInfo] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      },
    ],
  });

  const createDefaultDataset = (label, size) => {
    const color = generateRandomColor();
    const dataset = {
      data: Array(size).fill(0),
      label: label,
      backgroundColor: color,
      borderColor: color,
      loaded: false
    };

    return dataset;
  }

  const updateMap = (seriesMap, seriesName, element, index) => {
    const dataset = seriesMap.get(seriesName);
    dataset.data[index] = element;
    seriesMap.set(seriesName, dataset);
  }

  const createSeriesMap = (metric) => {
    const seriesMap = new Map();
    const size = metric.values.length;

    for (let i = 0; i < size; i++) {

      const el = metric.values[i];
      if (!isNaN(el.value)) {
        const standardSeriesName = 'value';
        if (!seriesMap.has(standardSeriesName)) {
          const dataset = createDefaultDataset(metric.name, size);
          seriesMap.set(standardSeriesName, dataset);
        }
        updateMap(seriesMap, standardSeriesName, el.value, i);
      }

      for (const property in el.value) {
        if (!seriesMap.has(property)) {
          const dataset = createDefaultDataset(property, size);
          seriesMap.set(property, dataset);
        }
        updateMap(seriesMap, property, el.value[property], i);
      }
    }

    return seriesMap;
  }

  const getLabels = (data) => {
    return data.values.map((value)  => {
      if (value.end_time) return formatTimestampToDate(value.end_time);
      if (Object.keys(value.value).length > 0) {
        return [...Object.keys(value.value)];
      }
      return data.name;
    }).flat();
  }

  const formatDataForPieChart = (datasets) => {
      const completeDataset = createDefaultDataset('default', 0);

      for (const dataset of datasets) {
        completeDataset.data.push(dataset.data[0]);
      }

      delete(completeDataset.borderColor);
      completeDataset.backgroundColor = generateRandomColorArray(completeDataset.data.length);
      completeDataset.loaded = true;

      return completeDataset;
  }

  const dataChangedHandler = (apiData) => {

    let datasets = [];
    for (const metric of apiData) {
      const series = createSeriesMap(metric);
      for (const [seriesName, dataset] of series) {
        dataset.loaded = true;
        datasets.push(dataset);
      }
    }

    if (type === 'pie') {
      const newDataset = formatDataForPieChart(datasets);
      datasets = [];
      datasets.push(newDataset);
    }

    const firstSeries = apiData[0];
    const chartLabels = getLabels(firstSeries);

    setToolTipInfo(apiData);
    setChartData((curInputValues) => {
      return {
        ...curInputValues,
        datasets: datasets,
        labels: chartLabels,
        title: title || firstSeries.title,
        name: metric,
        description: description || firstSeries.description,
      };
    });

  }

  const getInsightsMetrics = async (metric, signal) => {
    try {
      const url = `${settings.backendUrl}/api/${apiName}`;
      const body = JSON.stringify({ metric, since, until, period, videoId });
      const res = await fetch(url, { method: 'POST', body, signal });
      const response = await res.json();

      if (response.data && response.data.length > 0) {
        dataChangedHandler(response.data);
      } else {
        setErrorMessage(response.error.message.substr(6));
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getInsightsMetrics(metric, signal);
    return () => controller.abort();
  }, []);

  return (
    <div
      className={styles.mainDiv}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
          { chartData.datasets.length > 0 && chartData.datasets[0].loaded && <Card shadow={apiName !== 'video-insights'}>

            <h1 className={styles.chartTitle}> { capitalizeAll(chartData.title) }</h1>
            <div className={`${styles.metricName} ${wrapMetricName ? styles.wrap : ''}`} title={chartData.name}> ({ chartData.name }) </div>

            { type === 'line' && <Line data={chartData} /> }
            { type === 'bar' && <Bar data={chartData} options={settings.barChart} /> }
            { type === 'pie' && <Pie data={chartData} options={settings.pieChart} height={250} width={400}/> }
            { type === 'single_number' && <SingleNumber data={chartData} icons={icons} labels={labels}/> }
            { type === 'double_number' && <DoubleNumber datasets={chartData.datasets} icons={icons} labels={labels}/> }
            { type === 'aggregate_by_property' && <AggregateByProperty datasets={chartData.datasets} plural={plural} icons={icons} /> }

            { isShown && type !== 'single_number' && <Tooltip info={tooltipInfo}/> }
          </Card>
        }
        { errorMessage && <ErrorCard icon="AiFillInfoCircle"> {errorMessage} </ErrorCard> }
    </div>
  );
}

export default DashboardChart;
