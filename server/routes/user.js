'use strict'

var Boom = require('boom')

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: function (request, reply) {
      var token = request.payload.token

      request.seneca.act({role: 'user', cmd: 'auth', token: token},
        function (err, result) {
          if (err) return reply(Boom.internal(err))

          return reply({
            token: token,
            user: {
              name: result.user.name,
              email: result.user.email,
              nick: result.user.nick,
              since: result.user.when
            }
          })
        })
    }
  }
]
