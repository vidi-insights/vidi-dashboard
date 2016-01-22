var Path = require('path')
var Boom = require('boom')
var Package = require('../package.json')

var ClientRoutes = require('./routes/client')
var UserRoutes = require('./routes/user')
var SenecaUser = require('seneca-user')

module.exports = function (server, options, next) {
  // Set our realitive path (for our routes)
  var relativePath = Path.join(__dirname, '../dist/')
  server.realm.settings.files.relativeTo = relativePath

  // Session stuff
  server.state('session', {
    ttl: 24 * 60 * 60 * 1000,
    isSecure: true,
    path: '/',
    encoding: 'base64json'
  })

  // Wire up our http routes, these are
  // mostly for managing the dashboard.
  server.route(ClientRoutes)
  server.route(UserRoutes)

  // Only allow connections from localhost
  server.ext('onRequest', function (request, reply) {
    var host = request.raw.req.connection.address().address
    if (host !== '127.0.0.1') {
      return reply(Boom.forbidden())
    }

    return reply.continue()
  })

  // Set up our seneca plugins
  var seneca = server.seneca
  seneca.use(SenecaUser)

  // Set up a default user
  seneca.act({
    role: 'user',
    cmd: 'register',
    name: process.env.USER_NAME || 'Admin',
    email: process.env.USER_EMAIL || 'admin@vidi.com',
    password: process.env.USER_PASS || 'vidi'
  })

  next()
}

// Hapi uses this metadata. It's convention to provide
// it even though we are actually the same package.
module.exports.attributes = {
  pkg: Package
}
