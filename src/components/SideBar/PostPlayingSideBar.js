import React, {Component} from 'react';
import {connect} from 'react-redux'
import ClickedFeaturesPhotos from './ClickedFeaturesPhotos'
import PostGameModal from './PostGameModal'
import {getGameTimeRemaining, getAllStreets} from '../../selectors/gameSelectors'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios'

class PostPlayingSideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: false,
      rank: null,
    }
    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

  componentDidMount(){
    axios.post('https://street-smart-dublin-backend.herokuapp.com/api/v1/rank', {
      high_score: {
        high_score: '0'
        }
      })
    .then(response => {
      this.setState({rank: response.data})
      })
    }

  displayScore(streets) {
    let guessed = streets.filter(street => street.guessed).length
    return `${guessed}/${streets.length}`
  }


  displayTime(time) {
      //TODO: Pad the seconds so when single digits they're preceeded by a 0.
      let minutes = Math.floor(time / 60)
      let seconds = time - (minutes * 60)
      return `${minutes} : ${seconds}`
  }

  formatHeader(){
    if(this.props.gameTimeRemaining === 0){
      return `Out of time dawg!`
    } else if(this.props.allStreets.every(street => street.guessed)) {
      return `Jaysus Fair Play to Ye.`
    } else {
      return 'Game finished'
    }
  }

  formatSubHeader(){
    let correctGuesses = this.props.allStreets.filter(street => street.guessed).length
    if(this.props.gameTimeRemaining === 0){
      return `Well done though, you guessed ${correctGuesses} streets correctly.`
    } else {
      return `You guessed ${correctGuesses} streets correctly in
      ${this.props.gameTimerTotalInitialSeconds - this.props.gameTimeRemaining} seconds.`
    }
  }

  calculateHighScore(gameTimeRemaining, allStreets){
    return (20 * 2) + gameTimeRemaining
  }

  render(){
      return(
        <div className='sidebar--post-playing-container'>
          <Row>
            <h1>Game Finished</h1>
            <hr/>
          </Row>
          <Row>
            <ul className='sidebar--post-playing-button-ul'>
              <li>
                <Button variant="success" >
                  <Link to="/">
                    Play Again
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="primary" >
                  <Link to="/high_scores">
                    View High Scores
                  </Link>
                </Button>
              </li>
              <li><Button onClick={() =>  this.setState({show: true})} variant="danger">View My Score</Button></li>
            </ul>
          </Row>
          <Row>
            <ClickedFeaturesPhotos/>
            <PostGameModal show={this.state.show} closeModal={() => {this.setState({show: false})}}/>
          </Row>
        </div>
      )
    }
}

const mapStateToProps = state => {
  return {
    allStreets: getAllStreets(state),
    gameTimeRemaining: getGameTimeRemaining(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPlayingSideBar)
