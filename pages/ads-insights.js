import * as React from 'react';
import { useSelector } from 'react-redux';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import ErrorCard from '../components/error-card';
import AdsDashboardChart from '../components/ads-chart';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';
import AdsDataTable from '../components/ads-insights/ads-data-table';

import { selectAdsInsights } from '../utils/data-formatting';

import adsInsights from '../constants/ads-insights.json';

import styles from '../styles/style.module.css';

const AdsInsights = ({ filters, handleFiltersChange, adAccountId, handleAdAccountIdChange }) => {
  const adsInsightsAdAccounts = useSelector(state => state.adsInsightsAdAccounts);
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
        {<>
            <FormControl fullWidth={true} >
            <FormLabel component="legend">Select An Ad Account</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={adAccountId}
                label="Ad Account"
                onChange={handleAdAccountIdChange}
              >
                {adsInsightsAdAccounts.map((option) => (
                  <MenuItem value={option.id} key={option.id} sx={{ overflow: 'visible' }}>{option.name}</MenuItem>
                ))
                }
              </Select>
            </FormControl>

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
        </>
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
          <Section title={adsInsights.table.title} key={adsInsights.table}>
            <AdsDataTable campaigns={adsInsightsCampaignData} accountCurrency={accountCurrency} />
          </Section>
        }
      </>
    }
  </div >;
}

export default AdsInsights;
