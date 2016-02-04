'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('auth', {restrict: '/api'})

  // Do fancy concorda and meshing stuff in here only.
  // You have access to fully loaded server and seneca

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)
  })
}
