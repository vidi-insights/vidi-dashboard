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

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

var routes = (
  <Router history={history}>
    <Route path="/" component={Shell}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={Login} />
      <Route path="user" component={User} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Router>
)

ReactDom.render(routes, document.getElementById('app'))
