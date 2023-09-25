import config from '../../utils/config';

export default async function handler(req, res) {
  const { since, until } = JSON.parse(req.body);
  const url = assembleUrl(since, until);
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = (since, until) => {
  let url = `${config.domain}/act_${config.ad_account_id}/campaigns`;
  url += `?access_token=${config.user_access_token}`;
  // Add filters for active campaigns
  url += `&filtering=[{'field':'effective_status','operator':'IN','value':['ACTIVE']},`
  // Add filters for mesaging objectives
  url += `{'field':'objective','operator':'IN','value':['POST_ENGAGEMENT','OUTCOME_ENGAGEMENT', 'MESSAGES']}]`
  // Fetch all campaign insights
  url += `&fields=name,effective_status,budget_remaining,daily_budget,lifetime_budget,insights.time_range({'since':'${since}','until':'${until}'}){spend,impressions,reach,actions{link_click,onsite_conversion{purchase},comment,onsite_conversion{lead_grouped}},cpm,ctr,cost_per_inline_link_click,action_values{onsite_conversion{purchase}},purchase_roas}`;
  return url;
}
