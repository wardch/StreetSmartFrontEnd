import {connect} from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import './high_scores.sass'
import { Link } from "react-router-dom";

class HighScores extends Component {
  constructor(props){
    super(props)
    this.state = {
      highScoreData: {high_scores: [], total_pages: 1},
      currentPage: 1
    }
  }

  componentDidMount(){
    this.loadHighScoresFromEndpoint()
  }

  loadHighScoresFromEndpoint(){
    axios.get(`https://street-smart-dublin-backend.herokuapp.com/api/v1/high_scores?page=${this.state.currentPage}`, { crossdomain: true })
          .then(response => {
            this.setState({highScoreData: response.data})
    })
  }

  displayHighScores(){
    let { highScoreData } = this.state
    if(highScoreData.high_scores.length === 0) {
      return(
      <tr className="spinner-border text-primary" role="status">
       <td className="sr-only">Loading...</td>
     </tr>
     )
    }
    return highScoreData.high_scores.map((score, idx) => {
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

  handlePageClick = data => {
    let newPage = (data.selected || 0) + 1;

    this.setState({ currentPage: newPage }, () => {
      this.loadHighScoresFromEndpoint();
    });
  };

  render() {
    return (
      <div>
        <Row className='high-scores-container'>
          <Col>
          <table className='high-score-table table'>
            <thead>
              <tr>
                <th colSpan='4' className='high-score-table__title'>High Scores (brains to burn they do)</th>
              </tr>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Name in Dublinese</th>
                <th>High Score</th>
              </tr>
            </thead>
            <tbody>
              {this.displayHighScores()}
            </tbody>
          </table>
          </Col>
        </Row>
        <Row>
          <Col className='high-scores__pagination-column'>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.highScoreData.total_pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                pageClassName={'pagination-link'}
                containerClassName={'pagination pagination-circle pg-blue'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
          </Col>
        </Row>
        <Row>
          <Col className='high-scores__play-again-button'>
            <Button variant="primary" >
              <Link to="/">
                Play Again
              </Link>
            </Button>
          </Col>
        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighScores));
