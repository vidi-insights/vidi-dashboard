'use strict'

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
  },
  mesh: {
    auto: true,
    pin: 'role:concorda,info:logout'
  }
}

require('./start')(opts, (err, server) => {
  endIfErr(err)

  var seneca = server.seneca
    .use('auth', {restrict: '/api'})
    .use('local-auth')
    .use('pubsub')
    .use('mesh', opts.mesh)

  server.subscription('/user/logout')
  seneca.add({role: 'user', info: 'logout'}, (msg, done) => {
    server.publish('user/logout', {user: msg.user_id})
  })

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(endIfErr)
  })
})

function endIfErr (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}
