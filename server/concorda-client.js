'use strict'

// Hapi Plugin for wiring up Concorda
module.exports = function (server, options, next) {
  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.add('role: concorda-client, cmd: closeSession', function(msg, done){
    done()
  })

  seneca
    .use('mesh',{auto:true, pin:'role:concorda-client'})

  next()
}


// Hapi plugin metadata
module.exports.attributes = {
  name: 'concorda-client'
}
