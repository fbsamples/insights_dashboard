import React, { useState, useEffect } from 'react';
import config from '../../config.json';

import Tooltip from '../tooltip';
import Card from '../card';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import styles from './style.module.css';

// mudar para os últimos 30 dias
const since = '2022-06-01';
const until = '2022-06-24';

const DashboardChart = ({ link, linkLabel, type, metric }) => {
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
    return timestamp.split(`T`)[0];
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

      for (const item of metric.values) {
        if (Number.isInteger(item.value)) {
          dataset.data.push(item.value);
        } else {
          // this is due to page_daily_video_ad_break_earnings_by_crosspost_status
          // metric, that has a different response type
          dataset.data.push(item.value.owned);
        }
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

  const getPageInsights = async (metric) => {
    try {
      const url = `https://graph.facebook.com/${config.page_id}/insights?metric=${metric}&period=day&since=${since}&until=${until}&access_token=${config.page_access_token}`;
      console.log(url);
      const res = await fetch(url);
      const { data } = await res.json();
      console.log(data);
      dataChangedHandler(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPageInsights(metric);
  }, []);

  return (
    <div className={styles.container}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
          { chartData.datasets[0].data.length > 0 && <Card>
            { chartData.name }
            <Line data={chartData} />
            { isShown && <Tooltip
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
