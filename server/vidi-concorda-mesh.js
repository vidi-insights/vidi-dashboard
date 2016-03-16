'use strict'

module.exports = (opts, server, done) => {
  var seneca = server.seneca
    .use('concorda-client', {
        mesh: {
          active: process.env.USE_MESH || true
        },
        transport: {
          active: process.env.USE_TRANSPORT || true,
          type: process.env.TRANSPORT_TYPE || 'tcp'
        },
        auth: {
          restrict: '/api',
          password: process.env.COOKIE_PASSWORD || '12323433234ffdfrdssadfhsamqwr098yrd09r8mhmf9q84mfxkwedorgno438drn8473nd,mnjbrk'
        }
      }
    )
    .use('./views/sensors')
    .use('./views/messages')
    .use('./views/toolbag')

  seneca.ready(() => {
    seneca.log.info('hapi', server.info.port)

    server.start((err) => {
      if (err) return done(err)

      seneca.act({
        role: 'user',
        cmd: 'register',
        name: opts.admin.name,
        email: opts.admin.email,
        password: opts.admin.password
      })

      server.subscription('/api/vidi/view/messages')
      server.subscription('/api/vidi/view/sensors')
      server.subscription('/api/vidi/view/processes')
      server.subscription('/api/vidi/view/event_loop')

      setInterval(() => {
        seneca.act({role: 'vidi', source: 'toolbag', metric: 'process'}, function (err, data) {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0) {
            server.publish('/api/vidi/view/processes', data)
          }
        })
      }, 1000)

      setInterval(() => {
        seneca.act({role: 'vidi', source: 'toolbag', metric: 'event_loop'}, function (err, data) {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0) {
            server.publish('/api/vidi/view/event_loop', data)
          }
        })
      }, 1000)

      setInterval(() => {
        seneca.act({role: 'vidi', read: 'view.messages'}, (err, data) => {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0) {
            server.publish('/api/vidi/view/messages', data)
          }

        })
      }, 1000)

      setInterval(() => {
        seneca.act({role: 'vidi', read: 'view.sensors'}, (err, data) => {
          if (err) console.log(err.stack || err)

          if (data && data.length > 0) {
            server.publish('/api/vidi/view/sensors', data)
          }

        })
      }, 1000)

      done()
    })
  })
}
