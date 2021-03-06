import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Game from './components/Game';
import HighScores from './components/HighScores';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import configureStore from './store'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Container fluid='true'>
        <Route path="/" exact component={App} />
        <Route path="/game" component={Game} />
        <Route path="/high_scores" component={HighScores} />
      </Container>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
