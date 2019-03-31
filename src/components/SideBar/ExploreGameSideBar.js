import React from 'react';
import {connect} from 'react-redux'
import ClickedFeaturesPhotos from './ClickedFeaturesPhotos'
import {playGameClicked} from '../../actions/mapActions'
import {getGameMode, getAllStreets} from '../../selectors/gameSelectors'
import './sidebar.sass'
import Button from 'react-bootstrap/Button';

function ExploreGameSideBar({gameMode, allStreets, playGameClicked}) {
      return(
        <div className='sidebar--explore-sidebar'>
        <h2>
          There are {allStreets.length} Dublin streets on the map to the right
        </h2>
        <hr/>
        <p>
          To learn more about each street, click on it for more information.
          When you are finished exploring the map and are ready to begin guessing each street, click the button below.
        </p>
        <Button variant="success" onClick={playGameClicked} className='sidebar--explore-sidebar__begin-button'>
            Begin Game
        </Button>
        <ClickedFeaturesPhotos/>
        </div>
      )
}

const mapStateToProps = state => {
  return {
    gameMode: getGameMode(state),
    allStreets: getAllStreets(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playGameClicked: (event) => dispatch(playGameClicked(event))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExploreGameSideBar)
