'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca

  seneca
    .use('mesh', {auto: true})

  seneca
    .use('auth', {restrict: '/api'})

  // Do fancy concorda and meshing stuff in here only.
  // You have access to fully loaded server and seneca

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
