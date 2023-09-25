import config from '../../utils/config';

export default async function handler(req, res) {
  const { metric, since, until, period, videoId } = JSON.parse(req.body);
  const url = assembleUrl(metric, since, until, period, videoId);
  const apiRes = await fetch(url);
  const response = await apiRes.json();

  res.status(200).json(response);
}

const assembleUrl = (metric, since, until, period, videoId) => {
  let url = `${config.domain}/${videoId}/insights`;
  url += `?access_token=${config.ig_access_token}&limit=10`;
  url += `&metric=${metric}&period=${period}&since=${since}&until=${until}`;
  return url;
}
