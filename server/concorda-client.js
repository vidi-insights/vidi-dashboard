'use strict'

const _ = require('lodash')

let options = {name: 'concorda'}

// Hapi Plugin for wiring up Concorda
module.exports = function (server, opts, next) {
  // Set up our seneca plugins
  let seneca = server.seneca
  let uri = '/user/logout'

  options = _.extend({}, opts, options)

  server.subscription(uri)
  seneca.add('role: ' + options.name + ', info: logout', function(msg, done){
    done()
    server.publish(uri, {user_id: msg.user_id})
  })

  seneca
    .use('mesh',{auto:true, pin:'role:' + options.name + ', info: *'})

  next()
}


// Hapi plugin metadata
module.exports.attributes = {
  name: options.name
}
