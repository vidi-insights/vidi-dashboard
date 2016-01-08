'use strict'

import './index.html'
import './css/styles.css'

import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import createLogger from 'redux-logger'
import authReducer from './reducers/auth'
import thunkMiddleware from 'redux-thunk'
import {Router, Route, IndexRoute } from 'react-router'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {syncReduxAndRouter, routeReducer} from 'redux-simple-router'

import Shell from './components/shell'
import Login from './components/pages/login'
import Home from './components/pages//home'


// Polyfill needed for material-ui until React V1
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const rootReducer = combineReducers(Object.assign({}, {
  routing: routeReducer,
  auth: authReducer
}))

const loggerMiddleware = createLogger()

const storeWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

const store = storeWithMiddleware(rootReducer)
const history = createHistory()

syncReduxAndRouter(history, store)

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Shell}>
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="logout" onEnter={logout} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

function requireAuth (nextState, replaceState) {
  const state = store.getState()
  const isLoggedIn = Boolean(state.auth.token)
  const nextPath = nextState.location.pathname

  if (!isLoggedIn) {
    replaceState({nextPathname: nextPath}, '/login')
  }
}

function logout (nextState, replaceState) {
  storage.clear()
  
  replaceState({}, '/login')
}
