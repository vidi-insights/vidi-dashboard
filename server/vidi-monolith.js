'use strict'

module.exports = (opts, server, done) => {
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
    server.start((err) => {
      if (err) return done(err)

      enable_readmodels(server)
      done()
    })
  })
}

function enable_readmodels(server) {

}
