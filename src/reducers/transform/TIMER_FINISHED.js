export default function timerFinishedTransform(state){
  return {
    ...state,
    gameMode: 'post-playing',
    gameTimerEndTime: new Date()
    }
}
