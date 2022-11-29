import { useSelector } from 'react-redux';

import ErrorCard from '../components/error-card';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';

import { selectInsights } from '../utils/data-formatting';

import pageInsights from '../constants/page-insights.json';

import styles from '../styles/style.module.css';

const PageInsights = () => {
  const pageInsightsData = useSelector(state => state.pageInsights);
  const pageInsightsError = useSelector(state => state.pageInsightsError);

  return <div>
    <DocumentationLink
      description={pageInsights.docs.description}
      link={pageInsights.docs.link}
      linkLabel={pageInsights.docs.linkLabel}/>
    { pageInsightsError && <ErrorCard icon="AiFillWarning" error={pageInsightsError}/> }
    { pageInsightsData.length > 0 && pageInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          <div className={styles.rowContainer}>
            { section.charts.map(el => {
                return <DashboardChart
                  key={el.id.toString()}
                  size={el.size}
                  type={el.type}
                  metrics={el.metrics}
                  insights={selectInsights(el.metrics, pageInsightsData)}
                  title={el.title}
                  description={el.description}
                  labels={el.labels}
                  icons={el.icons}>
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
