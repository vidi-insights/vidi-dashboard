'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var User = require('./components/pages/user')
var Dashboard = require('./components/pages/dashboard')

var Auth = require('./services/auth')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

var internals = {

}

internals.requireAuth = function (nextState, replaceState) {
  if (!Auth.isAuthenticated()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login')
  }
}

var routes = (
  <Router history={history}>
    <Route path="/" component={Shell}>
      <IndexRoute component={Dashboard} onEnter={internals.requireAuth} />
      <Route path="login" component={Login} />
      <Route path="user" component={User} />
      <Route path="dashboard" component={Dashboard} onEnter={internals.requireAuth} />
    </Route>
  </Router>
)

ReactDom.render(routes, document.getElementById('app'))
