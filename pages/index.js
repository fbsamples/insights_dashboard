import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

import Card from '../components/card';
import ConfigFileErrors from '../components/config-file-errors';
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

const VALIDATION_TYPES = {
  mandatory: 'mandatory',
  optional: 'optional'
}

const Home = () => {
  const dispatch = useDispatch();

  const { since, until } = getLast30DaysInterval();
  const period = 'day';

  const [activeTab, setActiveTab] = useState('tab1');
  const [configFileErrors, setConfigFileErrors] = useState(null);
  const [configFileOptionalFieldsErrors, setConfigFileOptionalFieldsErrors] = useState(null);

  const dispatchError = (error, stateName) => {
    const payload = {};
    payload[stateName] = error;
    dispatch({ type: 'error', payload });
  }

  const getInsights = async (insightsObj, video) => {
    try {
      const url = `${settings.backendUrl}/api/${insightsObj.insightsApiName}`;

      const metricStr = insightsObj.metrics.join(',');
      const bodyObj = { metric: metricStr, since, until, period };

      if (video) bodyObj.videoId = video.id;

      const body = JSON.stringify(bodyObj);
      const res = await fetch(url, { method: 'POST', body });
      const response = await res.json();

      if (response.data && response.data.length > 0) {
        if (video) {
          dispatch({ type: insightsObj.stateName, payload: { ...video, insights: response.data } });
        } else {
          dispatch({ type: insightsObj.stateName, payload: response.data });
        }
      } else if (response.error && !video) {
        dispatchError(response.error, insightsObj.stateName);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getMediasAndTheirInsights = async (insightsObj) => {
    try {
      const url = `${settings.backendUrl}/api/${insightsObj.fetchingApiName}`;
      const res = await fetch(url);
      const { data, error } = await res.json();

      if (data) {
        for (const media of data) {
          getInsights(insightsObj, media);
        }
      } else if (error) {
        dispatchError(error, insightsObj.stateName);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const validateConfigFile = async (type) => {
    const url = `${settings.backendUrl}/api/validate-config-file?type=${type}`;
    const res = await fetch(url);
    const response = await res.json();

    return response.errors;
  }

  const getConfigFileErrors = async () => {
    const mandatory = await validateConfigFile(VALIDATION_TYPES.mandatory);
    const optional = await validateConfigFile(VALIDATION_TYPES.optional);
    setConfigFileErrors({ mandatory, optional });

    if (optional.length > 0) {
      dispatchError(optional, 'configFile');
    }
  }

  useEffect(() => {
    if (configFileErrors === null) {
      getConfigFileErrors();
      return;
    }

    if (configFileErrors.mandatory.length > 0) return;

    // Load Page Insights
    getInsights(pageInsights);

    // Load Reels and their Insights
    getMediasAndTheirInsights(reelsInsights);

    // Load Video Insights
    getMediasAndTheirInsights(videoInsights);

    if (configFileErrors.optional.length > 0) return;

    // Load Instagram Insights
    getInsights(instagramInsights);

    // Load Instagram Media and their Insights
    getMediasAndTheirInsights(instagramMediaInsights);
  }, [configFileErrors, configFileOptionalFieldsErrors]);


  return (
    <div className={styles.container}>
      { configFileErrors && configFileErrors.mandatory.length > 0
        ? <ConfigFileErrors errors={configFileErrors.mandatory} />
        : <Card>
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
      }
    </div>
  )
}

export default Home;
