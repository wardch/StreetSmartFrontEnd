import {connect} from 'react-redux'
import React, { Component } from 'react';
import {homePageLoaded} from '../../actions/homePageLoaded'
import { Link } from "react-router-dom";
import '../../App.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
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
          <ButtonToolbar className='app__button-toolbar'>
            <Button variant="success">
              <Link to='/game'>
                Play Game
              </Link>
            </Button>
            <Button variant="danger">
              <Link to='/high_scores'>
                View High Scores
              </Link>
            </Button>
          </ButtonToolbar>
        </header>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  homePageLoaded: () => dispatch(homePageLoaded())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
