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
        .use('auth')
        .use('account')
        .use('project')
}

internals.registerRoutes = function (server) {
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
      console.log(request)
      reply.file(Path.join(__dirname, '/deploy/app.js'))
    }
  })

  server.route({
    method: 'GET',
    path: '/styles.css',
    handler: function (request, reply) {
      console.log()
      reply.file(Path.join(__dirname, '/deploy/styles.css'))
    }
  })
}

internals.stopProcess = function (err) {
  console.log(err)
  process.exit(1)
}

internals.start()
