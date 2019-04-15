export const homePageLoaded = () => dispatch => {
  return dispatch(
    {
      type: "HOME_PAGE_LOADED"
    }
  )
}

export const difficultySelected = (difficulty) => dispatch => {
  return dispatch(
    {
      type: "DIFFICULTY_SELECTED",
      payload: difficulty
    }
  )
}
