'use strict'

var Decree = require('seneca-decree')

var dashboard = require('./dashboard')
var vidi_monolith = require('./vidi-monolith')
var vidi_monolith_collector = require('./vidi-monolith-collector')

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
    web: true
  }
}

var scripts = [
  {pin: {monolith: true, collector: true}, script: vidi_monolith_collector},
  {pin: {monolith: true}, script: vidi_monolith},
  {script: vidi_monolith_collector}
]

Decree(opts, scripts, dashboard)
