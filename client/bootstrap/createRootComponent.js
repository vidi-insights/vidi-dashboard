'use strict'

import React from 'react'
import {Provider} from 'react-redux'
import {createHistory} from 'history'
import {syncReduxAndRouter} from 'redux-simple-router'
import {Router, Route, IndexRoute} from 'react-router'

import {logout, validateCookie} from '../actions/auth'
import Shell from '../containers/shell'
import Login from '../containers/login'
import Overview from '../containers/overview'
import Messages from '../containers/messages'
import Services from '../containers/services'
import Processes from '../containers/processes'
import Clients from '../containers/clients'
import Profile from '../containers/profile'

export default function createRootComponent (store) {
  const history = createHistory()

  function requireAuth (nextState) {
    const nextPath = nextState.location.pathname

    store.dispatch(validateCookie(nextPath))
  }

  function handleLogout () {
    store.dispatch(logout())
  }

  syncReduxAndRouter(history, store)

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Overview} onEnter={requireAuth} />
          <Route path="services" component={Services} onEnter={requireAuth} />
          <Route path="messages" component={Messages} onEnter={requireAuth} />
          <Route path="processes" component={Processes} onEnter={requireAuth} />
          <Route path="clients" component={Clients} onEnter={requireAuth} />
          <Route path="profile" component={Profile} onEnter={requireAuth} />
          <Route path="login" component={Login} />
          <Route path="logout" onEnter={handleLogout} />
        </Route>
      </Router>
    </Provider>
  )
}
