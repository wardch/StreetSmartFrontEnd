import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {getCurrentFeatureSelection, getGameMode} from '../../selectors/gameSelectors'
import {streetImages} from '../../constants/streetImages'
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

const displayStreetImages = (streetUrls) => {
  return streetUrls.map((streetUrl, idx) => {
      return <img key={`street-idx-${idx}`} className='sidebar__image' src={streetUrl} alt='dublin street' />
  })
}

function ClickedFeaturesPhotos({clickedFeature, gameMode}) {
  if(isEmpty(clickedFeature)) { return null}
  let streetImageInfo = streetImages.find(street => street.streetName === clickedFeature.properties.streetName)

  return (
      <div className='sidebar__image-container'>
        <hr/>
        <h2>{displayStreetName(clickedFeature.properties.streetName, gameMode)}</h2>
        {displayStreetImages(streetImageInfo.streetUrls)}
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
