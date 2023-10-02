import config from '../../utils/config';

export default async function handler(req, res) {
  const { since, until, filters, adAccountId } = JSON.parse(req.body);
  const url = assembleUrl(since, until, filters, adAccountId);
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = (since, until, filters, adAccountId) => {
  let url = `${config.domain}/${adAccountId}/campaigns`;

  let filtering = [];

  if (filters) {
    if (filters.active_only) {
      filtering.push({ field: 'effective_status', operator: 'IN', value: ['ACTIVE'] })
    }

    if (filters.messenger_only) {
      filtering.push({ field: 'objective', operator: 'IN', value: ['POST_ENGAGEMENT', 'OUTCOME_ENGAGEMENT', 'MESSAGES'] })
    }
  }
  url += `?access_token=${config.user_access_token}`;
  // Add filters for active campaigns
  url += `&filtering=${JSON.stringify(filtering)}`
  // Fetch all campaign insights
  url += `&fields=name,effective_status,budget_remaining,daily_budget,lifetime_budget,insights.time_range({'since':'${since}','until':'${until}'}){spend,impressions,reach,actions{link_click,onsite_conversion{purchase},comment,onsite_conversion{lead_grouped}},cpm,ctr,cost_per_inline_link_click,action_values{onsite_conversion{purchase}},purchase_roas}`;
  return url;
}
