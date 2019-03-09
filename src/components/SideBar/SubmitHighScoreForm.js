import React, { Component } from 'react';
import './sidebar.sass'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {getAllStreets, getGameTimeRemaining, getGameTimerTotalInitalSeconds} from '../../selectors/gameSelectors'

class SubmitHighScoreForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true,
      firstNameRef: React.createRef(),
      lastNameRef: React.createRef(),
      emailRef: React.createRef(),
      dublineseNameRef: React.createRef()
    };
  }


  render() {
    return(
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="First name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          <Col>
            <Form.Control placeholder="Email Address" />
          </Col>
        </Row>
        <Row>
          <Button variant="primary">Dublinese My Name</Button>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="Name in Dublinese" />
          </Col>
        </Row>
        <Row>
        <ButtonToolbar>
          <Button variant="success">Submit High Score</Button>
          <Button variant="success">View High Scores</Button>
          <Button variant="success">Explore Map</Button>
          <Button variant="danger">Play Again</Button>
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
    gameTimerTotalInitialSeconds: getGameTimerTotalInitalSeconds(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitHighScoreForm)
