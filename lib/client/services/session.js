'use strict'

module.exports = function (varo) {
  var sessionStore = {
    token: ''
  }

  varo.handle({role: 'session', cmd: 'start'},
    function start (msg, done) {
      console.log('session:start', msg)

      var currentStore = localStorage.getItem('session')
      if (!currentStore) {
        localStorage.setItem('session', JSON.stringify(sessionStore))
      }
      else {
        sessionStore = JSON.parse(currentStore)
      }

      varo.act({role: 'session', event: 'update', key:'token', value: sessionStore.token})
      return done(null)
    })

  varo.handle({role: 'session', cmd: 'update'},
    function update (msg, done) {
      console.log('session:update', msg)

      sessionStore.token = msg.token
      localStorage.setItem('session', JSON.stringify(sessionStore))

      done()
    })

  varo.handle({role: 'session', cmd: 'read'},
    function (msg, done) {
      console.log('session:read', msg)

      return done()
    })
}
