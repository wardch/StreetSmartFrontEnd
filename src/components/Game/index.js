import {connect} from 'react-redux'
import React, { Component } from 'react';
import Map from '../Map'
import SideBar from '../SideBar'
import './game.sass'
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Game extends Component {
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



//TODO: make this a functional component

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
