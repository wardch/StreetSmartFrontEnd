import {connect} from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

class HighScores extends Component {
  constructor(props){
    super(props)
    this.state = {
      highScores: []
    }
  }

  componentDidMount(){
    axios.get('https://street-smart-dublin-backend.herokuapp.com/api/v1/high_scores', { crossdomain: true })
          .then(response => {
            console.log("$$$$$".repeat(50));
            console.log('response', response);
            this.setState({highScores: response.data})
    })
  }

  displayHighScores(){
    let { highScores } = this.state
    return highScores.map((score, idx) => {
        return( 
          <tr key={idx}>
            <td>{score.first_name}</td>
            <td>{score.last_name}</td>
            <td>{score.dublinese_name || 'N/A'}</td>
            <td>{score.high_score}</td>
          </tr>
        )
    })
  }

  render() {
    return (
      <Row className='high-scores-container'>
        <Col>
        <table className='high-score-table'>
          <thead>
            <tr>
              <th>High Scores</th>
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>High Score</th>
            </tr>
          </thead>
          <tbody>
            {this.displayHighScores()}
          </tbody>
        </table>
        </Col>
      </Row>
    );
  }
}

//TODO: make this a functional component

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighScores));
