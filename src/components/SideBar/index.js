import React from 'react';
import {connect} from 'react-redux'
import ExploreGameSideBar from './ExploreGameSideBar'
import PlayGameSideBar from './PlayGameSideBar'
import PostPlayingSideBar from './PostPlayingSideBar'
import {getGameMode} from '../../selectors/gameSelectors'


function SideBar({gameMode}) {
      if(gameMode === 'explore') {
        return( <ExploreGameSideBar/> )
      } else if (gameMode === 'playing') {
        return( <PostPlayingSideBar/> )
      } else if (gameMode === 'post-playing') {
        return <PostPlayingSideBar/>
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
