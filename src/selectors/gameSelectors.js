import { createSelector } from 'reselect'

const gameSelector = state => state.game

export const getGameMode = createSelector(
  gameSelector,
  game => game.gameMode
)

export const getGameTimerTotalInitalSeconds = createSelector(
  gameSelector,
  game => game.gameTimerTotalInitialSeconds
)

export const getGameTimeRemaining = createSelector(
  gameSelector,
  game => game.gameTimeRemaining
)

export const getSelectionBoxStyle = createSelector(
  gameSelector,
  game => game.selectionBoxStyle
)

export const getStreets = createSelector(
    gameSelector,
    game => game.streets
)

export const getAllStreets = createSelector(
    getStreets,
    streets => streets.allStreets
)

export const getMap = createSelector(
    gameSelector,
    game => game.map
)

export const getCurrentFeatureSelection = createSelector(
    getStreets,
    streets => streets.currentFeatureSelection
)

export const getCurrentClickedStreet = createSelector(
    getStreets,
    streets => streets.currentStreetClick
)

export const getCurrentStreetGuess = createSelector(
    getStreets,
    streets => streets.currentStreetGuess
)

export const getAllGuessingOptions = createSelector(
    getAllStreets,
    streets => formatAllStreets(streets)
  )

function formatAllStreets(streets) {
  return streets.map(street => {
      return {
        value: street.streetName,
        label: street.streetName
      }
    }).filter(street => !street.guessed)
}
