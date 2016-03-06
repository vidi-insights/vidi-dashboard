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

    }, 2000)



  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)
    server.start(done)

    setTimeout(function () {
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
    }, 5000)
  })
}
