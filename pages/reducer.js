const initialState = {
  instagramInsights: [],
  instagramMediaInsights: [],
  pageInsights: [],
  videoInsights: [],
  reelsInsights: [],
  error: {
    instagramInsights: null,
    instagramMediaInsights: null,
    pageInsights: null,
    videoInsights: null,
    reelsInsights: null,
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
    case 'error':
      return { ...state, error: {...state.error, ...action.payload} };
    default:
      return state
  }
}
