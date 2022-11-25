const initialState = {
  pageInsights: [],
  videoInsights: [],
  reelsInsights: [],
  instagramInsights: [],
  instagramMediaInsights: [],
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'pageInsights':
      return { ...state, pageInsights: [...state.pageInsights, ...action.payload] };
    case 'videoInsights':
      return { ...state, videoInsights: [...state.videoInsights, action.payload] };
    case 'reelsInsights':
      return { ...state, reelsInsights: [...state.reelsInsights, action.payload] };
    case 'instagramInsights':
      return { ...state, instagramInsights: [...state.instagramInsights, ...action.payload] };
    case 'instagramMediaInsights':
      return { ...state, instagramMediaInsights: [...state.instagramMediaInsights, action.payload] };
    default:
      return state
  }
}
