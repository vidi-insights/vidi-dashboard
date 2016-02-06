'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    //.use('user') // Note: swap this out for local concorda
    //.use('auth', {restrict: '/api'})
    .use('stats', {collector: true})
    .use('toolbag-stats')
    .use('influx-stats-store', {influx: {host: '192.168.99.100'}})

  seneca.act({
    role: 'user',
    cmd: 'register',
    name: opts.admin.name,
    email: opts.admin.email,
    password: opts.admin.password
  })

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)
  })
}
