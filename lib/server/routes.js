var Boom = require('boom')


module.exports = [
  {
    method: 'GET',
    path: '/css/{path*}',
    handler: {
      directory: {
        path: './css/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory: {
        path: './js/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{path*}',
    handler: {
      directory: {
        path: './fonts/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/img/{path*}',
    handler: {
      directory: {
        path: './img/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: {
        path: './index.html'
      }
    }
  },
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
  {
    method: 'POST',
    path: '/user',
    handler: function (request, reply) {
      var token = request.payload.token

      request.seneca.act({role:'user', cmd:'auth', token: token},
        function (err, result) {
          if (err) return reply(Boom.internal(err));

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
