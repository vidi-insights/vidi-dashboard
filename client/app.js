'use strict'

import './index.html'
import './assets/css/styles.css'
import './assets/css/font-awesome.css'

import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {logout} from './actions/auth'
import createLoggerMiddleware from 'redux-logger'
import authReducer from './reducers/auth'
import thunkMiddleware from 'redux-thunk'
import {Router, Route, IndexRoute } from 'react-router'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {syncReduxAndRouter, routeReducer} from 'redux-simple-router'

import Shell from './containers/shell'
import Login from './containers/login'
import Home from './containers/home'

// Polyfill needed for material-ui until React V1
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const rootReducer = combineReducers(Object.assign({}, {
  routing: routeReducer,
  auth: authReducer
}))

const storeWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLoggerMiddleware()
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
        <Route path="logout" onEnter={handleLogout} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

function requireAuth (nextState, replaceState) {
  const state = store.getState()
  const hasToken = Boolean(state.auth.token)
  const nextPath = nextState.location.pathname

  if (!hasToken) {
    replaceState({nextPathname: nextPath}, '/login')
  }
}

function handleLogout (nextState, replaceState) {
  const state = store.getState()
  const token = state.auth.token

  store.dispatch(logout(token))
}
