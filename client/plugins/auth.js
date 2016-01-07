'use strict'

var Request = require('superagent/lib/client')

module.exports = function auth (varo) {
  console.log('init:auth')

  varo.handle({role: 'auth', cmd: 'login'},
    function (msg, done) {
      console.log('auth:login', msg)

      function handle_http (err, response) {
        if (err) done(err)
        else done(null, {token: response.body.token})
      }

      var body = {
        username: msg.username,
        password: msg.password
      }

      Request
        .post('/auth/login')
        .type('form')
        .send(body)
        .end(handle_http)
      })

  varo.handle({role: 'auth', cmd: 'logout'},
    function (msg, done) {
      console.log('auth:logout', msg)

      function handle_http (err, response) {
        done(null)
      }

      var body = {
        token: msg.token
      }

      Request
        .post('/auth/logout')
        .type('form')
        .send(body)
        .end(handle_http)
    })
}
