import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as middleware from './middleware';
import rootReducer from './reducers/rootReducer'

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger, ...Object.values(middleware))
  )
}
