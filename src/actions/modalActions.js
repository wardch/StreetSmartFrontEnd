export const highScoreSubmitted = () => dispatch => {
  return dispatch(
    {
      type: "HIGH_SCORE_SUBMITTED",
      payload: true
    }
  )
}
