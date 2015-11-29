'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var Logout = require('./components/pages/logout')
var User = require('./components/pages/user')
var Presenter = require('./components/pages/presenter')

var Varo = require('./plugins').Varo
var Auth = require('./plugins/auth')
var Session = require('./plugins/session')
var User = require('./plugins/user')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

function start () {
  Varo.plugin(Session)
      .plugin(Auth)
      .plugin(User)

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
