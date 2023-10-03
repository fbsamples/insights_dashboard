const initialState = {
  instagramInsights: [],
  instagramMediaInsights: [],
  pageInsights: [],
  videoInsights: [],
  reelsInsights: [],
  adsInsightsAdAccounts: [],
  adsInsightsAccount: [],
  adsInsightsCampaigns: [],
  marketingMessageInsights: [],
  error: {
    instagramInsights: null,
    instagramMediaInsights: null,
    pageInsights: null,
    videoInsights: null,
    reelsInsights: null,
    configFile: null,
    adsInsightsAdAccounts: null,
    adsInsightsAccount: null,
    adsInsightsCampaigns: null,
    marketingMessageInsights: null,
  }
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'instagramInsights':
      return { ...state, instagramInsights: [...state.instagramInsights, ...action.payload] };
    case 'instagramMediaInsights':
      return { ...state, instagramMediaInsights: [...state.instagramMediaInsights, action.payload] };
    case 'pageInsights':
      return { ...state, pageInsights: [...state.pageInsights, ...action.payload] };
    case 'videoInsights':
      return { ...state, videoInsights: [...state.videoInsights, action.payload] };
    case 'reelsInsights':
      return { ...state, reelsInsights: [...state.reelsInsights, action.payload] };
    case 'adsInsightsAdAccounts':
        return { ...state, adsInsightsAdAccounts: action.payload };
    case 'adsInsightsAccount':
      return { ...state, adsInsightsAccount: action.payload };
    case 'adsInsightsCampaigns':
      return { ...state, adsInsightsCampaigns: action.payload };
    case 'marketingMessageInsights':
      return { ...state, marketingMessageInsights: [...state.marketingMessageInsights, ...action.payload] };
    case 'error':
      return { ...state, error: {...state.error, ...action.payload} };
    default:
      return state
  }
}
