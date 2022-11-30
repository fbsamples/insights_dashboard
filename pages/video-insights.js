import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import ErrorCard from '../components/error-card';
import Section from '../components/section';
import VideoCard from '../components/video-card';

import { selectInsights } from '../utils/data-formatting';

import videoInsights from '../constants/video-insights';
import settings from '../constants/settings';

import styles from '../styles/style.module.css';

const VideoInsights = () => {
  const videoInsightsData = useSelector(state => state.videoInsights);
  const videoInsightsError = useSelector(state => state.videoInsightsError);

  const section = videoInsights.sections[0];

  const renderVideoInsights = (videoData) => {
    return <VideoCard key={videoData.id} video={videoData}>
        { section.charts.map(el => {
            return renderChart(el, videoData);
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
      description={videoInsights.docs.description}
      link={videoInsights.docs.link}
      linkLabel={videoInsights.docs.linkLabel}/>
    { videoInsightsError && <ErrorCard icon="AiFillWarning" error={videoInsightsError}/> }
    { !videoInsightsError && <Section title={section.title} key={section.title}>
        <div className={styles.rowContainer}>
          { videoInsightsData.map(videoData => {
              return renderVideoInsights(videoData);
            })
          }
        </div>
      </Section>
    }
  </div>;
}

export default VideoInsights;
