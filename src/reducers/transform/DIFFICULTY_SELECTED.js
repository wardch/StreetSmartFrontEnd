import {initialAllStreets} from '../gameReducer'

function setTimeFromDifficultySelected(difficulty){
  if(difficulty === 'easy'){
    return 300
  } else if (difficulty === 'medium') {
    return 600
  } else {
    return 900
  }
}

export default function difficultySelected(state, payload){

  return {
    ...state,
    gameDifficulty: payload,
    gameTimerTotalInitialSeconds: setTimeFromDifficultySelected(payload),
    gameTimeRemaining: setTimeFromDifficultySelected(payload),
    streets: {
      ...state.streets,
      allStreets: initialAllStreets(payload)
    }
  }
}
