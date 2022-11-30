import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../components/card';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import IgMedia from '../components/ig-media';
import IgMediaHeader from '../components/ig-media-header';
import Section from '../components/section';

import { selectInsights } from '../utils/data-formatting';

import instagramInsights from '../constants/instagram-insights.json';
import instagramMediaInsights from '../constants/instagram-media-insights.json';

import styles from '../styles/style.module.css';

const InstagramInsights = () => {
  const accountInsightsSection = instagramInsights.sections[0];
  const instagramInsightsData = useSelector(state => state.instagramInsights);

  const mediaInsightsSection = instagramMediaInsights.sections[0];
  const instagramMediaInsightsData = useSelector(state => state.instagramMediaInsights);
  const igMediaIcons = mediaInsightsSection.charts[0].icons;

  return <div>
    <DocumentationLink
      description={instagramInsights.docs.description}
      link={instagramInsights.docs.link}
      linkLabel={instagramInsights.docs.linkLabel}/>
    <Section title={accountInsightsSection.title} key={accountInsightsSection.title}>
      <div className={styles.rowContainer}>
        { instagramInsightsData.length > 0 && accountInsightsSection.charts.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              size={el.size}
              type={el.type}
              metrics={el.metrics}
              insights={selectInsights(el.metrics, instagramInsightsData)}
              title={el.title}
              description={el.description}
              labels={el.labels}
              icons={el.icons}>
            </DashboardChart>
          })
        }
      </div>
    </Section>
    <Section title={mediaInsightsSection.title} key={mediaInsightsSection.title}>
      <Card>
        <IgMediaHeader metrics={instagramMediaInsights.metrics} icons={igMediaIcons} instagramMediaInsightsData={instagramMediaInsightsData}/>
        <div className={styles.rowContainer}>
          { instagramMediaInsightsData.length > 0 && instagramMediaInsightsData.map(el => {
              return <IgMedia data={el} icons={igMediaIcons} key={el.id}/>
          }) }
        </div>
      </Card>
    </Section>
  </div>;
}

export default InstagramInsights;
