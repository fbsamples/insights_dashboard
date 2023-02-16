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
  let url = `${settings.domain}/${config.page_id}/videos`;
  url += `?access_token=${config.page_access_token}&limit=${settings.videoLimit}`;
  return url;
}
