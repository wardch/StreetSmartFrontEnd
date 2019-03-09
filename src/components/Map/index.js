import React, { Component } from 'react';
import {connect} from 'react-redux'
import './map.sass'
import MapGL, {NavigationControl, Popup} from 'react-map-gl';
import StreetInfo from '../StreetInfo'
import {defaultMapStyle, defaultMapFeatures, setClickedMapLayer, setInitialMapLayer, setHoveredMapLayer, setGuessedStreetsMapLayer} from './map-style'
import {featureClicked} from '../../actions/mapActions'
import {isEmpty} from 'lodash'
import {getGameMode, getAllStreets} from '../../selectors/gameSelectors'


const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hhcmxpZXdhcmQyMyIsImEiOiJjanI5ZnA3Y2owZmc4M3luMDFxeGgzem1tIn0.YYMSsXBnOInWWr2KCLRDcw';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export class Map extends Component {
  state = {
    mapStyle: defaultMapStyle,
    mapFeatures: defaultMapFeatures,
    data: null,
    hoveredFeature: null,
    clickedFeature: {},
    featureProperties: null,
    viewport: {
      longitude: -6.258614,
      latitude: 53.349810,
      zoom: 15,
      bearing: 0,
      pitch: 0
    }
  };

  _setStartLayer = () => {
    this.setState({mapStyle: setInitialMapLayer()});
  }

  _onViewportChange = viewport => {
    this.setState({viewport})
  };

  _getCursor = () => {
    const {hoveredFeature} = this.state
    return hoveredFeature ? 'pointer' : 'default';
  };

  _onHover = (event, onStyleChange) => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    let {clickedFeature} = this.state
    const hoveredFeature = features && features.find(f => f.layer.id === 'dublin-street-names-hidden');
    if(!isEmpty(clickedFeature)) { return }
    const featureProperties = hoveredFeature && hoveredFeature.properties
    let {mapStyle} = this.state
    let newStyle = setHoveredMapLayer(hoveredFeature, mapStyle)
    this.setState({mapStyle: newStyle});
    this.setState({featureProperties: featureProperties});
    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _onClick = (event) => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const clickedFeature = (features && features.find(f => f.layer.id === 'dublin-street-names-hidden')) || {};
    const featureProperties = clickedFeature && clickedFeature.properties
    this.props.featureClicked(clickedFeature)
    let {mapStyle} = this.state
    let newStyle = setClickedMapLayer(clickedFeature, mapStyle)
    this.setState({mapStyle: newStyle});
    this.setState({clickedFeature, x: offsetX, y: offsetY});
    this.setState({featureProperties});
  };

  _renderPopup() {
    const {featureProperties} = this.state;

    if(featureProperties) {
      let [longitude, latitude] = featureProperties.centerPoint.split(',')
      return(
        <Popup tipSize={5}
          anchor="top-right"
          longitude={parseFloat(longitude)}
          latitude={parseFloat(latitude)}
          closeOnClick={false}
          onClose={() => this.setState({clickedFeature: null})} >
          <StreetInfo featureProperties={featureProperties} gameMode={this.props.gameMode} />
        </Popup>
      )
    }
  }

  componentWillReceiveProps(nextProps){
    let {mapStyle} = this.state
    let {allStreets} = nextProps
    let newStyle = setGuessedStreetsMapLayer(allStreets, mapStyle)
    this.setState({mapStyle: newStyle});
  }

  render() {
    const {viewport, mapStyle} = this.state;

    return (
      <div style={{height: '100%'}}>
        <MapGL
          {...viewport}
          width="100%"
          mapStyle={mapStyle}
          height="100%"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={(e) => this._onHover(e, this._onStyleChange)}
          onClick={this._onClick}
          onLoad={this._setStartLayer}
          getCursor={this._getCursor}
          >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._onViewportChange} />
          </div>
          {this._renderPopup()}
        </MapGL>
      </div>
      );
  }
}



Map.propTypes = {}

const mapStateToProps = state => {
  return {
    gameMode: getGameMode(state),
    allStreets: getAllStreets(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    featureClicked: (feature) => dispatch(featureClicked(feature))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Map)
