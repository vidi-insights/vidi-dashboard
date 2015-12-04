'use strict'

var Request = require('superagent/lib/client')
var Nes = require('nes/client')

module.exports = function auth (varo) {
  console.log('init:metrics')

  var client = new Nes.Client(document.URL.replace('http', 'ws'))
  client.connect(function (err) {
    if (!err) {
      console.log(err)
    }

    function make_subscription_msg (msg) {
      var source = msg.source
      var metric = msg.metric
      var uri = '/metrics' + '/' + source + '/' + metric

      return {
        role: 'metrics',
        source: source,
        metric: metric,
        uri: uri
      }
    }

    varo.handle({role: 'metrics', cmd: 'sub'},
      function (msg, done) {
        var sub = make_subscription_msg(msg)

        client.subscribe(sub.uri, function (err, msg) {
          varo.emit({
            role: sub.role,
            source: sub.source,
            metric: sub.metric,
            data: msg.data
          })
        })

        done()
      })

    varo.handle({role: 'metrics', cmd: 'unsub'},
      function (msg, done) {
        var sub = make_subscription_msg(msg)

        client.unsubscribe(sub.uri)
        done()
      })
  })
}
