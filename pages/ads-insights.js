import * as React from 'react';
import { useSelector } from 'react-redux';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import ErrorCard from '../components/error-card';
import AdsDashboardChart from '../components/ads-chart';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';
import AdsDataTableMain from '../components/ads-data-table/ads-data-table-main';

import { selectAdsInsights } from '../utils/data-formatting';

import adsInsights from '../constants/ads-insights.json';

import styles from '../styles/style.module.css';

const AdsInsights = ({filters, handleFiltersChange}) => {
  const adsInsightsAccountsData = useSelector(state => state.adsInsightsAccount);
  const adsInsightsCampaignData = useSelector(state => state.adsInsightsCampaigns);
  const accountCurrency = adsInsightsAccountsData && adsInsightsAccountsData[0] && adsInsightsAccountsData[0].currency ? adsInsightsAccountsData[0].currency : '';
  const error = useSelector(state => state.error.adsInsightsAccount);

  return <div>
    <DocumentationLink
      description={adsInsights.docs.description}
      link={adsInsights.docs.link}
      linkLabel={adsInsights.docs.linkLabel} />


    {error
      ? <ErrorCard icon="AiFillWarning" error={error} />
      : <>
        {

          <FormControl component="fieldset" >
            <FormLabel component="legend">Filters</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={
                  <Switch checked={filters.messenger_only} onChange={handleFiltersChange} name="messenger_only" />
                }
                label="Messenger Only"
              />
              <FormControlLabel
                control={
                  <Switch checked={filters.active_only} onChange={handleFiltersChange} name="active_only" />
                }
                label="Active campaigns only"
              />
            </FormGroup>
          </FormControl>
        }
        {
          adsInsights.graphs.map(section => {
            return <Section title={section.title} key={section.title}>
              {<div className={styles.rowContainer}>
                {section.charts.map(el => {
                  return <AdsDashboardChart
                    key={el.id.toString()}
                    size={el.size}
                    type={el.type}
                    metrics={el.metrics}
                    loading={adsInsightsAccountsData.length === 0}
                    insights={selectAdsInsights(el.metrics, { 'account': adsInsightsAccountsData, 'campaigns': adsInsightsCampaignData })}
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
        {
          <Section title={adsInsights.table.title} key={adsInsights.table}><AdsDataTableMain campaigns={adsInsightsCampaignData} accountCurrency={accountCurrency} /></Section>
        }
      </>
    }
  </div>;
}

export default AdsInsights;
