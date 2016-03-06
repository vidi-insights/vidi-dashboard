'use strict'

var Decree = require('seneca-decree')

var dashboard = require('./dashboard')
var vidi_monolith = require('./vidi-monolith')
var vidi_concorda_mesh = require('./vidi-concorda-mesh')

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
    timeout: 1000,
    secure: true
  },
  vidi_metrics: {
    collector: {enabled: true}
  },
  vidi_influx_sink: {
    batch: {
      max: 5,
      timeout: 500,
    },
    influx: {
      host: '192.168.99.100'
    }
  }
}

var scripts = [
  {pin: {monolith: true}, script: vidi_monolith},
  {pin: {concorda: true}, script: vidi_concorda_mesh},
  {script: vidi_monolith}
]

Decree(opts, scripts, dashboard)
