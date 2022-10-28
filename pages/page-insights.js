import Section from '../components/section';
import DashboardChart from '../components/chart';
import styles from '../styles/styles.module.css'

const PageInsights = () => {

  const impressionsData = [

    {
      id: 1,
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      apiName: 'page-insights',
      metric: 'page_views_total',
      type: 'bar',
    },
     {
      id: 2,
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      apiName: 'page-insights',
      metric: 'page_consumptions',
      type: 'line',
    },
     {
      id: 3,
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      apiName: 'page-insights',
      metric: 'page_impressions,page_impressions_unique,page_impressions_paid,page_impressions_viral,page_impressions_organic',
      type: 'line',
    },
  ]

    const peopleInsights = [
      {
        id: 4,
        link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
        linkLabel: 'Please check the documentation for more details',
        apiName: 'page-insights',
        metric: 'page_engaged_users',
        type: 'bar',
      },
      {
        id: 5,
        link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
        linkLabel: 'Please check the documentation for more details',
        apiName: 'page-insights',
        metric: 'page_fans',
        type: 'single_number',
      },
    ];

  return <div>

    <Section title='People'>
      <div className={styles.rowContainer}>
        { peopleInsights.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              size={el.size}
              link={el.link}
              linkLabel={el.linkLabel}
              apiName={el.apiName}
              type={el.type}
              metric={el.metric}>
            </DashboardChart>
          })
        }
      </div>
    </Section>
    <Section title='Page Impressions'>
      <div className={styles.rowContainer}>
        { impressionsData.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              size={el.size}
              link={el.link}
              linkLabel={el.linkLabel}
              apiName={el.apiName}
              type={el.type}
              metric={el.metric}>
            </DashboardChart>
          })
        }
      </div>
    </Section>

  </div>;
}

export default PageInsights;
