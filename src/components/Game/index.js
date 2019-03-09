import {connect} from 'react-redux'
import React, { Component } from 'react';
import {simpleAction} from '../../actions/simpleAction'
import Map from '../Map'
import SideBar from '../SideBar'
import './game.sass'
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Game extends Component {
  simpleAction = (event) => {
    this.props.simpleAction()
  }

  render() {
    return (
      <Row className='game-container'>
        <Col xs='4' sm='4' md='4' lg='4' className='sidebar-container'>
          <SideBar/>
        </Col>
        <Col className='map-container'>
          <Map/>
        </Col>
      </Row>
    );
  }
}



const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
