import React from 'react';
import {connect} from 'react-redux'
import ClickedFeaturesPhotos from './ClickedFeaturesPhotos'
import {playGameClicked} from '../../actions/mapActions'
import {getGameMode, getAllStreets} from '../../selectors/gameSelectors'


function ExploreGameSideBar({gameMode, allStreets, playGameClicked}) {
      return(
        <div>
        <h2>
          There are {allStreets.length} Dublin streets on the map to the right.
        </h2>
        <p>
          To learn more about each street, click on them for more information.
          When you are ready to begin guessing each street, click the button below.
        </p>
        <button onClick={playGameClicked}>
          Play Game
        </button>
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
