import config from '../../config.json';

export default async function handler(req, res) {
  const url = assembleUrl();
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = () => {
  let url = `${config.domain}/${config.page_id}/video_reels`;
  url += `?access_token=${config.page_access_token}&limit=10`;
  return url;
}
