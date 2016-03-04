'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('concorda-client')

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)
  })
}
