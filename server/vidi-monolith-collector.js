'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('user') // Note: swap this out for local concorda
    .use('auth', {restrict: '/api'})
    .use('vidi-metrics', {collector: {enabled: true}})
    .use('vidi-toolbag-metrics')
    .use('vidi-influx-sink', opts.influx_sink)
    .use('vidi-toolbag-influx-queries', {influx: {host: '192.168.99.100'}})

  seneca.act({
    role: 'user',
    cmd: 'register',
    name: opts.admin.name,
    email: opts.admin.email,
    password: opts.admin.password
  })

  server.subscription('/api/vidi/toolbag/process')
  server.subscription('/api/vidi/toolbag/event_loop')

  setInterval(function () {
    seneca.act({role: 'vidi', source: 'toolbag', metric: 'process'}, function (err, data) {
      if (err) console.log(err.stack || err)
      if (data && data.length > 0) {
        server.publish('/api/vidi/toolbag/process', data)
      }
    })
    seneca.act({role: 'vidi', source: 'toolbag', metric: 'event_loop'}, function (err, data) {
      if (err) console.log(err.stack || err)
      if (data && data.length > 0) {
        server.publish('/api/vidi/toolbag/event_loop', data)
      }
    })

   }, 1000)

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)
  })
}
