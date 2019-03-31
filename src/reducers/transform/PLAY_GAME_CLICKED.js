export default function featureSelectedTransform(state, payload){
  return {
    ...state,
    gameMode: 'playing',
    streets: {
      ...state.streets,
      currentStreetClick: {},
      currentFeatureSelection: {}
    }
  }
}
