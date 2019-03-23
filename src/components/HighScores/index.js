import {connect} from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class HighScores extends Component {
  render() {
    return (
      <Row className='high-scores-container'>
        <Col>
          HIGHSCORES YOOOO
        </Col>
      </Row>
    );
  }
}

//TODO: make this a functional component

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighScores));
