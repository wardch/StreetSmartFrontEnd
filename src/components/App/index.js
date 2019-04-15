import {connect} from 'react-redux'
import React, { Component } from 'react';
import {homePageLoaded, difficultySelected} from '../../actions/homePageActions'
import { Link } from "react-router-dom";
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './app.sass'

class App extends Component {
  homePageLoaded = (event) => {
    this.props.homePageLoaded()
  }

  componentDidMount(){
    this.props.homePageLoaded()
  }

  render() {
    return (
      <div className="app" alt='ariel picture of dublin town'>
        <header className="app__header">
          <p>
            How well do you know the streets<br/>
            of<br/>
            aul Dublin town?
          </p>
          <ul className='app_button-ul'>
            <li>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Difficulty
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.props.difficultySelected('easy')} className='easy-dropdown'>Easy (30 Streets)</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.difficultySelected('medium')} className='medium-dropdown'>Medium (60 Streets)</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.difficultySelected('hard')}  className='hard-dropdown'>Hard / Proper Dub! (95 Streets)</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Button variant="success">
              <Link to='/game'>
              Play Game
              </Link>
              </Button>
            </li>
            <li>
              <Button variant="danger">
              <Link to='/high_scores'>
              View High Scores
              </Link>
              </Button>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  homePageLoaded: () => dispatch(homePageLoaded()),
  difficultySelected: (difficulty) => dispatch(difficultySelected(difficulty))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
