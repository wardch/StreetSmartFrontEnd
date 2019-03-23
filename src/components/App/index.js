import {connect} from 'react-redux'
import React, { Component } from 'react';
import {homePageLoaded} from '../../actions/homePageLoaded'
import { Link } from "react-router-dom";
import '../../App.css';

class App extends Component {
  homePageLoaded = (event) => {
    this.props.homePageLoaded()
  }

  componentDidMount(){
    this.props.homePageLoaded()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            How well do you know aul Dublin town?
          </p>
          <button>
            <Link to="/game">Name the Streets</Link>
          </button>
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
