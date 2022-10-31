import React, { useState, useEffect } from 'react';
import config from '../../config.json';

import Tooltip from '../tooltip';
import Card from '../card';
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

import styles from './style.module.css';

const today = new Date();
const until = today.toISOString().split('T')[0];
const since = new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0];

const DashboardChart = ({ link, linkLabel, type, metric, apiName, period='day' }) => {
  const [isShown, setIsShown] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      },
    ],
  });

  const formatTimestampToDate = (timestamp) => {
    return timestamp.split('T')[0];
  }

  const formatMetricName = (metricName) => {
    const wordArr = metricName.split('_');
    const capitalizedWordArr = wordArr.map(word => word[0].toUpperCase() + word.substr(1));
    return capitalizedWordArr.join(' ');
  }

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';

    let color = '#';
    while (color.length < 7) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const dataChangedHandler = (apiData) => {
    const datasets = [];
    for (const metric of apiData) {
      const color = generateRandomColor();
      const dataset = {
        data: [],
        label: metric.name,
        backgroundColor: color,
        borderColor: color
      };

      if (type === 'single_number') {
        const item = metric.values.pop();
        dataset.data.push(item.value);
      } else {
        dataset.data = metric.values.map(item => item.value);
      }

      datasets.push(dataset);
    }

    const labels = [];
    for (const { end_time } of apiData[0].values) {
      labels.push(formatTimestampToDate(end_time));
    }

    setChartData((curInputValues) => {
      return {
        ...curInputValues,
        datasets: datasets,
        labels: labels,
        // what should we do when there are lots of different metrics in the same chart?
        title: apiData[0].title,
        name: apiData[0].name,
        description: apiData[0].description
      };
    });

  }

  const getInsightsMetrics = async (metric) => {
    try {
      const url = `http://localhost:3000/api/${apiName}`;
      const body = JSON.stringify({ metric, since, until, period });
      const res = await fetch(url, { method: 'POST', body });
      const { data } = await res.json();
      dataChangedHandler(data);
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
          { chartData.datasets[0].data.length > 0 && <Card>
            <h1 className={styles.chartTitle}> { formatMetricName(chartData.name) }</h1>
            { type === 'line' && <Line className={styles.container} data={chartData} /> }
            { type === 'bar' && <Bar data={chartData} /> }
            { type === 'single_number'
                && <div>
                  <p className={styles.singleNumber}>{chartData.datasets[0].data[0]} fans</p>
                  <p className={styles.singleNumberDesc}>{chartData.description}</p>
                </div>
            }
            { isShown && type !== 'single_number' && <Tooltip
                title={chartData.name}
                description={chartData.description}
                link={link}
                linkLabel={linkLabel}/>
            }
          </Card>
        }
    </div>
  );
}

export default DashboardChart;
