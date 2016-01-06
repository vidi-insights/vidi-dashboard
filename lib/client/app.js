'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, IndexRoute } from 'react-router'
import Shell from './components/shell'
import Login from './components/pages/login'
import Logout from './components/pages/logout'
import User from './components/pages/user'
import Presenter from './components/pages/presenter'
import {Varo} from './plugins'
import Auth from './plugins/auth'
import Session from './plugins/session'
import Profile from './plugins/profile'
import Metrics from './plugins/metrics'
import CreateBrowserHistory from 'history/lib/createBrowserHistory'

let history = CreateBrowserHistory()

function start () {
  Varo.plugin(Session)
      .plugin(Auth)
      .plugin(Profile)
      .plugin(Metrics)

  Varo.act({role: 'session', cmd: 'start'},
    function (err, reply) {
      if (err) renderError(err)

      Varo.act({role: 'user', cmd: 'load', token: reply.token},
        function (err, reply) {
          if (err) return renderError(err)

          if (reply.user || reply.token) {
            Varo.act({
              role: 'session',
              cmd: 'update',
              user: reply.user,
              token: reply.token
            })
          }

          renderApp()
        })
    })
}

function checkSession (nextState, replaceState, done) {
  Varo.act({role: 'session', cmd: 'validity'},
    function (err, reply) {
      if (err || !reply.valid) {
        replaceState({nextPathname: nextState.location.pathname}, '/login')
      }

      return done()
  })
}

function getApp () {
  return (
    <Router history={history}>
      <Route path="/" component={Shell} >
        <IndexRoute component={Presenter} onEnter={checkSession} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} onEnter={checkSession} />
        <Route path="user" component={User} onEnter={checkSession} />
      </Route>
    </Router>
  )
}

function getRoot () {
  return document.getElementById('app')
}

 function renderError (err) {
  ReactDom.render(<Err error={err}/>, getRoot())
}

function renderApp () {
  ReactDom.render(getApp(), getRoot())
}

start()
