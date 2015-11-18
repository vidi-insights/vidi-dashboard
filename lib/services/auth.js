'use strict'

var Request = require('superagent/lib/client')

var locals = {
  isAuthenticated: false,
  varo: null,
}

var loginMsg = {role: 'auth', cmd: 'login'}
var logoutMsg = {role: 'auth', cmd: 'logout'}
var isAuthenticatedMsg = {role: 'auth', query: 'isAuthenticated'}

function login (msg, done) {
  console.log('auth:login')

  Request.post('/auth/login')
         .type('form')
         .send({email: msg.email})
         .send({password: msg.password})
         .end(function (err, reply) {
           console.log(reply)

           locals.isAuthenticated = true

           done(null, {isAuthenticated: true})
         })
}

function logout (msg, done) {
  console.log('auth:logout')

  locals.isAuthenticated = false

  return done(null, {isAuthenticated: false})
}

function isAuthenticated (msg, done) {
  console.log('auth:isAuthenticated')

  return done(null, {isAuthenticated: locals.isAuthenticated})
}


module.exports = function (varo) {
  locals.varo = varo

  varo.handle(isAuthenticatedMsg, isAuthenticated)
  varo.handle(loginMsg, login)
  varo.handle(logoutMsg, logout)
}
