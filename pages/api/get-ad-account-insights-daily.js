import { getAppConfig } from '../../utils/config';
import settings from '../../constants/settings.json';

export default async function handler(req, res) {
  const { since, until } = JSON.parse(req.body);
  const url = assembleUrl(since, until);
  const apiRes = await fetch(url);
  const response = await apiRes.json();
  res.status(200).json(response);
}

const assembleUrl = (since, until) => {
  const config = getAppConfig();
  let url = `${settings.domain}/act_${config.ad_account_id}/insights`;
  url += `?access_token=${config.user_access_token}`;
  url += `&fields=spend,impressions,reach,cpm,ctr,cost_per_inline_link_click,purchase_roas,account_id`;
  url += `&time_increment=1`;
  return url;
}
