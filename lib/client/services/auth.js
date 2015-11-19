'use strict'

var Request = require('superagent/lib/client')

module.exports = function (varo) {
  var token = ''

  varo.observe({role: 'session', event:'update', key: 'token'},
    function (event) {
      console.log('event:session:update', event)

      if (event.value) {
        token = event.value
      }
    })

  varo.handle({role: 'auth', cmd: 'login'},
    function login (msg, done) {
      console.log('auth:login', msg)

      Request
        .post('/auth/login')
        .type('form')
        .send({username: msg.username, password: msg.password})
        .end(function (err, reply) {
          if (err) {
            return done(err)
          }

          var newToken = reply.body.token
          varo.act({role: 'session', cmd: 'update', token:newToken},
            function (err) {
              if (err) {
                return done (err)
              }

              token = newToken
              done(null, {isAuthenticated: (token !== '')})
            })
        })
    })

  varo.handle({role: 'auth', cmd: 'logout'},
    function (msg, done) {
      console.log('auth:logout', msg)

      Request
        .post('/auth/logout')
        .type('form')
        .send({token: token})
        .end(function (err, reply) {
          console.log(reply.text)

          varo.act({role: 'session', cmd: 'clear'},
            function (err) {
              if (err) {
                return done (err)
              }

              locals.isAuthenticated = false
              return done(null, {isAuthenticated: false})
            })
        })
    })

  varo.handle({role: 'auth', query: 'isAuthenticated'},
    function (msg, done) {
      console.log('auth:isAuthenticated', msg)

      return done(null, {isAuthenticated: (token !== '')})
    })
}
