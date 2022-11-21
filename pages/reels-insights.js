import React, { useState, useEffect } from 'react';
import Section from '../components/section';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import VideoCard from '../components/video-card';
import styles from '../styles/style.module.css';

import settings from '../constants/settings.json';
import reelsInsights from '../constants/reels-insights.json';

const ReelsInsights = () => {
  const [reels, setReels] = useState([]);
  const section = reelsInsights.sections[0];

  const getReels = async (signal) => {
    try {
      const url = `${settings.backendUrl}/api/get-reels-posts`;
      const res = await fetch(url, { signal });
      const { data, error } = await res.json();

      if (data) {
        setReels(data);
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
    getReels(signal);
    return () => controller.abort();
  }, []);

  const renderReelInsights = (video) => {
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
      description={reelsInsights.docs.description}
      link={reelsInsights.docs.link}
      linkLabel={reelsInsights.docs.linkLabel}/>
    <Section title={section.title} key={section.title}>
      <div className={styles.rowContainer}>
        { reels.map(reel => {
            return renderReelInsights(reel);
          })
        }
      </div>
    </Section>
  </div>;
}

export default ReelsInsights;
