'use strict'

var Decree = require('seneca-decree')
var mesh_monolith = require('./vidi-all-in')
var mesh_concorda = require('./vidi-concorda-mesh')
var dashboard = require('./dashboard')

var opts = {
  admin: {
    name: process.env.USER_NAME || 'Admin',
    email: process.env.USER_EMAIL || 'admin@email.com',
    password: process.env.USER_PASS || 'admin'
  },
  server: {
    port: process.env.PORT || 3000
  },
  chairo: {
    timeout: 500,
    secure: true,
    web: require('seneca-web')
  }
}

var scripts = [
  {pin: {monolith: true}, script: mesh_monolith},
  {pin: {concorda: true}, script: mesh_concorda}
]

Decree(opts, scripts, dashboard)
