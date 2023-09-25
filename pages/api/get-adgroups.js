import { getAppConfig } from '../../utils/config';
import settings from '../../constants/settings.json';

export default async function handler(req, res) {
  const url = assembleUrl();
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = () => {
  const config = getAppConfig();
  let url = `${settings.domain}/act_${config.ad_account_id}/ads`;
  url += `?access_token=${config.user_access_token}`;
  return url;
}
