'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
import Home from '../containers/home'

export default function createRootComponent (store) {
  const history = createHistory()

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

  syncReduxAndRouter(history, store)

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Home} onEnter={requireAuth} />
          <Route path="login" component={Login} />
          <Route path="logout" onEnter={handleLogout} />
        </Route>
      </Router>
    </Provider>
  )
}
