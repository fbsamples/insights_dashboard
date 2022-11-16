import config from '../../config.json';

export default async function handler(req, res) {
  const { metric, videoId } = JSON.parse(req.body);
  const url = assembleUrl(metric, videoId);
  const apiRes = await fetch(url);
  const response = await apiRes.json();

  res.status(200).json(response);
}

const assembleUrl = (metric, videoId) => {
  let url = `${config.domain}/${videoId}/video_insights?`;
  if (metric) url += `metric=${metric}&`;
  url += `access_token=${config.page_access_token}`;
  return url;
}
