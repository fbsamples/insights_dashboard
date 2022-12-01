import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../components/card';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import ErrorCard from '../components/error-card';
import IgMedia from '../components/ig-media';
import IgMediaHeader from '../components/ig-media-header';
import Section from '../components/section';

import { selectInsights } from '../utils/data-formatting';

import instagramInsights from '../constants/instagram-insights.json';
import instagramMediaInsights from '../constants/instagram-media-insights.json';
import errorMessages from '../constants/error-messages.json';

import styles from '../styles/style.module.css';

const InstagramInsights = () => {
  const accountInsightsSection = instagramInsights.sections[0];
  const instagramInsightsData = useSelector(state => state.instagramInsights);
  const instagramInsightsError = useSelector(state => state.error.instagramInsights);

  const mediaInsightsSection = instagramMediaInsights.sections[0];
  const instagramMediaInsightsData = useSelector(state => state.instagramMediaInsights);
  const instagramMediaInsightsError = useSelector(state => state.error.instagramMediaInsights);

  const igMediaIcons = mediaInsightsSection.charts[0].icons;

  return <div>
    <DocumentationLink
      description={instagramInsights.docs.description}
      link={instagramInsights.docs.link}
      linkLabel={instagramInsights.docs.linkLabel}/>
    { instagramInsightsError && <ErrorCard icon="AiFillWarning" error={instagramInsightsError}/> }
    { !instagramInsightsError && <Section title={accountInsightsSection.title} key={accountInsightsSection.title}>
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
    }
    { instagramMediaInsightsError && <ErrorCard icon="AiFillWarning" error={instagramMediaInsightsError}/> }
    { !instagramMediaInsightsError && <Section title={mediaInsightsSection.title} key={mediaInsightsSection.title}>
        <Card>
          <IgMediaHeader metrics={instagramMediaInsights.metrics} icons={igMediaIcons} instagramMediaInsightsData={instagramMediaInsightsData}/>
          { instagramMediaInsightsData.length === 0 && !instagramMediaInsightsError && <ErrorCard message={errorMessages.noIgMediaAvailable}/>}
          { instagramMediaInsightsData.length > 0 && <div className={styles.rowContainer}>
              { instagramMediaInsightsData.map(el => {
                  return <IgMedia data={el} icons={igMediaIcons} key={el.id}/>
              }) }
            </div>
          }
        </Card>
      </Section>
    }
  </div>;
}

export default InstagramInsights;
