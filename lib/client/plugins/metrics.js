'use strict'

var Request = require('superagent/lib/client')
var Nes = require('nes/client')

module.exports = function auth (varo) {
  console.log('init:metrics')

  var client = new Nes.Client(document.URL.replace('http', 'ws'))
  client.connect(function (err) {
    if (!err) {
      client.subscribe('/metrics/seneca/requests', function (err, data) {
        console.log(data)
        varo.emit({role: 'metrics', source: 'seneca', metric: 'requests', data:data})
      })

      client.subscribe('/metrics/seneca/responses', function (err, data) {
        console.log(data)
        varo.emit({role: 'metrics', source: 'seneca', metric: 'responses', data:data})
      })

      client.subscribe('/metrics/seneca/npm', function (err, data) {
        console.log(data)
        varo.emit({role: 'metrics', source: 'seneca', metric: 'npm', data:data})
      })
    }
  })


}
