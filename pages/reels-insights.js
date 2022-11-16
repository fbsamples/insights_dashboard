import React, { useState, useEffect } from 'react';
import Section from '../components/section';
import DocumentationLink from '../components/documentation-link';
import ReelInsights from '../components/reel-insights';
import styles from '../styles/styles.module.css';

import settings from '../constants/settings.json';
import reelsInsights from '../constants/reels-insights.json';

const ReelsInsights = () => {
  const [reels, setReels] = useState([]);
  const { metric, apiName, id } = reelsInsights.sections[0].metrics[0];

  const getInsights = async (metric) => {
    try {
      const url = `${settings.backendUrl}/api/get-reels-posts`;
      const res = await fetch(url);
      const { data, error } = await res.json();

      if (data) {
        setReels([data[0]]);
      } else {
        setErrorMessage(error.message.substr(6));
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInsights(metric);
  }, []);

  return <div>
    <DocumentationLink
      description={reelsInsights.docs.description}
      link={reelsInsights.docs.link}
      linkLabel={reelsInsights.docs.linkLabel}/>
      { reelsInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          <div className={styles.rowContainer}>
            { reels.map(reel => {
                return <ReelInsights
                  key={reel.id}
                  metric={metric}
                  apiName={apiName}
                  reelId={reel.id}
                  reelDescription={reel.description}/>
              })
            }
          </div>
        </Section>
        })
      }
  </div>;
}

export default ReelsInsights;
