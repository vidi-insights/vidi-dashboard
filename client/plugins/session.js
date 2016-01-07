'use strict'

module.exports = function (varo) {
  console.log('init:session')

  var session = {
    token: null,
    user: null
  }

  varo.handle({role: 'session', cmd: 'start'},
    function start (msg, done) {
      console.log('session:start', msg)

      // var current = localStorage.getItem('session')
      // if (!current) localStorage.setItem('session', JSON.stringify(session))
      // else session = JSON.parse(current)

      done(null, session)
      varo.emit({cmd: 'session', event: 'started'})
    })

  varo.handle({role: 'session', cmd: 'update'},
    function update (msg, done) {
      console.log('session:update', msg)

      session.token = msg.token || session.token
      session.user = msg.user || session.user

      // localStorage.setItem('session', JSON.stringify(session))
      done()

      varo.emit({cmd: 'session', event: 'updated'})
    })

  varo.handle({role: 'session', cmd: 'validity'},
    function (msg, done) {
      console.log('session:validity', msg)

      return done(null, {valid: (session.token !== null)})
    })

  varo.handle({role: 'session', cmd: 'stop'},
    function (msg, done) {
      console.log('session:stop', msg)

       session = {
        token: null,
        user: null
      }

      // localStorage.setItem('session', JSON.stringify(session))
      done(null, session)

      varo.emit({cmd: 'session', event: 'stopped'})
    })
}
