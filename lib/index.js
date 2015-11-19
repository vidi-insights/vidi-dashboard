var Package = require('../package.json')
var Routes = require('./routes')
var Users = require('./users')

module.exports = function (server, options, next) {

  server.dependency('chairo')
  server.dependency('inert')

  server.state('session', {
    ttl: 24 * 60 * 60 * 1000,     // One day
    isSecure: true,
    path: '/',
    encoding: 'base64json'
  })

  server.route(Routes)
  Users(server.seneca)
  next()
}


module.exports.attributes = {
  pkg: Package
}
