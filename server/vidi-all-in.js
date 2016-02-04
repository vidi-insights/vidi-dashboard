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
    web: require('seneca-web')
  }
}

require('./start')(opts, (err, server) => {
  endIfErr(err)

  var seneca = server.seneca
    .use('user')
    .use('auth', {restrict: '/api'})

  seneca.act({
    role: 'user',
    cmd: 'register',
    name: opts.admin.name,
    email: opts.admin.email,
    password: opts.admin.password
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
