var Path = require('path')
var Package = require('../../package.json')
var Users = require('./users')

var AuthRoutes = require('./routes/auth-routes')
var ClientRoutes = require('./routes/client')
var UserRoutes = require('./routes/user')

module.exports = function (server, options, next) {
  server.dependency('chairo')
  server.dependency('inert')
  server.dependency('nes')

  // Set our realitive path (for our routes)
  var relativePath = Path.join(__dirname, '../public/')
  server.realm.settings.files.relativeTo = relativePath


  server.state('session', {
    ttl: 24 * 60 * 60 * 1000,
    isSecure: true,
    path: '/',
    encoding: 'base64json'
  })

  // Wire up our http routes, these are
  // mostly for managing the dashboard.
  server.route(AuthRoutes)
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
  seneca.use('user')
  seneca.use(require('./plugins/seneca-pubsub-decorator'))

  // Set up a default user
  seneca.act({
    role:'user',
    cmd:'register',
    name: "Admin",
    email: 'admin@vidi.com',
    password: 'vidi'
  })

  // Handle subscription wireup.
  seneca.subscribe({role: 'metrics', cmd: 'sub'},
    function (msg) {
      server.subscription('/metrics/msgstats/rolling_flow_rate')
    })

  next()
}

// Hapi uses this metadata. It's convention to provide
// it even though we are actually the same package.
module.exports.attributes = {
  pkg: Package
}
