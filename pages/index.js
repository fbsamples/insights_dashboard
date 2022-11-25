import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

import Card from '../components/card';
import PageInsights from './page-insights';
import VideoInsights from './video-insights';
import ReelsInsights from './reels-insights';
import InstagramInsights from './instagram-insights';

import { getLast30DaysInterval } from '../utils/date';

import settings from '../constants/settings.json';
import pageInsights from '../constants/page-insights.json';
import reelsInsights from '../constants/reels-insights.json';
import videoInsights from '../constants/video-insights.json';
import instagramInsights from '../constants/instagram-insights.json';
import instagramMediaInsights from '../constants/instagram-media-insights.json';

import styles from '../styles/style.module.css';

const Home = () => {
  const { since, until } = getLast30DaysInterval();
  const period = 'day';

  const [activeTab, setActiveTab] = useState('tab1');
  const dispatch = useDispatch();

  const getInsights = async (apiName, metric, stateName, video) => {
    try {
      const url = `${settings.backendUrl}/api/${apiName}`;

      const bodyObj = { metric: metric.join(','), since, until, period };
      if (video) bodyObj.videoId = video.id;

      const body = JSON.stringify(bodyObj);
      const res = await fetch(url, { method: 'POST', body });
      const response = await res.json();
      if (!video) console.log(response);
      if (response.data && response.data.length > 0) {
        if (video) {
          if (stateName === 'instagramMediaInsights') console.log(video, response.data);
          dispatch({ type: stateName, payload: { ...video, insights: response.data } });
        } else {
          console.log(stateName, response.data);
          dispatch({ type: stateName, payload: response.data });
        }
      }

      // @Natalie I thought we could do the error treatment here
      // in case response.error exists...
      // any suggestion on how could we deal with this?

    } catch (err) {
      console.log(err);
    }
  };

  const getMediasAndTheirInsights = async (insightsObj, apiEndpoint, stateName) => {
    try {
      const url = `${settings.backendUrl}/api/${apiEndpoint}`;
      const res = await fetch(url);
      const { data, error } = await res.json();

      if (data) {
        for (const media of data) {
          getInsights(insightsObj.apiName, insightsObj.metrics, stateName, media);
        }
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load Page Insights
    getInsights(pageInsights.apiName, pageInsights.metrics, 'pageInsights');

    // Load Reels and their Insights
    getMediasAndTheirInsights(reelsInsights, 'get-reels-posts', 'reelsInsights');

    // Load Video Insights
    getMediasAndTheirInsights(videoInsights, 'get-videos', 'videoInsights');

    // Load Instagram Insights
    getInsights(instagramInsights.apiName, instagramInsights.metrics, 'instagramInsights');

    // Load Instagram Media and their Insights
    getMediasAndTheirInsights(instagramMediaInsights, 'get-ig-media', 'instagramMediaInsights');
  }, []);


  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.tabs}>
          <ul className={styles.nav}>
            <li className={activeTab === 'tab1' ? styles.active : ''} onClick={() => setActiveTab('tab1')}>Page Insights</li>
            <li className={activeTab === 'tab2' ? styles.active : ''} onClick={() => setActiveTab('tab2')}>Reels Insights</li>
            <li className={activeTab === 'tab3' ? styles.active : ''} onClick={() => setActiveTab('tab3')}>Video Insights</li>
            <li className={activeTab === 'tab4' ? styles.active : ''} onClick={() => setActiveTab('tab4')}>Instagram Insights</li>
          </ul>
          <div>
            {activeTab === 'tab1' && <PageInsights/>}
            {activeTab === 'tab2' && <ReelsInsights/>}
            {activeTab === 'tab3' && <VideoInsights/>}
            {activeTab === 'tab4' && <InstagramInsights/>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home;
