var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Path = require('path')

var internals = {
  port: 3000,
  hapiPlugins: [
    Chairo,
    Inert
  ]
}

internals.start = function () {
  var server = new Hapi.Server()
  server.connection({port: internals.port})

  var plugins = internals.hapiPlugins
  server.register(plugins, function (err) {
    if (err) internals.stopProcess(err)

    internals.registerSenecaPlugins(server.seneca)
    internals.registerRoutes(server)

    server.start(function (err) {
      if (err) internals.stopProcess(err)
      else console.log('server started on port ' + server.info.port)
    })
  })
}

internals.registerSenecaPlugins = function (seneca) {
  seneca.use('user')
}

internals.registerRoutes = function (server) {

  server.state('session', {
    ttl: 24 * 60 * 60 * 1000,     // One day
    isSecure: true,
    path: '/',
    encoding: 'base64json'
  });

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/index.html'))
    }
  })

  server.route({
    method: 'GET',
    path: '/app.js',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/app.js'))
    }
  })

  server.route({
    method: 'GET',
    path: '/styles.css',
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, '/deploy/styles.css'))
    }
  })

  server.route({
    method: 'POST',
    path: '/auth/login',
    handler: function (request, reply) {

      //we could remove this line if we don't need user preregistration
      request.seneca.act({ role:'user', cmd:'register' , name: "Michele Capra",email: request.payload.username,password: request.payload.password},
        function(err,out) {
          request.seneca.act( { role:'user', cmd:'login' , email: request.payload.username, password: request.payload.password}, function (err, result) {

            if (err) {
              return reply(err);
            }

            return reply({ token: result.login.token}).state('session', JSON.stringify({ firstVisit: false }));
          });
        });
    }
  });

  server.route({
    method: 'POST',
    path: '/auth/logout',
    handler: function (request, reply) {

      request.seneca.act( { role:'user', cmd:'logout' , token: request.payload.token}, function (err, result) {

        if (err) {
          return reply(err);
        }

        return  reply({
          ok: result.ok
        });
      });

    }
  });
}

internals.stopProcess = function (err) {
  console.log(err)
  process.exit(1)
}

internals.start()
