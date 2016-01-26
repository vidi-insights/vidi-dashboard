'use strict'

var Bell = require('bell')
var Borland = require('borland')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Dashboard = require('./dashboard')
var Hapi = require('hapi')
var Inert = require('inert')
var Nes = require('nes')
var Vidi = require('./vidi')
var ConcordaClient = require('./concorda-client')

// Options for our hapi plugins.
var opts = {
  server: {
    port: process.env.PORT || 3000
  },
  chairo: {
    timeout: 500,
    secure: true,
    web: require('seneca-web')
  }
}

// Log and end the process on err.
function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

// Create our server.
var server = new Hapi.Server()
server.connection({ port: opts.server.port, labels: ['web'] })
server.connection({ port: 5000, labels: ['api'] })

// Declare our Hapi plugin list.
var plugins = [
  {register: Bell, select: 'web'},
  {register: Cookie, select: 'web'},
  {register: Chairo, options: opts.chairo, select: 'web'},
  {register: Nes},
  {register: Inert},
  {register: Dashboard, select: 'web'},
  {register: Vidi, select: 'web'},
  {register: Borland, select: 'api'},
  {register: ConcordaClient}
]

// Register our plugins.
server.register(plugins, function (err) {
  endIfErr(err)

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)

    var ports = []
    server.connections.forEach(function (connection) {
      ports.push(connection.info.port)
    })
    console.log('server started on ports: ' + ports.join(', '))
  })
})
