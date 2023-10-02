import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../components/card';
import ConfigFileErrors from '../components/config-file-errors';
import PageInsights from './page-insights';
import VideoInsights from './video-insights';
import ReelsInsights from './reels-insights';
import InstagramInsights from './instagram-insights';
import AdsInsights from './ads-insights';
import MarketingMessageInsights from './marketing-message-insights';

import { getLast30DayEpoc, getLastNDaysInterval } from '../utils/date';

import pageInsights from '../constants/page-insights.json';
import reelsInsights from '../constants/reels-insights.json';
import videoInsights from '../constants/video-insights.json';
import instagramInsights from '../constants/instagram-insights.json';
import instagramMediaInsights from '../constants/instagram-media-insights.json';
import adsInsights from '../constants/ads-insights.json';
import marketingMessageInsights from '../constants/marketing-message-insights.json';

import config from '../utils/config';
import styles from '../styles/style.module.css';

const VALIDATION_TYPES = {
  mandatory: 'mandatory',
  optional: 'optional'
}

const Home = () => {
  const [filters, setFilters] = useState({
    messenger_only: true,
    active_only: true,
  });

  const handleFiltersChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const [adAccountId, setAdAccountId] = useState('');

  const handleAdAccountIdChange = (event) => {
    setAdAccountId(event.target.value);
  };

  const menu = [
    {
      id: 'ads',
      title: 'Ads Insights',
      component: <AdsInsights
        filters={filters}
        adAccountId={adAccountId}
        handleFiltersChange={handleFiltersChange}
        handleAdAccountIdChange={handleAdAccountIdChange}
      />
    },
    {
      id: 'mm',
      title: 'Marketing Message Insights',
      component: <MarketingMessageInsights />
    },
    {
      id: 'page',
      title: 'Page Insights',
      component: <PageInsights />
    },
    {
      id: 'reels',
      title: 'Reels Insights',
      component: <ReelsInsights />
    },
    {
      id: 'video',
      title: 'Video Insights',
      component: <VideoInsights />
    },
    {
      id: 'ig',
      title: 'Instagram Insights',
      component: <InstagramInsights />
    }
  ];

  const dispatch = useDispatch();

  const { since, until } = getLastNDaysInterval(30);
  const period = 'day';

  const [activeTab, setActiveTab] = useState(menu[0].id);
  const [configFileErrors, setConfigFileErrors] = useState(null);
  const [configFileOptionalFieldsErrors] = useState(null);

  const dispatchError = (error, stateName) => {
    const payload = {};
    payload[stateName] = error;
    dispatch({ type: 'error', payload });
  }

  const getAdAccounts = async (insightsObj) => {
    try {
      // Fetch All Ad Accounts
      const url = `${config.backendUrl}/api/${insightsObj.fetchingApiAdAccounts}`;
      const res = await fetch(url);
      const { data, error } = await res.json();
      console.log(data);


      if (data) {
        const activeAdAccounts = data.filter((account) => {
          return account.insights && account.insights.data && account.insights.data.length > 0 // Active Ad Accounts only with insights
        });

        setAdAccountId(activeAdAccounts[0].id); // Set the first one as default
        dispatch({ type: insightsObj.stateNameAdAccounts, payload: activeAdAccounts });
      } else if (error) {
        dispatchError(error, insightsObj.stateNameAdAccounts);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getAdAccountInsights = async (insightsObj) => {
    try {
      // Fetch Account level insights
      const url = `${config.backendUrl}/api/${insightsObj.insightsApiNameAccount}`;
      const bodyObj = { adAccountId };
      const body = JSON.stringify(bodyObj);
      const res = await fetch(url, { method: 'POST', body });
      const { data, error } = await res.json();

      if (data) {
        dispatch({ type: insightsObj.stateNameAccounts, payload: data });
      } else if (error) {
        console.log(error);
        dispatchError(error, insightsObj.stateNameAccounts);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getCampaignsAndTheirInsights = async (insightsObj) => {
    try {
      // Fetch AdCampaigns first using fetchingApi
      const url = `${config.backendUrl}/api/${insightsObj.fetchingApiNameAdCampaigns}`;
      const bodyObj = { since, until, filters, adAccountId};
      const body = JSON.stringify(bodyObj);

      const res = await fetch(url, { method: 'POST', body });
      const { data, error } = await res.json();

      if (data) {
        dispatch({ type: insightsObj.stateNameCampaigns, payload: data });
      } else if (error) {
        dispatchError(error, insightsObj.stateName);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getMarketingMessageInsights = async (insightsObj) => {
    try {
      const url = `${config.backendUrl}/api/${insightsObj.insightsApiName}`;
      const metricStr = "'" + insightsObj.metrics.join('\',\'') + "'";
      const { since, until } = getLast30DayEpoc();
      const bodyObj = { metric: metricStr, since, until };

      const body = JSON.stringify(bodyObj);
      const res = await fetch(url, { method: 'POST', body });
      const response = await res.json();

      if (response.data && response.data.length > 0) {
        dispatch({ type: insightsObj.stateName, payload: response.data });
      } else if (response.error) {
        dispatchError(response.error, insightsObj.stateName);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getInsights = async (insightsObj, video) => {
    try {
      const url = `${config.backendUrl}/api/${insightsObj.insightsApiName}`;

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
      const url = `${config.backendUrl}/api/${insightsObj.fetchingApiName}`;
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
    const url = `${config.backendUrl}/api/validate-config-file?type=${type}`;
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

    // Loads List of Ad Accounts
    getAdAccounts(adsInsights);

    if (adAccountId !== '') {
      // Loads Ad Account and its Insights
      getAdAccountInsights(adsInsights);

      // Load Ads Campaigns and its Insights
      getCampaignsAndTheirInsights(adsInsights);
    }

    // Load Marketing Message Insights
    getMarketingMessageInsights(marketingMessageInsights);

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
  }, [configFileErrors, configFileOptionalFieldsErrors, filters, adAccountId]);


  return (
    <div className={styles.container}>
      {configFileErrors && configFileErrors.mandatory.length > 0
        ? <ConfigFileErrors errors={configFileErrors.mandatory} />
        : <Card>
          <div className={styles.tabs}>
            <ul className={styles.nav}>
              {
                menu.map((item) =>
                  <li
                    id={`${item.id}-tab`}
                    key={`${item.id}-tab`}
                    className={activeTab === item.id ? styles.active : ''}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.title}
                  </li>
                )
              }
            </ul>
            {
              menu.map((item) => activeTab === item.id ?
                <div id={item.id} key={item.id}>{item.component}</div> :
                null
              )
            }
          </div>
        </Card>
      }
    </div>
  )
}

export default Home;
