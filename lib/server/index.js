var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Vidi = require('./vidi')
var Boom = require('boom')

function start () {
  var server = new Hapi.Server()
  server.connection({port: process.env.PORT || 3000 })

  server.register([Chairo, Inert, Vidi], function (err) {
    checkError(err)

    server.ext('onRequest', function (request, reply) {
      var host = request.raw.req.connection.address().address

      if (host !== '127.0.0.1') {
        return reply(Boom.forbidden())
      }
      else {
        return reply.continue()
      }
    })

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
