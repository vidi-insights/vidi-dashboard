'use strict'

var influx = require('influx')
var _ = require('lodash')
var moment = require('moment')

var opts = {
  plugin: 'vidi-view-messages',
  enabled: true,
  influx: {
    host: 'localhost',
    port: '8086',
    username: 'metrics',
    password: 'metrics',
    database: 'vidi_metrics'
  }
}


module.exports = function (options) {

  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(opts, options)

  seneca.add({role: 'vidi', read: 'view.messages'}, createView)

  return 'views-messages'
}

function createView (msg, done) {
     var seneca = this
     var payload = payload || []

     if (!opts.enabled) {
       return done(null, payload)
     }

     var db = influx(opts.influx)
     var qry = 'SELECT * FROM "seneca.message.flow_rate" WHERE time > now() - 120s'
     db.query(qry, (err, data) => {
       if (err) {
         seneca.log.error(err)
         opts.enabled = false
       }
       else {
         data = _.groupBy(data[0], 'pattern')

         _.each(data, (group) => {
           var latest = _.clone(_.last(group))
           latest.time = moment(latest.time).format('hh:mm:ss')
           latest.pid = latest.id

           payload.push({
             name: 'view.messages',
             pattern: latest.pattern,
             pid: latest.id,
             tag: latest.tag,
             latest: latest,
             series: {
               time: _.map(group, x => moment(x.time).format('hh:mm:ss')),
               rate: _.map(group, x => x.rate),
             }
           })
         })
       }

       done(err, payload)
     })
}
