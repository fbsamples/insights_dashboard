import Section from '../components/section';
import Chart from '../components/chart';
import styles from '../styles/styles.module.css'

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
      <div className={styles.rowContainer}>
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
