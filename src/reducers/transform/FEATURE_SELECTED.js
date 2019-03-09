import {isEqual} from 'lodash'
import {getSelectionBoxStyle, getCurrentFeatureSelection} from '../../selectors/gameSelectors'

function setSelectionBoxStyle(currentSelectionBoxStyle, currentFeatureSelection, payload){
  if(isEqual(currentFeatureSelection, payload)){
    return currentSelectionBoxStyle
  } else {
    return {
      control: styles => ({ ...styles, backgroundColor: 'white', color: 'black' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: 'black'
        };
      },
      placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: 'grey'
        };
      },
      singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: 'grey'
        };
      }
    }
  }
}

export default function featureSelectedTransform(state, payload){
  let currentSelectionBoxStyle = getSelectionBoxStyle({game: {...state}})
  let currentFeatureSelection = getCurrentFeatureSelection({game: {...state}})

  return {
    ...state,
    selectionBoxStyle: setSelectionBoxStyle(currentSelectionBoxStyle, currentFeatureSelection, payload),
    streets: {
      ...state.streets,
      currentFeatureSelection: payload,
      currentStreetClick: payload.properties
    }
  }
}
