import React, { useState, useEffect } from 'react';

import { Line, Bar, Pie } from "react-chartjs-2";

import AggregateByProperty from '../aggregate-by-property';
import Card from '../card';
import Chart from "chart.js/auto";
import DoubleNumber from '../double-number';
import ErrorCard from '../error-card';
import SingleNumber from '../single-number';
import SkeletonChart from '../skeleton-chart';
import Tooltip from '../tooltip';

import { capitalizeAll } from '../../utils/strings';
import { formatTimestampToDate, getLast30DaysInterval } from '../../utils/date';
import { generateRandomColor, generateRandomColorArray } from '../../utils/color';

import errors from '../../constants/error-messages.json';
import settings from '../../constants/settings.json';
import styles from '../chart/style.module.css';
import types from '../../constants/chart-types.json';

const DashboardChart = ({ type, insights, metrics, icons, title, wrapMetricName, loading, size, period='day' }) => {
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

  const formatData = (apiData) => {

    let datasets = [];
    for (const metric of apiData) {
      const series = createSeriesMap(metric);
      for (const [seriesName, dataset] of series) {
        dataset.loaded = true;
        datasets.push(dataset);
      }
    }

    if (type === types.pie) {
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
        name: metrics.join(','),
      };
    });

  }

  useEffect(() => {
    if (loading) return;
    if (insights.length === 0) {
      setErrorMessage({ message: errors.metricNotAvailable });
      return;
    }

    formatData(insights);
  }, [insights, loading]);

  return (
    <div
      className={styles.mainDiv}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
          { chartData.datasets.length > 0 && chartData.datasets[0].loaded && <Card shadow={false} id={`chart-${chartData.name}`}>
            <h1 className={styles.chartTitle}> { capitalizeAll(chartData.title) }</h1>
            <div className={`${styles.metricName} ${wrapMetricName ? styles.wrap : ''}`} title={chartData.name}> ({ chartData.name }) </div>

            { type === types.line && <Line data={chartData} /> }
            { type === types.bar && <Bar data={chartData} options={settings.barChart} /> }
            { type === types.pie && <Pie data={chartData} options={settings.pieChart} height={250} width={400}/> }
            { type === types.singleNumber && <SingleNumber data={chartData} icons={icons} labels={labels}/> }
            { type === types.doubleNumber && <DoubleNumber datasets={chartData.datasets} icons={icons} labels={labels}/> }
            { type === types.aggregateByProperty && <AggregateByProperty datasets={chartData.datasets} plural={plural} icons={icons} /> }

            { isShown && type !== types.singleNumber && <Tooltip info={tooltipInfo}/> }
          </Card>
        }
        { errorMessage && <ErrorCard icon='AiFillInfoCircle' error={errorMessage} /> }
        { loading && <SkeletonChart size={size}/> }
    </div>
  );
}

export default DashboardChart;
