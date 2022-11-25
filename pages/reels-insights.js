import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Section from '../components/section';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import VideoCard from '../components/video-card';
import styles from '../styles/style.module.css';

import { selectInsights } from '../utils/data-formatting';

import settings from '../constants/settings.json';
import reelsInsights from '../constants/reels-insights.json';

const ReelsInsights = () => {
  const section = reelsInsights.sections[0];
  const reelsInsightsData = useSelector(state => state.reelsInsights);

  const renderReelInsights = (reelData) => {
    return <VideoCard key={reelData.id} video={reelData}>
       { section.charts.map(el => {
            return renderChart(el, reelData);
          })
        }
    </VideoCard>
  }

  const renderChart = (el, videoData) => {
    return <DashboardChart
      key={el.id.toString()+videoData.id}
      size={el.size}
      type={el.type}
      insights={selectInsights(el.metrics, videoData.insights)}
      metrics={el.metrics}
      title={el.title}
      description={el.description}
      icons={el.icons}
      labels={el.labels}
      plural={el.plural}
      wrapMetricName={el.wrapMetricName}
      videoId={videoData.id}>
    </DashboardChart>;
  }

  return <div>
    <DocumentationLink
      description={reelsInsights.docs.description}
      link={reelsInsights.docs.link}
      linkLabel={reelsInsights.docs.linkLabel}/>
    <Section title={section.title} key={section.title}>
        <div className={styles.rowContainer}>
          { reelsInsightsData.length > 0 && reelsInsightsData.map(reelData => {
              return renderReelInsights(reelData);
            })
          }
        </div>
    </Section>
  </div>;
}

export default ReelsInsights;
