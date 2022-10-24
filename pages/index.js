import React, { useState } from 'react';
import Head from 'next/head'
import Card from '../components/card/Card';
import MetaInsights from './MetaInsights';
import QBR from './QBR';
import SocialMediaInsights from './SocialMediaInsights';
import styles from '../styles/Styles.module.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div className={styles.container}>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
