import React, { Component } from 'react';
import './sidebar.sass'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import SubmitHighScoreForm from './SubmitHighScoreForm'
import {getAllStreets, getGameTimeRemaining, getGameTimerTotalInitalSeconds} from '../../selectors/gameSelectors'

class PostGameModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: true,
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
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
    } else if(this.props.allStreets.every(street => street.guessed)) {
      return `You guessed ${correctGuesses} streets correctly in
      ${this.props.gameTimerTotalInitialSeconds - this.props.gameTimeRemaining} seconds.`
    } else {
      return ''
    }
  }

  render() {
    if(this.props.gameMode === 'playing'){
      return null
    } else if (this.props.gameMode === 'post-playing'){
      return (
        <Modal
        show={this.state.show}
        onHide={this.handleHide}
        dialogClassName="modal-90w"
        aria-labelledby="modal-finished-game"
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
          You'd rank 10th on the all time Dublin Street Smart leaderboard.
          Type your name in too publish your score. You can `Dublinese` your name
          too with the Dublinese-Name-Generator.
        </p>
        <div>
          <SubmitHighScoreForm/>
        </div>
        </Modal.Body>
        </Modal>
        );
    }
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
