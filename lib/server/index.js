var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Vidi = require('./vidi')
var Boom = require('boom')
var Nes = require('nes')

function start () {
  var server = new Hapi.Server()
  server.connection({port: process.env.PORT || 3000 })

  var options = {
    timeout: 500
  }

  server.register([Nes, {register: Chairo, options: options}, Inert, Vidi],
    function (err) {
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

      server.subscription('/metrics/seneca/requests')
      server.subscription('/metrics/seneca/responses')
      server.subscription('/metrics/seneca/npm')

      server.start(function (err) {
        checkError(err)

        setInterval(function () {
          server.seneca.act({role: 'metrics', source: 'seneca', metric: 'requests'},
            function (err, data) {
              console.log(data)
              if (data) server.publish('/metrics/seneca/requests', data);
            })

          server.seneca.act({role: 'metrics', source: 'seneca', metric: 'responses'},
            function (err, data) {
              console.log(data)
              if (data) server.publish('/metrics/seneca/responses', data);
            })

          server.seneca.act({role: 'metrics', source: 'seneca', metric: 'npm'},
            function (err, data) {
              console.log(data)
              if (data) server.publish('/metrics/seneca/npm', data);
            })

        }, 1000)

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
