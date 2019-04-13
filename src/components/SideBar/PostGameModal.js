import React, { Component } from 'react';
import './sidebar.sass'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import SubmitHighScoreForm from './SubmitHighScoreForm'
import {getAllStreets, getGameTimeRemaining, getGameTimerTotalInitalSeconds} from '../../selectors/gameSelectors'
import axios from 'axios'
import { ordinal_suffix_of } from '../../utils/index'

class PostGameModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: true,
      rank: null,
      highScore: null,
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
      this.props.closeModal()
    };
  }

  formatHeader(){
    if(this.props.gameTimeRemaining === 0){
      return <span>Out of Time <span role="img" aria-label="snail">...🐌  </span></span>
    } else if(this.props.allStreets.every(street => street.guessed)) {
      return <span>Jaysus Fair Play to Ye!</span>
    } else {
      return 'Game finished'
    }
  }

  formatSubHeader(){
    let correctGuesses = this.props.allStreets.filter(street => street.guessed).length
    if(this.props.gameTimeRemaining === 0){
      return `Fair play to ye still! You guessed ${correctGuesses} streets correctly.`
    } else if(this.props.allStreets.every(street => street.guessed)) {
      return `You guessed ${correctGuesses} streets correctly in
      ${this.props.gameTimerTotalInitialSeconds - this.props.gameTimeRemaining} seconds.`
    } else {
      return ''
    }
  }

  calculateHighScore(allStreets){
    let correctGuesses = allStreets.filter(street => street.guessed).length
    return (correctGuesses * 2) + this.props.gameTimeRemaining
  }

  getRankFromBackEnd(){
    let highScore = this.calculateHighScore(this.props.allStreets, this.props.gameTimeRemaining)
    axios.post('https://street-smart-dublin-backend.herokuapp.com/api/v1/rank', {
      high_score: {
        high_score: highScore,
      }
    }).then(response => {
        this.setState({rank: response.data, highScore: highScore})
      }
    )
  }

  getRank(){
    let {rank, highScore} = this.state
    if((this.props.gameTimerTotalInitialSeconds - this.props.gameTimeRemaining) > 0 && !rank){
      this.getRankFromBackEnd()
    }
    if(rank && highScore){
      return <p>Congrats you have a highscore of {highScore}.
      You'd rank {ordinal_suffix_of(rank)} on the all time leaderboard!</p>
    }
  }

  render() {
      return (
        <Modal
        size="lg"
        className='post-game__modal'
        show={this.state.show || this.props.show}
        onHide={this.handleHide}
        dialogClassName="modal-90w"
        aria-labelledby="modal-finished-game"
        >
        <Modal.Header closeButton>
        <Modal.Title className='post-game__modal-title'>
          <h2>
            {this.formatHeader()}
          </h2>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>{this.formatSubHeader()}</p>
        <hr/>
        <div>
          {this.getRank()}
          <p>
            Type in your name in to publish your score.
          </p>
          <p>
          You can also “Dublinese ” your name
          with the Dublinese Name Generator
          <span role="img" aria-label="cyrstal-ball">...🔮 </span>
          ...very high tech so it is!
          </p>
          <hr/>
        </div>
        <div>
          <SubmitHighScoreForm highScore={this.state.highScore}/>
        </div>
        </Modal.Body>
        </Modal>
      );
  }
}

const mapStateToProps = state => {
  return {
    allStreets: getAllStreets(state),
    gameTimeRemaining: getGameTimeRemaining(state),
    gameTimerTotalInitialSeconds: getGameTimerTotalInitalSeconds(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGameModal)
