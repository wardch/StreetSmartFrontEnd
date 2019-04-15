import {fromJS} from 'immutable';
import MAP_FEATURES_EASY from '../../constants/geojsonFeaturesEasy.json';
import MAP_FEATURES_MEDIUM from '../../constants/geojsonFeaturesMedium.json';
import MAP_FEATURES_HARD from '../../constants/geojsonFeaturesHard.json';
import MAP_STYLE_AT_THE_TIME from '../../constants/style.json'
import {isEmpty} from 'lodash'
// export const defaultMapFeatures = fromJS(MAP_FEATURES_EASY)
export const defaultMapStyle = fromJS(MAP_STYLE_AT_THE_TIME)

export const getDefaultMapFeatures = (difficulty) => {
  if(difficulty === 'easy') {
    return fromJS(MAP_FEATURES_EASY)
  } else if (difficulty === 'medium') {
    return fromJS(MAP_FEATURES_MEDIUM)
  } else {
    return fromJS(MAP_FEATURES_HARD)
  }
}

const initialStreetNameLayer = {
    "id": "dublin-street-names",
    "type": "line",
    "source": "dublin-street-names",
    "layout": {},
    "paint": {"line-width": 5, "line-color": "#0000FF",}
  };

const initialStreetNameHiddenLayer = {
    "id": "dublin-street-names-hidden",
    "type": "line",
    "source": "dublin-street-names-hidden",
    "layout": {},
    "paint": {"line-width": 10, "line-color": "#0000FF", "line-opacity": 0}
  };

const guessedStreetsMapLayer = {
    "id": "dublin-street-names-guessed",
    "type": "line",
    "source": "dublin-street-names-guessed",
    "layout": {},
    "paint": {"line-width": 7, "line-color": "#7FFF00"}
  };

const clickedStreetNameLayer = {
  "id": "dublin-street-names-clicked",
  "type": "line",
  "source": "dublin-street-names-clicked",
  "layout": {},
    "paint": {"line-width": 7, "line-color": "orange"}
};

const hoverStreetNameLayer = {
  "id": "dublin-street-names-hover",
  "type": "line",
  "source": "dublin-street-names-hover",
  "layout": {},
    "paint": {"line-width": 4, "line-color": "#ADD8E6"}
};


export const setInitialMapLayer = (difficulty) => {
  let data = {
       "type": "FeatureCollection",
       "features": getDefaultMapFeatures(difficulty).get("features")
    }

  let mapRealStartingOff = defaultMapStyle
      // Add geojson source to map
        .setIn(['sources', 'dublin-street-names-hidden'], fromJS({type: 'geojson', "data": data}))
        .set('layers', defaultMapStyle.get('layers').push(initialStreetNameHiddenLayer))

  let mapStartingOff = mapRealStartingOff
      // Add geojson source to map
        .setIn(['sources', 'dublin-street-names'], fromJS({type: 'geojson', "data": data}))
        .set('layers', mapRealStartingOff.get('layers').push(initialStreetNameLayer))

  let mapStartingWithHoverLayer = mapStartingOff
          .setIn(['sources', 'dublin-street-names-hover'], fromJS({type: 'geojson', "data": {
            "type": "FeatureCollection",
            "features": []
            }
            }))
          .set('layers', mapStartingOff.get('layers').push(hoverStreetNameLayer));

   let mapClickedStreetLayer =  mapStartingWithHoverLayer
            .setIn(['sources', 'dublin-street-names-clicked'], fromJS({type: 'geojson', "data": {
             "type": "FeatureCollection",
             "features": []
             }
             }))
           .set('layers', mapStartingWithHoverLayer.get('layers').push(clickedStreetNameLayer));


    return  mapClickedStreetLayer
            .setIn(['sources', 'dublin-street-names-guessed'], fromJS({type: 'geojson', "data": {
              "type": "FeatureCollection",
              "features": []
              }
              }))
            .set('layers', mapClickedStreetLayer.get('layers').push(guessedStreetsMapLayer));
}

export const setClickedMapLayer = (clickedFeature, mapStyle, difficulty) => {
  let featureToAdd

  if(!isEmpty(clickedFeature)) {
    featureToAdd = getDefaultMapFeatures(difficulty).get("features").find((feature) => {
        return feature.get('properties').get('streetName') === clickedFeature.properties.streetName
      })
  } else {
    featureToAdd = {}
  }

  let data = {
       "type": "FeatureCollection",
       "features": [featureToAdd]
    }

  return mapStyle.setIn(['sources', 'dublin-street-names-clicked'], fromJS({type: 'geojson', "data": data}))
}

export const setHoveredMapLayer = (hoveredFeature, mapStyle, difficulty) => {
  let featureToAdd

  if(hoveredFeature) {
    featureToAdd = getDefaultMapFeatures(difficulty).get("features").find((feature) => {
        return feature.get('properties').get('streetName') === hoveredFeature.properties.streetName
      })
  } else {
    featureToAdd = {}
  }

  let data = {
       "type": "FeatureCollection",
       "features": [featureToAdd]
    }

  return mapStyle
      // Add geojson source to map
      .setIn(['sources', 'dublin-street-names-hover'], fromJS({type: 'geojson', "data": data}))
}

export const setGuessedStreetsMapLayer = (allStreets, mapStyle, difficulty) => {
  let featuresToAdd = allStreets.filter((street) => {
      return street.guessed
    }).map((street) => {
      return getDefaultMapFeatures(difficulty).get("features").find((feature) => {
          return feature.get('properties').get('streetName') === street.streetName
        })
      })

  let data = {
       "type": "FeatureCollection",
       "features": featuresToAdd
    }

  return mapStyle
      // Add geojson source to map
      .setIn(['sources', 'dublin-street-names-guessed'], fromJS({type: 'geojson', "data": data}))
}
