const selectInsights = (metrics, rawAPIData) => {
  const metricsSet = new Set(metrics);

  const selectedInsights = [];
  for (const insightData of rawAPIData) {
    if (metricsSet.has(insightData.name)) {
      selectedInsights.push(insightData);
    }
  }

  return selectedInsights;
}

const selectAdsInsights = (metrics, rawAPIData) => {
  const metricsSet = new Set(metrics);
  const selectedInsights = [];
  if (!rawAPIData || !rawAPIData['account']) {
    return selectedInsights;
  }
  const mapper = (list, key) => list.map(value => (
    {
      "value": value[key],
      "end_time": value['date_stop']
    }
  ));
  metricsSet.forEach((metric) => {
    const metricValues = mapper(rawAPIData['account'], metric);
    selectedInsights.push({ "name": metric, "values": metricValues, "id": 'insights' + '-' + metric });
  });
  return selectedInsights;
}

const convertKeytoTitleCase = (string) => {
  return string.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())
}

export { selectInsights, selectAdsInsights, convertKeytoTitleCase };
