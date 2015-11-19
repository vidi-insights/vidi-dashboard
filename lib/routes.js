var Path = require('path')

module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/index.html'))
    }
  },
  {
    method: 'GET',
    path: '/app.js',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/app.js'))
    }
  },
  {
    method: 'GET',
    path: '/styles.css',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/styles.css'))
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
            return reply(err);
          }

          var session = JSON.stringify({firstVisit: false})
          var response = {token: result.login.token}

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

          if (err) {
            return reply(err);
          }

          return reply({
            ok: result.ok
          })
      });
    }
  }
]
