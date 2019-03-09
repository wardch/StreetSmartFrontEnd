import {connect} from 'react-redux'
import React, { Component } from 'react';
import {simpleAction} from '../../actions/simpleAction'
import { Link } from "react-router-dom";
import '../../App.css';


class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            How well do you know aul Dublin town?
          </p>
          <button onClick={this.simpleAction}>
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
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
