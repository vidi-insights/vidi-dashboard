'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
import Overview from '../containers/overview'
import ByMessage from '../containers/bymessage'
import ByService from '../containers/byservice'
import Clients from '../containers/clients'
import Profile from '../containers/profile'

export default function createRootComponent (store) {
  const history = createHistory()

  function requireAuth (nextState, replaceState) {
    const state = store.getState()
    const isLoggedIn = state.auth.isLoggedIn
    const nextPath = nextState.location.pathname

    if (!isLoggedIn) {
      replaceState({nextPathname: nextPath}, '/login')
    }
  }

  function handleLogout (nextState, replaceState) {
    store.dispatch(logout())
  }

  syncReduxAndRouter(history, store)

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Overview} onEnter={requireAuth} />
          <Route path="byservice" component={ByService} onEnter={requireAuth} />
          <Route path="bymessage" component={ByMessage} onEnter={requireAuth} />
          <Route path="clients" component={Clients} onEnter={requireAuth} />
          <Route path="profile" component={Profile} onEnter={requireAuth} />
          <Route path="login" component={Login} />
          <Route path="logout" onEnter={handleLogout} />
        </Route>
      </Router>
    </Provider>
  )
}
