'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {routerReducer, routerMiddleware, syncHistoryWithStore} from 'react-router-redux'

import {logout, validateCookie} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
import Overview from '../containers/overview'
import Messages from '../containers/messages'
import Sensors from '../containers/sensors'
import ProcessById from '../containers/process_by_id'
import Profile from '../containers/profile'

const rootReducer = combineReducers({
  routing: routerReducer
})

const buildStore = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(browserHistory),
  loggerMiddleware()
)(createStore)

const initalState = {}

const store = buildStore(rootReducer, initalState)
const history = syncHistoryWithStore(browserHistory, store)

export default function createRootComponent () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Overview}/>
        </Route>
      </Router>
    </Provider>
  )
}
