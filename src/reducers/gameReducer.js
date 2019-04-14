import {defaultMapFeatures} from '../components/Map/map-style'
import * as transform from './transform';

export default(state = initialState, action) => {
  switch(action.type) {
    case 'FEATURE_CLICKED':
      return transform.featureClicked(state, action.payload);
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
    case 'HOME_PAGE_LOADED':
      return {...state, ...initialState}
    case 'HIGH_SCORE_SUBMITTED':
      return {...state, isHighScoreSubmitted: true}
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
    gameTimerTotalInitialSeconds:  900,
    gameTimeRemaining: 900,
    selectionBoxStyle: {},
    isHighScoreSubmitted: false,
    streets: {
      currentStreetGuess: {},
      currentStreetClick: {},
      currentFeatureSelection: {},
      popupOpen: true,
      allFeatures: [],
      allStreets: initialAllStreets()
  }
}
