import React, { useState, useEffect } from 'react';

import Section from '../components/section';
import DocumentationLink from '../components/documentation-link';
import DashboardChart from '../components/chart';
import VideoCard from '../components/video-card';

import { formatTimestampToDateAndTime } from '../utils/date';

import videoInsights from '../constants/video-insights';
import settings from '../constants/settings';

import styles from '../styles/style.module.css';

const VIDEO_METRIC = 'total_video_view_total_time';

const VideoInsights = () => {
  const [videos, setVideos] = useState([]);
  const section = videoInsights.sections[0];

  const getOnlyNonReelVideos = async (data) => {
    const nonReels = [];
    for (const video of data) {
      const isNotReel = await getInsights(video.id);
      if (isNotReel) {
        setVideos((currVideos) => { return [...currVideos, video] });
      }
    }
  }

  const getInsights = async (videoId) => {
    try {
      const url = `${settings.backendUrl}/api/video-insights`;
      const body = JSON.stringify({ metric: VIDEO_METRIC, videoId });
      const res = await fetch(url, { method: 'POST', body });
      const response = await res.json();

      if (response.data) {
        return response.data.length > 0;
      }

      return false;

    } catch (err) {
      console.log(err);
    }
  }

  const getVideos = async (signal) => {
    try {
      const url = `${settings.backendUrl}/api/get-videos`;
      const res = await fetch(url, { signal });
      const { data, error } = await res.json();
      if (data) {
        await getOnlyNonReelVideos(data);
      } else {
        setErrorMessage(error.message.substr(6));
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getVideos(signal);
    return () => controller.abort();
  }, []);

  const renderVideoInsights = (video) => {
    return <VideoCard key={video.id} video={video}>
        { section.metrics.map(el => {
            return renderChart(el, video.id);
          })
        }
    </VideoCard>
  }

  const renderChart = (el, videoId) => {
    return <DashboardChart
      key={el.id.toString()}
      size={el.size}
      apiName={el.apiName}
      type={el.type}
      metric={el.metric}
      title={el.title}
      description={el.description}
      icons={el.icons}
      labels={el.labels}
      plural={el.plural}
      wrapMetricName={el.wrapMetricName}
      videoId={videoId}>
    </DashboardChart>;
  }

  return <div>
    <DocumentationLink
      description={videoInsights.docs.description}
      link={videoInsights.docs.link}
      linkLabel={videoInsights.docs.linkLabel}/>
    <Section title={section.title} key={section.title}>
      <div className={styles.rowContainer}>
        { videos.map(video => {
            return renderVideoInsights(video);
          })
        }
      </div>
    </Section>
  </div>;
}

export default VideoInsights;
