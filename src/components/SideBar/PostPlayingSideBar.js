import React, {Component} from 'react';
import {connect} from 'react-redux'
import ClickedFeaturesPhotos from './ClickedFeaturesPhotos'
import PostGameModal from './PostGameModal'
import {getGameTimeRemaining, getAllStreets, getGameMode} from '../../selectors/gameSelectors'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from "react-router-dom";
import SubmitHighScoreForm from './SubmitHighScoreForm'
import { ordinal_suffix_of } from '../../utils/index'
import axios from 'axios'

class PostPlayingSideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: true,
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
      return `Out of time!`
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
        <div>
        <Row>
          <Col xs='6' sm='6' md='6' lg='6'>
            <div>
              <h4>Score</h4>
              <h4>{this.displayScore(this.props.allStreets)}</h4>
            </div>
          </Col>
          <Col>
            <div>
            <h4>Timer</h4>
            <div className="countdown-timer">
              <div className="countdown-timer__circle-container">
                <svg>
                  <circle className='countdown-timer__background-circle'
                    r="24"
                    cx="26"
                    cy="26"/>
                  <circle
                    r="24"
                    cx="26"
                    cy="26"/>
                </svg>
              </div>
              <div className="countdown-timer__text">
                {this.displayTime(this.props.gameTimeRemaining)}
              </div>
              </div>
            </div>
          </Col>
        </Row>
        <hr/>
        <Row>
          <ul>
            <li>
              <Button variant="primary" >
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
            <li><Button onClick={() =>  this.setState({show: true})} variant="primary">View My Score</Button></li>
          </ul>
        </Row>
        <hr/>
        <Row>
        <ClickedFeaturesPhotos/>
        </Row>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          size='lg'
          aria-labelledby="example-custom-modal-styling-title"
          >
          <Modal.Header closeButton>
          <Modal.Title>
          {this.formatHeader()}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>{this.formatSubHeader()}</p>
          <hr/>
          <p>
            You'd rank {ordinal_suffix_of(this.state.rank)} on the all time Dublin Street Smart leaderboard with a score of {this.calculateHighScore(this.props.gameTimeRemaining, this.props.allStreets)}.
            Type your name in too publish your score. You can "Dublinese" your name
            too with the Dublinese-Name-Generator.
          </p>
          <div>
            <SubmitHighScoreForm/>
          </div>
          </Modal.Body>
        </Modal>
        </div>
      )
    }
}

const mapStateToProps = state => {
  return {
    allStreets: getAllStreets(state),
    gameMode: getGameMode(state),
    gameTimeRemaining: getGameTimeRemaining(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPlayingSideBar)
