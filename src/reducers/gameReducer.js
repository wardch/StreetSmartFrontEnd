import {defaultMapFeatures} from '../components/Map/map-style'
import * as transform from './transform';

export default(state = initialState, action) => {
  switch(action.type) {
    case 'FEATURE_CLICKED':
      return transform.featureSelected(state, action.payload);
    case 'UNGUESSED_STREETS_LOADED':
      return transform.unguessedStreetsLoaded(state, action.payload);
    case 'PLAY_GAME_CLICKED':
      return transform.playGameClicked(state, action.payload);
    case 'SELECTION_GUESS':
      return transform.selectionGuess(state, action.payload);
    case 'KEY_DOWN_SELECTION_BOX':
      return transform.keyDownSelectionBox(state, action.payload);
    case 'TIME_REMAINING_ON_GAME_END':
      return transform.timeRemaingOnGameEnd(state, action.payload);
    default:
      return state
  }
}

const initialAllStreets = () => {
  return defaultMapFeatures.get('features').map((feature) => {
      return {
        streetName: feature.get('properties').get('streetName'),
        guessed: false,
      }
    }).toJS()
}

const initialState = {
    gameMode: 'explore',
    gameTimerTotalInitialSeconds: 60,
    gameTimeRemaining: 60,
    selectionBoxStyle: {},
    streets: {
      currentStreetGuess: {},
      currentStreetClick: {},
      currentFeatureSelection: {},
      allFeatures: [],
      allStreets: initialAllStreets()
  }
}
