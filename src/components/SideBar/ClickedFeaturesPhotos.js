import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {getCurrentFeatureSelection, getGameMode} from '../../selectors/gameSelectors'
import './sidebar.sass'
import {isEmpty} from 'lodash'
import React from 'react';

const displayStreetName = (streetName, gameMode) => {
  if(gameMode === 'playing') {
    return null
  } else {
    return streetName
  }
}

function ClickedFeaturesPhotos({clickedFeature, gameMode}) {
  if(isEmpty(clickedFeature)) { return null}

  return (
      <div className='sidebar__image-container'>
        <hr/>
        <h2>{displayStreetName(clickedFeature.properties.streetName, gameMode)}</h2>
        <img className='sidebar__image' src={'https://i2-prod.dublinlive.ie/incoming/article12111785.ece/ALTERNATES/s810/Talbot-Street.jpg'} alt={'Talbot street on a rare sunny day'} />
        <img className='sidebar__image' src={'https://i2-prod.dublinlive.ie/incoming/article12111785.ece/ALTERNATES/s810/Talbot-Street.jpg'} alt={'Talbot street on a rare sunny day'} />
        <img className='sidebar__image' src={'https://i2-prod.dublinlive.ie/incoming/article12111785.ece/ALTERNATES/s810/Talbot-Street.jpg'} alt={'Talbot street on a rare sunny day'} />
        <img className='sidebar__image' src={'https://i2-prod.dublinlive.ie/incoming/article12111785.ece/ALTERNATES/s810/Talbot-Street.jpg'} alt={'Talbot street on a rare sunny day'} />
      </div>
    )
}


const mapStateToProps = state => ({
  clickedFeature: getCurrentFeatureSelection(state),
  gameMode: getGameMode(state)
})

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClickedFeaturesPhotos));
