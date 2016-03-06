'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('user')
    .use('auth', {restrict: '/api'})
    .use('./views/processes')
    .use('./views/sensors')
    .use('./views/messages')

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

      server.subscription('/api/vidi/view/processes')
      server.subscription('/api/vidi/view/messages')
      server.subscription('/api/vidi/view/sensors')

      setInterval(() => {
        seneca.act({role: 'vidi', read: 'view.processes'}, (err, data) => {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0)
            server.publish('/api/vidi/view/processes', data)
        })
      }, 1000)

      setInterval(() => {
        seneca.act({role: 'vidi', read: 'view.messages'}, (err, data) => {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0)
            server.publish('/api/vidi/view/messages', data)
        })
      }, 1000)

      setInterval(() => {
        seneca.act({role: 'vidi', read: 'view.sensors'}, (err, data) => {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0)
            server.publish('/api/vidi/view/sensors', data)
        })
      }, 1000)

      done()
    })
  })
}
