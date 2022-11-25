const initialState = {
  pageInsights: [],
  videoInsights: [],
  reelsInsights: []
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'pageInsights':
      return { ...state, pageInsights: [...state.pageInsights, ...action.payload] };
    case 'videoInsights':
      return { ...state, videoInsights: [...state.videoInsights, action.payload] };
    case 'reelsInsights':
      return { ...state, reelsInsights: [...state.reelsInsights, action.payload] };
    default:
      return state
  }
}
