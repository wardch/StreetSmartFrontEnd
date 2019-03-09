import {getSelectionBoxStyle} from '../../selectors/gameSelectors'

function setSelectionBoxStyle(currentSelectionBoxStyle){
  return {
    ...currentSelectionBoxStyle,
   control: styles => ({ ...styles, backgroundColor: 'white', color: 'black' })
  }
}

export default function featureSelectedTransform(state, payload){
  let currentSelectionBoxStyle = getSelectionBoxStyle({game: state})

  return {
    ...state,
    selectionBoxStyle: setSelectionBoxStyle(currentSelectionBoxStyle)
  }
}
