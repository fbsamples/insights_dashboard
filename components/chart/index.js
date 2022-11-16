import React, { useState, useEffect } from 'react';

import * as AntDesignIcons from "react-icons/ai";
import { Line, Bar } from "react-chartjs-2";

import AggregateByProperty from '../aggregate-by-property';
import Card from '../card';
import Chart from "chart.js/auto";
import SingleNumber from '../single-number';
import ErrorCard from '../error-card';
import Tooltip from '../tooltip';

import { capitalizeAll } from '../../utils/strings';
import { formatTimestampToDate, getLast30DaysInterval } from '../../utils/date';
import { generateRandomColor } from '../../utils/color';

import settings from '../../constants/settings.json';
import styles from './style.module.css';

const DashboardChart = ({ link, linkLabel, type, metric, apiName, icons, title, description, period='day' }) => {
  const { since, until } = getLast30DaysInterval();

  const [isShown, setIsShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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

      if (Number.isInteger(el.value)) {
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
    return data.values.map(({ end_time }) => {
      return formatTimestampToDate(end_time);
    });
  }

  const dataChangedHandler = (apiData) => {

    const datasets = [];
    for (const metric of apiData) {
      const series = createSeriesMap(metric);

      for (const [seriesName, dataset] of series) {
        dataset.loaded = true;
        datasets.push(dataset);
      }
    }

    const firstSeries = apiData[0];
    const labels = getLabels(firstSeries);

    setChartData((curInputValues) => {
      return {
        ...curInputValues,
        datasets: datasets,
        labels: labels,
        title: title || firstSeries.title,
        name: firstSeries.name,
        description: description || firstSeries.description
      };
    });

  }

  const getInsightsMetrics = async (metric) => {
    try {
      const url = `${settings.backendUrl}/api/${apiName}`;
      const body = JSON.stringify({ metric, since, until, period });
      const res = await fetch(url, { method: 'POST', body });
      const { data, error } = await res.json();

      if (data) {
        dataChangedHandler(data);
      } else {
        setErrorMessage(error.message.substr(6));
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInsightsMetrics(metric);
  }, []);

  return (
    <div
      className={styles.mainDiv}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
          { chartData.datasets[0].loaded && <Card>

            <h1 className={styles.chartTitle}> { capitalizeAll(chartData.title) }</h1>
            <p className={styles.metricName}> ({ chartData.name }) </p>

            { type === 'line' && <Line data={chartData} /> }
            { type === 'bar' && <Bar data={chartData} /> }
            { type === 'single_number' && <SingleNumber data={chartData} icons={icons} /> }
            { type === 'aggregate_by_property' && <AggregateByProperty datasets={chartData.datasets} icons={icons} /> }

            { isShown && type !== 'single_number' && <Tooltip
                title={title || chartData.name}
                description={chartData.description}
                link={link}
                linkLabel={linkLabel}/>
            }
          </Card>
        }
        { errorMessage && <ErrorCard icon="AiFillInfoCircle"> {errorMessage}</ErrorCard> }
    </div>
  );
}

export default DashboardChart;
