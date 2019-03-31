import React, { Component } from 'react';
import './sidebar.sass'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {highScoreSubmitted} from '../../actions/modalActions'
import axios from 'axios'
import {getAllStreets, getGameTimeRemaining, getGameTimerTotalInitalSeconds, getIsHighScoreSubmitted} from '../../selectors/gameSelectors'

class SubmitHighScoreForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true,
      firstName: null,
      lastName: null,
      email: null,
      dublineseName: null,
      highScore: 32,
      dublineseNameRef: React.createRef()
    };
  }

  onChangeEvent(updateAttribute) {
    this.setState(updateAttribute)
  }

  dublineseTheName(){
    let {firstName, lastName} = this.state
    let dublineseName = `${firstName} McCopperFaced ${lastName}`
    this.setState({dublineseName: dublineseName})
    this.state.dublineseNameRef.current.value = dublineseName
  }

  submitHighScore(){
    console.log("$$$$$".repeat(50));
    console.log('submitting high score');
    let {firstName, lastName, highScore, dublineseName, email} = this.state
    if(!firstName || !lastName) {
      return alert('Please make sure First Name and Last Name fields are filled in')
    } else {
      axios.post('https://street-smart-dublin-backend.herokuapp.com/api/v1/high_scores', {
        high_score: {
          high_score: highScore,
          first_name: firstName,
          last_name: lastName,
          email: email,
          dublineseName: dublineseName
        }
      }).then(
        this.props.highScoreSubmitted()
      )
    }
  }

  highScoreButttons(isHighScoreSubmitted, highScoreSubmitted){
    if(isHighScoreSubmitted) {
      return (
        <Button variant="success">
          <i className="fa fa-check" aria-hidden="true"></i> Submitted
        </Button>
        )
    } else {
      return <Button variant="success" onClick={highScoreSubmitted}>Submit High Score</Button>
    }
  }

  render() {
    return(
      <Form>
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="Enter first name..." onChange={e => this.onChangeEvent({firstName: e.target.value})} />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Enter last name..." onChange={e => this.onChangeEvent({lastName: e.target.value})}/>
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter email address..." onChange={e => this.onChangeEvent({email: e.target.value})}/>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.dublineseTheName.bind(this)} variant="primary">Dublinese My Name</Button>
        </Row>
        <Row>
          <Col>
            <Form.Label>Name in Dublinese</Form.Label>
            <Form.Control placeholder="Name in Dublinese" ref={this.state.dublineseNameRef}/>
          </Col>
        </Row>
        <Row>
        <ButtonToolbar>
          {this.highScoreButttons(this.props.isHighScoreSubmitted, this.props.highScoreSubmitted)}
          <Button variant="danger">
            <Link to='/'>
              Play Again
            </Link>
          </Button>
        </ButtonToolbar>
        </Row>
      </Form>
      )
  }
}

const mapStateToProps = state => {
  return {
    allStreets: getAllStreets(state),
    gameTimeRemaining: getGameTimeRemaining(state),
    gameTimerTotalInitialSeconds: getGameTimerTotalInitalSeconds(state),
    isHighScoreSubmitted: getIsHighScoreSubmitted(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    highScoreSubmitted: () => dispatch(highScoreSubmitted())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitHighScoreForm)
