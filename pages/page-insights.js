import Section from '../components/section';
import DashboardChart from '../components/chart';
import styles from '../styles/styles.module.css'

const PageInsights = () => {

  const impressionsData = [
    {
      id: 1,
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      type: 'page_insights',
      metric: 'page_impressions,page_impressions_unique,page_impressions_paid,page_impressions_viral,page_impressions_organic',
    },
    {
      id: 2,
      link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
      linkLabel: 'Please check the documentation for more details',
      type: 'page_insights',
      metric: 'page_consumptions',
    },
  ]

    const earningsData = [
      {
        id: 3,
        link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
        linkLabel: 'Please check the documentation for more details',
        type: 'page_insights',
        metric: 'page_daily_video_ad_break_earnings_by_crosspost_status',
      },
    ];

    const peopleInsights = [
      {
        id: 4,
        link:'https://developers.facebook.com/docs/graph-api/reference/v14.0/insights#tab-types',
        linkLabel: 'Please check the documentation for more details',
        type: 'page_insights',
        metric: 'page_engaged_users',
      },
    ];

  return <div>
    <Section title='Page Impressions'>
      <div className={styles.rowContainer}>
        { impressionsData.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              link={el.link}
              linkLabel={el.linkLabel}
              type={el.type}
              metric={el.metric}>
            </DashboardChart>

          })
        }
      </div>
    </Section>
    <Section title='Page Earnings'>
        { earningsData.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              link={el.link}
              linkLabel={el.linkLabel}
              type={el.type}
              metric={el.metric}>
            </DashboardChart>
          })
        }
    </Section>
    <Section title='People'>
        { peopleInsights.map(el => {
            return <DashboardChart
              key={el.id.toString()}
              link={el.link}
              linkLabel={el.linkLabel}
              type={el.type}
              metric={el.metric}>
            </DashboardChart>
          })
        }
    </Section>
  </div>;
}

export default PageInsights;
