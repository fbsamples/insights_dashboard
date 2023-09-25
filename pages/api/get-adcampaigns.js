import config from '../../utils/config';

export default async function handler(req, res) {
  const url = assembleUrl();
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = () => {
  let url = `${config.domain}/act_${config.ad_account_id}/campaigns`;
  url += `?access_token=${config.user_access_token}`;
  // Add filters for active campaigns
  url += `&filtering=[{'field':'effective_status','operator':'IN','value':['ACTIVE']},`
  // Add filters for mesaging objectives
  url += `{'field':'objective','operator':'IN','value':['POST_ENGAGEMENT','OUTCOME_ENGAGEMENT', 'MESSAGES']}]`
  return url;
}
