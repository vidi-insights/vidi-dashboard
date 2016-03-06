'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'
import {routerReducer, routerMiddleware, syncHistoryWithStore} from 'react-router-redux'

import authReducer from '../reducers/auth'
import vidiReducer from '../reducers/vidi'

import {logout, validateCookie} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
import Overview from '../containers/overview'
import Messages from '../containers/messages'
import Services from '../containers/services'
import ProcessById from '../containers/process_by_id'
import Profile from '../containers/profile'

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  vidi: vidiReducer
})

const buildStore = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(browserHistory),
  loggerMiddleware()
)(createStore)

const initalState = {
  auth: {
    hasError: false,
    isLoggedIn: false
  }
}

const store = buildStore(rootReducer, initalState)
const history = syncHistoryWithStore(browserHistory, store)

export default function createRootComponent () {
  function requireAuth (nextState, replace, done) {
    validateCookie((allowed) => {
      if(!allowed) {
        replace({nextPathname: nextState.location.pathname, pathname: '/login', query: nextState.location.query})
      }
      else {
        store.dispatch({type: 'AUTH_VALIDATED', isLoggedIn: true, hasError: false})
      }

      done()
    })
  }

  function handleLogout () {
    store.dispatch(logout())
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Overview} onEnter={requireAuth}/>
          <Route path="services" component={Services}  onEnter={requireAuth}/>
          <Route path="process/:id" component={ProcessById}  onEnter={requireAuth}/>
          <Route path="profile" component={Profile}  onEnter={requireAuth}/>
          <Route path="login" component={Login} />
          <Route path="logout" onEnter={handleLogout} />
        </Route>
      </Router>
    </Provider>
  )
}
