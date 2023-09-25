import { useSelector } from 'react-redux';

import ErrorCard from '../components/error-card';
import DashboardChart from '../components/chart';
import AdsDashboardChart from '../components/ads-chart';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';

import { selectInsights, selectAdsInsights } from '../utils/data-formatting';

import adsInsights from '../constants/ads-insights.json';

import styles from '../styles/style.module.css';

const AdsInsights = () => {
  const adsInsightsAccountsData = useSelector(state => state.adsInsightsAccount);
  const adsInsightsCampaignData = useSelector(state => state.adsInsightsCampaigns);
  const error = useSelector(state => state.error.adsInsightsAccount);
  return <div>
    <DocumentationLink
      description={adsInsights.docs.description}
      link={adsInsights.docs.link}
      linkLabel={adsInsights.docs.linkLabel}/>
    { error
      ? <ErrorCard icon="AiFillWarning" error={error}/>
      : adsInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          { <div className={styles.rowContainer}>
              { section.charts.map(el => {
                  return <AdsDashboardChart
                    key={el.id.toString()}
                    size={el.size}
                    type={el.type}
                    metrics={el.metrics}
                    loading={adsInsightsAccountsData.length === 0}
                    insights={selectAdsInsights(el.metrics, {'account': adsInsightsAccountsData[0], 'campaigns': adsInsightsCampaignData})}
                    title={el.title}
                    description={el.description}
                    labels={el.labels}
                    icons={el.icons}>
                  </AdsDashboardChart>
                })
              }
            </div>
          }
        </Section>
      })
    }
  </div>;
}

export default AdsInsights;
