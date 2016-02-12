'use strict'

var seneca = require('seneca')()
seneca.listen({port: 5064})

setInterval(function () {
  sleep(1000)
}, 2000)

function sleep (msec) {
  var start = Date.now()
  while (Date.now() - start < msec) {}
}
