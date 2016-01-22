'use strict'

var Auth = require('seneca-auth')

// Hapi Plugin for wiring up Vidi
module.exports = function (server, options, next) {
  server.dependency('chairo')

  // Set up our seneca plugins
  var seneca = server.seneca

  // pin any user commands out to concorda
  seneca.client({type:'tcp', port: '3055', pin:'role:user, cmd:*'})

  // set up our own local auth
  seneca.use(Auth, {
    restrict: '/api',
    server: 'hapi',
    strategies: [{provider: 'local'}]
  })

  // Set up a default user in concorda
  seneca.act({
    role: 'user',
    cmd: 'register',
    name: process.env.USER_NAME || 'Admin',
    email: process.env.USER_EMAIL || 'admin@vidi.com',
    password: process.env.USER_PASS || 'vidi'
  })

  next()
}


// Hapi plugin metadata
module.exports.attributes = {
  name: 'vidi'
}
