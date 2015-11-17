'use strict'

var locals = {
  varo: null,
}

var startMsg = {role: 'session', cmd: 'start'}

function start (msg, done) {
  done(null, {})
}

module.exports = function (varo) {
  locals.varo = varo

  varo.handle(startMsg, start)
}
