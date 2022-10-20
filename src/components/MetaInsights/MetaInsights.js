import React from 'react';

import Section from '../../UI/Section/Section';
import Chart from '../../UI/Chart/Chart';

import './MetaInsights.css';

const MetaInsights = () => {
  const dummyData = [
    {
      title: 'Post types',
      description: 'The number of times users logged in to Facebook saw tabs on your Page.',
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      id: 1
    },
    {
      title: 'Post types',
      description: 'The number of times users logged in to Facebook saw tabs on your Page.',
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      id: 2
    },
  ]

  return <div>
    <Section title='Page Insights'>
      <div className='row-container'>
        { dummyData.map(el => {
            return <Chart
              key={el.id.toString()}
              title={el.title}
              description={el.description}
              link={el.link}
              linkLabel={el.linkLabel}
            />
          })
        }
      </div>
    </Section>
    <Section title='Video Insights'></Section>
    <Section title='Instagram Insights'></Section>
  </div>;
}

export default MetaInsights;
