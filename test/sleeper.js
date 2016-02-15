'use strict'

require('seneca')()
  .listen({port: 5064})

setInterval(() => {
  ((msec) => {
    var start = Date.now()
    while (Date.now() - start < msec) {}
  })(1000)
}, 2000)
