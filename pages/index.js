import React, { useState } from 'react';
import Head from 'next/head'
import Card from '../components/card';
import MetaInsights from './meta-insights';
import QBR from './qbr';
import SocialMedia from './social-media';
import styles from '../styles/styles.module.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.tabs}>
          <ul className={styles.nav}>
            <li className={activeTab === 'tab1' ? styles.active : ''} onClick={() => setActiveTab('tab1')}>Meta Insights Dashboard</li>
            <li className={activeTab === 'tab2' ? styles.active : ''} onClick={() => setActiveTab('tab2')}>QBR</li>
            <li className={activeTab === 'tab3' ? styles.active : ''} onClick={() => setActiveTab('tab3')}>Social Media Insights</li>
          </ul>
          <div>
            {activeTab === 'tab1' && <MetaInsights/>}
            {activeTab === 'tab2' && <QBR/>}
            {activeTab === 'tab3' && <SocialMediaInsights/>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Home;
