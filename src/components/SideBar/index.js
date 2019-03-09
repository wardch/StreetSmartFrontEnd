import React from 'react';
import {connect} from 'react-redux'
import ExploreGameSideBar from './ExploreGameSideBar'
import PlayGameSideBar from './PlayGameSideBar'
import {getGameMode} from '../../selectors/gameSelectors'


function SideBar({gameMode}) {
      if(gameMode === 'explore') {
        return( <ExploreGameSideBar/> )
      } else if (gameMode === 'playing' || gameMode === 'post-playing') {
        return( <PlayGameSideBar/> )
      }
}

const mapStateToProps = state => {
  return {
    gameMode: getGameMode(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
