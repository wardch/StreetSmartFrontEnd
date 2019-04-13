import React from 'react';
import {streetImages} from '../../constants/streetImages'
import './streetInfo.sass'

const displayStreetName = (streetName, gameMode) => {
  if(gameMode === 'playing') {
    return null
  } else {
    return streetName
  }
}

export default function StreetInfo({featureProperties, gameMode}) {
    let streetImageInfo = streetImages.find(street => street.streetName === featureProperties.streetName)
    return (
      <div>
        <div className='street-info__header'>
          {displayStreetName(featureProperties.streetName, gameMode)}
        </div>
        <img width={240} src={streetImageInfo.streetUrls[0]} alt={`${featureProperties.streetName}`} />
      </div>
    );
}
