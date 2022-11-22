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

export { selectInsights };
