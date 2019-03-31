export const unguessedStreetsLoaded = (streets) => dispatch => {
  return dispatch(
    {
      type: "UNGUESSED_STREETS_LOADED",
      payload: streets
    }
  )
}

export const featureClicked = (feature) => dispatch => {
  return dispatch(
    {
      type: "FEATURE_CLICKED",
      payload: feature
    }
  )
}

export const onSelectionGuess = (selection) => dispatch => {
  return dispatch(
    {
      type: "SELECTION_GUESS",
      payload: selection
    }
  )
}

export const guessMade = (guess) => dispatch => {
  return dispatch(
    {
      type: "GUESS_MADE",
      payload: guess
    }
  )
}

export const onKeyDownSelectionBox = (event) => dispatch => {
  return dispatch(
    {
      type: "KEY_DOWN_SELECTION_BOX",
      payload: event
    }
  )
}

export const onTimeRemaingOnGameEnd = (seconds) => dispatch => {
  return dispatch(
    {
      type: "TIME_REMAINING_ON_GAME_END",
      payload: seconds
    }
  )
}

export const playGameClicked = (event) => dispatch => {
  return dispatch(
    {
      type: "PLAY_GAME_CLICKED",
      payload: event
    }
  )
}
