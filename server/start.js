'use strict'

var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Dashboard = require('./dashboard')
var Hapi = require('hapi')
var Inert = require('inert')
var Nes = require('nes')
var Vidi = require('./vidi')

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
server.connection({port: opts.server.port})

// Declare our Hapi plugin list.
var plugins = [
  {register:Bell},
  {register:Cookie},
  {register: Chairo, options: opts.chairo},
  {register:Nes},
  {register:Inert},
  {register:Dashboard},
  {register:Vidi}
]

// Register our plugins.
server.register(plugins, function (err) {
  endIfErr(err)

  // Kick off the server.
  server.start(function (err) {
    endIfErr(err)

    // Hello world!
    console.log('server started: ' + server.info.port)
  })
})
