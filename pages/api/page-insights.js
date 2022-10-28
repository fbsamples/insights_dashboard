import config from '../../config.json';

export default async function handler(req, res) {
  const { metric, since, until, period } = JSON.parse(req.body);

  let url = `${config.domain}/${config.page_id}/insights`;
  url += `?metric=${metric}&period=${period}&since=${since}&until=${until}`;
  url += `&access_token=${config.page_access_token}`;

  const apiRes = await fetch(url);
  const { data } = await apiRes.json();

  res.status(200).json({ data });
}
