'use strict'

var locals = {
  isAuthenticated: false,
  varo: null,
}

var loginMsg = {role: 'auth', cmd: 'login'}
var logoutMsg = {role: 'auth', cmd: 'logout'}
var isAuthenticatedMsg = {role: 'auth', cmd: 'isAuthenticated'}

function login (msg, done) {
  locals.isAuthenticated = true

  done(null, {isAuthenticated: true})
}

function logout (msg, done) {
  locals.isAuthenticated = false

  return done(null, {isAuthenticated: false})
}

function isAuthenticated (msg, done) {
  return done(null, {isAuthenticated: locals.isAuthenticated})
}


module.exports = function (varo) {
  locals.varo = varo
  locals.isAuthenticated = false

  varo.handle(isAuthenticatedMsg, isAuthenticated)
  varo.handle(loginMsg, login)
  varo.handle(logoutMsg, logout)
}
