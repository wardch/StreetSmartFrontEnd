import {connect} from 'react-redux'
import React, { Component } from 'react';
import {simpleAction} from './actions/simpleAction'
import './App.css';


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
          <button onClick={this.simpleAction}>Name the Streets</button>
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
