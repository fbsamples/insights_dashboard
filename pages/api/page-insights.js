import config from '../../config.json';

export default async function handler(req, res) {
  const { metric, since, until, period } = JSON.parse(req.body);
  const url = assembleUrl(metric, since, until, period);
  const apiRes = await fetch(url);
  const response = await apiRes.json();

  res.status(200).json(response);
}

const assembleUrl = (metric, since, until, period) => {
  let url = `${config.domain}/${config.page_id}/insights`;
  url += `?metric=${metric}&period=${period}&since=${since}&until=${until}`;
  url += `&access_token=${config.page_access_token}`;
  return url;
}
