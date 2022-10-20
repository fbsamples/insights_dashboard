import React, { useState } from 'react';

import Card from '../../UI/Card/Card';
import MetaInsights from '../MetaInsights/MetaInsights';
import QBR from '../QBR/QBR';
import SocialMediaInsights from '../SocialMediaInsights/SocialMediaInsights';

import './Main.css';

const Main = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return <div className='container'>
    <Card>
      <div className='tabs'>
        <ul className='nav'>
          <li className={activeTab === 'tab1' ? 'active' : ''} onClick={() => setActiveTab('tab1')}>Meta Insights Dashboard</li>
          <li className={activeTab === 'tab2' ? 'active' : ''} onClick={() => setActiveTab('tab2')}>QBR</li>
          <li className={activeTab === 'tab3' ? 'active' : ''} onClick={() => setActiveTab('tab3')}>Social Media Insights</li>
        </ul>
        <div>
          {activeTab === 'tab1' && <MetaInsights/>}
          {activeTab === 'tab2' && <QBR/>}
          {activeTab === 'tab3' && <SocialMediaInsights/>}
        </div>
      </div>
    </Card>
  </div>;
}

export default Main;
