'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var User = require('./components/pages/user')
var Presenter = require('./components/pages/presenter')

var Varo = require('./services').Varo
var Auth = require('./services/auth')
var Session = require('./services/session')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

function start () {
  Varo.plugin(Session)
      .plugin(Auth)

  Varo.act({role: 'session', cmd: 'start'},
    function (err) {
      if (err) {
        renderError(err)
      }
      else {
        renderApp()
      }
    })
}

function requireAuth (nextState, replaceState, done) {
  Varo.act({role: 'auth', query: 'isAuthenticated'},
    function (err, reply) {
      if (!reply.isAuthenticated) {
        replaceState({nextPathname: nextState.location.pathname}, '/login')
      }

      return done()
    })
}

function getApp () {
  return (
    <Router history={history}>
      <Route path="/" component={Shell}>
        <IndexRoute component={Presenter} onEnter={requireAuth}/>
        <Route path="login" component={Login} />
        <Route path="user" component={User} />
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
