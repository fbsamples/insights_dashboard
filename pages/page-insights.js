import Section from '../components/section';
import DashboardChart from '../components/chart';
import styles from '../styles/styles.module.css';

import pageInsights from '../constants/page-insights.json';

const PageInsights = () => {

  return <div>
    { pageInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          <div className={styles.rowContainer}>
            { section.metrics.map(el => {
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
      })
    }
  </div>;
}

export default PageInsights;
