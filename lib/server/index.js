var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Vidi = require('./vidi')

function start () {
  var server = new Hapi.Server()
  server.connection({port: process.env.PORT || 3000 })

  server.register([Chairo, Inert, Vidi], function (err) {
    checkError(err)

    server.start(function (err) {
      checkError(err)
      console.log('server started on port ' + server.info.port)
    })
  })
}

function checkError (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
