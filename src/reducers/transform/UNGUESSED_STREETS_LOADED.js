function transformAllStreets(features) {
  return features.filter(x => x.properties.streetName)
          .map(x => {
              return {
                streetName: x.properties.streetName,
                guessedCorrectly: false
              }
            })
}

export default function unguessedStreetsLoadedTransform(state, payload){
  return {
    ...state,
    streets: {
      ...state.streets,
      allStreets: transformAllStreets(payload),
      allFeatures: payload
    }
  }
}
