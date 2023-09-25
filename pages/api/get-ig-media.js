import config from '../../utils/config';

export default async function handler(req, res) {
  const url = assembleUrl();
  const apiRes = await fetch(url);
  const response = await apiRes.json();
  res.status(200).json(response);
}

const assembleUrl = () => {
  let url = `${config.domain}/${config.ig_user_id}/media`;
  url += `?fields=id,media_type,media_url,username,timestamp`;
  url += `&access_token=${config.ig_access_token}&limit=13`;
  return url;
}
