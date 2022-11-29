const initialState = {
  pageInsights: [],
  pageInsightsError: null,
  videoInsights: [],
  videoInsightsError: null,
  reelsInsights: [],
  reelsInsightsError: null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'pageInsights':
      return { ...state, pageInsights: [...state.pageInsights, ...action.payload] };
    case 'pageInsightsError':
      return { ...state, pageInsightsError: {...state.pageInsightsError, ...action.payload} };
    case 'videoInsights':
      return { ...state, videoInsights: [...state.videoInsights, action.payload] };
    case 'videoInsightsError':
      return { ...state, videoInsightsError: {...state.videoInsightsError, ...action.payload} };
    case 'reelsInsights':
      return { ...state, reelsInsights: [...state.reelsInsights, action.payload] };
     case 'reelsInsightsError':
      return { ...state, reelsInsightsError: {...state.reelsInsightsError, ...action.payload} };
    default:
      return state
  }
}
