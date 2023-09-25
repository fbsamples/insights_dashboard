import { getAppConfig } from '../../utils/config';
import settings from '../../constants/settings.json';

export default async function handler(req, res) {
  const { since, until, adGroup } = JSON.parse(req.body);
  const url = assembleUrl(since, until, adGroup);
  const apiRes = await fetch(url);
  const response = await apiRes.json();
  res.status(200).json(response);
}

const assembleUrl = (since, until, adGroup) => {
  const config = getAppConfig();
  let url = `${settings.domain}/${adGroup.id}`;
  url += `?access_token=${config.user_access_token}`;
  url += `&fields=account_id,campaign{name,effective_status,budget_remaining,daily_budget,lifetime_budget,insights.time_range({'since':'${since}','until':'${until}'}){spend,impressions,reach,actions{link_click,onsite_conversion{purchase},comment,onsite_conversion{lead_grouped}},cpm,ctr,cost_per_inline_link_click,action_values{onsite_conversion{purchase}},purchase_roas}}`;
  return url;
}
