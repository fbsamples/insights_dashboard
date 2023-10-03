import config from '../../utils/config';

export default async function handler(req, res) {
  const { metric, since, until } = JSON.parse(req.body);
  const url = assembleUrl(metric, since, until);
  var apiRes = await fetch(url);
  var response = await apiRes.json();
  if (response.data && response.data.length > 0) {
    const data_points = response.data[0].data_points;
    while (response.paging.next) {
      apiRes = await fetch(response.paging.next);
      response = await apiRes.json();
      data_points.push(...response.data[0].data_points);
    }
    res.status(200).json({data: data_points});
  } else {
    res.status(500).json({error: response.error});
  }
}

const assembleUrl = (metric, since, until) => {
  let url = `${config.domain}/${config.waba_id}/template_analytics`;
  url += `?metric_types=[${metric}]&start=${since}&end=${until}`;
  url += `&granularity=DAILY&&template_ids=[${config.template_id}]`;
  url += `&access_token=${config.mm_access_token}`;
  return url;
}
