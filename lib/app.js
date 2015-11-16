'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var User = require('./components/pages/user')
var Dashboard = require('./components/pages/dashboard')

var Auth = require('./services/auth')
var Session = require('./services/session')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

var internals = {}

internals.start = function () {
  Session.start(function (err) {
    if (err) {
      internals.renderError(err)
    }
    else {
      internals.renderApp()
    }
  })
}

internals.requireAuth = function (nextState, replaceState) {
  if (!Auth.isAuthenticated()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login')
  }
}

internals.getApp = function () {
  return (
    <Router history={history}>
      <Route path="/" component={Shell}>
        <IndexRoute component={Dashboard} onEnter={internals.requireAuth} />
        <Route path="login" component={Login} />
        <Route path="user" component={User} />
        <Route path="dashboard" component={Dashboard} onEnter={internals.requireAuth} />
      </Route>
    </Router>
  )
}

internals.getRoot = function () {
  return document.getElementById('app')
}

internals.renderError = function (err) {
  ReactDom.render(<Err error={err}/>, internals.getRoot())
}

internals.renderApp = function () {
  ReactDom.render(internals.getApp(), internals.getRoot())
}

internals.start()
