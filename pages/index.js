import React, { useState } from 'react';
import Head from 'next/head'
import Card from '../components/card';
import PageInsights from './page-insights';
import VideoInsights from './video-insights';
import InstagramInsights from './instagram-insights';
import styles from '../styles/styles.module.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.tabs}>
          <ul className={styles.nav}>
            <li className={activeTab === 'tab1' ? styles.active : ''} onClick={() => setActiveTab('tab1')}>Page Insights</li>
            <li className={activeTab === 'tab2' ? styles.active : ''} onClick={() => setActiveTab('tab2')}>Video Insights</li>
            <li className={activeTab === 'tab3' ? styles.active : ''} onClick={() => setActiveTab('tab3')}>Instagram Insights</li>
          </ul>
          <div>
            {activeTab === 'tab1' && <PageInsights/>}
            {activeTab === 'tab2' && <VideoInsights/>}
            {activeTab === 'tab3' && <InstagramInsights/>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home;
