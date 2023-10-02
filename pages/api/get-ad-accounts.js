import config from '../../utils/config';

export default async function handler(_req, res) {
  const url = assembleUrl();
  const apiRes = await fetch(url);
  const { data, error } = await apiRes.json();
  res.status(200).json({ data, error });
}

const assembleUrl = () => {
  let url = `${config.domain}/me/adaccounts`;

  url += `?access_token=${config.user_access_token}`;
  url += `&fields=id,name,insights`;

  return url;
}
