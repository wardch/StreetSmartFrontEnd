import React from 'react';

const displayStreetName = (streetName, gameMode) => {
  if(gameMode === 'playing') {
    return null
  } else {
    return streetName
  }
}

export default function StreetInfo({featureProperties, gameMode}) {
    return (
      <div>
        <div>
          {displayStreetName(featureProperties.streetName, gameMode)}
        </div>
        <img width={240} src={'https://i2-prod.dublinlive.ie/incoming/article12111785.ece/ALTERNATES/s810/Talbot-Street.jpg'} alt={'Talbot street on a rare sunny day'} />
      </div>
    );
}
