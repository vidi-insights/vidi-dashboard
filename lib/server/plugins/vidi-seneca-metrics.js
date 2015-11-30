'use strict'

var Influx = require('influx')
var _ = require('lodash')

var defaults = {
  host: 'localhost',
  port: 8086,
  username: 'msgstats',
  password: 'msgstats',
  database: 'seneca_msgstats'
}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend
  var counter = 0

  options = extend(defaults, options)
  var db = Influx(options)

  seneca.add({role: 'metrics', source: 'seneca', metric: 'requests'},
    function (msg, done) {
      db.query('SELECT SUM(c) FROM "req:part,role:info" WHERE time > now() - 120s  GROUP BY time(1s)',
        function (err, data) {
          if (err || !data) return done(null, null)

          data[0].forEach(function (point) {
            if (point.sum === null) {
              point.sum = 0
            }

            point.x = new Date(point.time).getTime()
            point.y = point.sum

            delete point.time
            delete point.sum
          })

          var sorted = _.sortBy(data[0], 'x');
          done(null, {data: sorted})
        })
    })

    seneca.add({role: 'metrics', source: 'seneca', metric: 'responses'},
      function (msg, done) {
        db.query('SELECT SUM(c) FROM "res:part,role:info" WHERE time > now() - 120s  GROUP BY time(1s)',
          function (err, data) {
            if (err || !data) return done(null, null)

            data[0].forEach(function (point) {
              if (point.sum === null) {
                point.sum = 0
              }

              point.x = new Date(point.time).getTime()
              point.y = point.sum

              delete point.time
              delete point.sum
            })

            var sorted = _.sortBy(data[0], 'x');
            done(null, {data: sorted})
          })
      })

  seneca.add({role: 'metrics', source: 'seneca', metric: 'npm'},
    function (msg, done) {
      db.query('SELECT SUM(c) FROM "cmd:get,role:npm"  WHERE time > now() - 120s  GROUP BY time(1s)',
        function (err, data) {
          if (err || !data) return done(null, null)

          data[0].forEach(function (point) {
            if (point.sum === null) {
              point.sum = 0
            }

            point.x = new Date(point.time).getTime()
            point.y = point.sum

            delete point.time
            delete point.sum
          })

          var sorted = _.sortBy(data[0], 'x');
          done(null, {data: sorted})
        })
    })

  return {
    name: 'vidi-seneca-metrics'
  }
}
