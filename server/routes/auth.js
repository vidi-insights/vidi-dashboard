'use strict'

var Boom = require('boom')

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: function (request, reply) {
      var user = request.payload.username
      var pass = request.payload.password

      request.seneca.act({role:'user', cmd:'login', email: user, password: pass},
        function (err, result) {
          if (err) {
            return reply(Boom.internal(err));
          }

          var response = {}
          if (result.ok) {
            response = {token: result.login.token}
          }

          var session = JSON.stringify({firstVisit: false})
          return reply(response).state('session', session)
      })
    }
  },
  {
    method: 'POST',
    path: '/auth/logout',
    handler: function (request, reply) {
      var token = request.payload.token

      request.seneca.act( {role:'user', cmd:'logout', token: token},
        function (err, result) {
          if (err) return reply(Boom.internal(err));

          return reply({
            ok: result.ok
          })
      });
    }
  },
]
