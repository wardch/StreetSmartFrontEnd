import {getGameMode} from '../../selectors/gameSelectors'

function setGameMode(gameMode, timeRemaining){
  if(gameMode === 'playing' && timeRemaining === 0){
    return 'post-playing'
  } else {
    return gameMode
  }
}

export default function timeRemaingOnGameEndTransform(state, payload){
  let gameMode = getGameMode({game: state})

  return {
    ...state,
    gameTimeRemaining: payload,
    gameMode: setGameMode(gameMode, payload)
  }
}
