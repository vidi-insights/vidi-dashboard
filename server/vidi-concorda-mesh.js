'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('auth', {restrict: '/api'})

  seneca
    .use('mesh', {auto: true})

  server.route({
    method: 'GET',
    path: '/auth/login_google',
    handler: function (request, reply) {
      reply.redirect('http://localhost:3050/auth/login_google?callback_url=http://localhost:3000')
    }
  });

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)
  })
}
