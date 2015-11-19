var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Vidi = require('./lib')

var internals = {}

internals.start = function () {
  var server = new Hapi.Server()
  server.connection({port: process.env.PORT || 3000 })

  server.register([Chairo, Inert, Vidi], function (err) {
    internals.checkError(err)

    server.start(function (err) {
      internals.checkError(err)
      console.log('server started on port ' + server.info.port)
    })
  })
}

internals.checkError = function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

internals.start()
