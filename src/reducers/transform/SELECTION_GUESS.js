import {getCurrentFeatureSelection, getAllStreets, getGameMode} from '../../selectors/gameSelectors'

function handleSelectionGuess(allStreets, clickedStreetName, guessedStreetName){
  return allStreets.map((street) => {
      if(guessedStreetName === street.streetName && !street.guessed) {
        return guessedStreetName === clickedStreetName ? {...street, guessed: true} : street
      } else {
        return street
      }
    })
}

function setSelectionBoxStyle(clickedStreetName, guessedStreetName, isCurrentGuessCorrect){
  return {
    control: styles => ({ ...styles, backgroundColor: `${isCurrentGuessCorrect ? 'green' : 'red'}`, color: 'white' }),
  }
}

function setGameMode(gameMode, areAllStreetsGuessed){
  if(gameMode === 'playing' && areAllStreetsGuessed){
    return 'post-playing'
  } else {
    return gameMode
  }
}


export default function featureSelectedTransform(state, payload){
  let gameMode = getGameMode({game: {...state}})
  let allStreets = getAllStreets({game: {...state}})
  let clickedFeature = getCurrentFeatureSelection({game: {...state}})
  let clickedStreetName = clickedFeature.properties.streetName
  let guessedStreetName = payload.value
  let isCurrentGuessCorrect = clickedStreetName === guessedStreetName
  let updatedAllStreets = handleSelectionGuess(allStreets, clickedStreetName, guessedStreetName)
  let currentStreetGuess = updatedAllStreets.find(street => street.streetName === guessedStreetName)
  let areAllStreetsGuessed = updatedAllStreets.every(street => street.guessed)

  return {
    ...state,
    selectionBoxStyle: setSelectionBoxStyle(clickedStreetName, guessedStreetName, isCurrentGuessCorrect),
    gameMode: setGameMode(gameMode, areAllStreetsGuessed),
    gameTimerEndTime: areAllStreetsGuessed ? new Date() : null,
    streets: {
      ...state.streets,
      popupOpen: !isCurrentGuessCorrect,
      currentStreetGuess: {...currentStreetGuess, isCurrentGuessCorrect: isCurrentGuessCorrect},
      allStreets: handleSelectionGuess(allStreets, clickedStreetName, guessedStreetName)
    }
  }
}
