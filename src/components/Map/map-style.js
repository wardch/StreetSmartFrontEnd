import {fromJS} from 'immutable';
import MAP_FEATURES from '../../constants/geojsonFeatures.json';
import MAP_STYLE_AT_THE_TIME from '../../constants/style.json'
import {isEmpty} from 'lodash'
export const defaultMapFeatures = fromJS(MAP_FEATURES)
export const defaultMapStyle = fromJS(MAP_STYLE_AT_THE_TIME)

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
    "paint": {"line-width": 5, "line-color": "#7FFF00"}
  };

const clickedStreetNameLayer = {
  "id": "dublin-street-names-clicked",
  "type": "line",
  "source": "dublin-street-names-clicked",
  "layout": {},
    "paint": {"line-width": 4, "line-color": "hsl(300, 100%, 56%)"}
};

const hoverStreetNameLayer = {
  "id": "dublin-street-names-hover",
  "type": "line",
  "source": "dublin-street-names-hover",
  "layout": {},
    "paint": {"line-width": 4, "line-color": "#ADD8E6"}
};


export const setInitialMapLayer = () => {
  let data = {
       "type": "FeatureCollection",
       "features": defaultMapFeatures.get("features")
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

export const setClickedMapLayer = (clickedFeature, mapStyle) => {
  let featureToAdd

  if(!isEmpty(clickedFeature)) {
    featureToAdd = defaultMapFeatures.get("features").find((feature) => {
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

export const setHoveredMapLayer = (hoveredFeature, mapStyle) => {
  let featureToAdd

  if(hoveredFeature) {
    featureToAdd = defaultMapFeatures.get("features").find((feature) => {
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

export const setGuessedStreetsMapLayer = (allStreets, mapStyle) => {
  let featuresToAdd = allStreets.filter((street) => {
      return street.guessed
    }).map((street) => {
      return defaultMapFeatures.get("features").find((feature) => {
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
