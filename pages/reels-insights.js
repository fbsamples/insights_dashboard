import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import ErrorCard from '../components/error-card';
import Section from '../components/section';
import VideoCard from '../components/video-card';

import { selectInsights } from '../utils/data-formatting';

import reelsInsights from '../constants/reels-insights.json';
import errorMessages from '../constants/error-messages.json';

import styles from '../styles/style.module.css';

const ReelsInsights = () => {
  const section = reelsInsights.sections[0];
  const reelsInsightsData = useSelector(state => state.reelsInsights);
  const error = useSelector(state => state.error.reelsInsights);

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
      key={`${el.id.toString()}-${videoData.id}`}
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
    { error
      ? <ErrorCard icon="AiFillWarning" error={error}/>
      : <Section title={section.title} subtitle={section.subtitle} key={section.title}>
          { reelsInsightsData.length === 0 && <ErrorCard message={errorMessages.noReelsAvailable}/>}
          <div className={styles.rowContainer}>
            { reelsInsightsData.map(reelData => {
                return renderReelInsights(reelData);
              })
            }
          </div>
        </Section>
    }
  </div>;
}

export default ReelsInsights;
