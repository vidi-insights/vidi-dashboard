'use strict'

var Request = require('superagent/lib/client')

module.exports = function user (varo) {
  console.log('init:user')

  varo.handle({role: 'user', cmd: 'load'},
    function (msg, done) {
      console.log('user:load', msg)

      if (!msg.token) {
        return done(null, {})
      }

      function handle_http (err, response) {
        if (err) done(null, {})
        else done(null, response.body)
      }

      Request
        .post('/user')
        .type('form')
        .send({token: msg.token})
        .end(handle_http)
    })
}
