var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')

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

internals.stopProcess = function (err) {
  console.log(err)
  process.exit(1)
}

internals.start()
