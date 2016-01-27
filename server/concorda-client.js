'use strict'

const _ = require('lodash')

let options = {name: 'concorda'}

// Hapi Plugin for wiring up Concorda
module.exports = function (server, opts, next) {
  // Set up our seneca plugins
  let seneca = server.seneca
  options = _.extend({}, opts, options)

  seneca.add('role: ' + options.name + ', cmd: closeSession', function(msg, done){
    done()
  })

  seneca
    .use('mesh',{auto:true, pin:'role:' + options.name})

  next()
}


// Hapi plugin metadata
module.exports.attributes = {
  name: options.name
}
