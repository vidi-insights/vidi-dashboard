'use strict'

var Borland = require('borland')
var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Vidi = require('./vidi')
var Nes = require('nes')
var Bell = require('bell')
var Hapi_Cookie = require('hapi-auth-cookie')
var Auth = require('seneca-auth')

// If you want to add more metrics,
// this is the place to do it.
function registerMetrics (seneca) {
  seneca.use(require('./plugins/vidi-msgstats-metrics'))
}

// Log and end the process
// if an error is encountered
function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Create our server.
var server = new Hapi.Server()
server.connection({ port: process.env.PORT || 3000, labels: ['web'] })
server.connection({ port: 5000, labels: ['api'] })

// Declare our Hapi plugin list.
var plugins = [
  Bell,
  Hapi_Cookie,
  {
    register: Chairo,
    options: {
      timeout: 500,
      secure: true,
      web: require('seneca-web')
    }
  },
  Nes,
  {
    register: Borland,
    select: 'api'
  },
  Inert,
  Vidi
]

// Register our plugins, kick off the server
// if there is no error.
server.register(plugins, function (err) {
  var seneca = server.seneca

  seneca.use(Auth, {
    restrict: '/api',
    server: 'hapi',
    strategies: [
      {
        provider: 'local'
      }
    ]
  })

  endIfErr(err)

  // Kick off the server and register our
  // metrics plugins if there is no error.
  server.start(function (err) {
    endIfErr(err)

    // Register metrics last, to ensure
    // everything else is wired up first.
    registerMetrics(server.seneca)

    var ports = []
    server.connections.forEach(function (connection) {
      ports.push(connection.info.port)
    })
    console.log('server started on ports: ' + ports.join(', '))
  })
})
