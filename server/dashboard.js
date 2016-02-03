'use strict'

var Path = require('path')
var Boom = require('boom')

module.exports = function (server, options, next) {
  server.dependency('inert')

  server.realm.settings.files.relativeTo = Path.join(__dirname, '../dist/')

  server.route({
    method: 'GET',
    path: '/css/{path*}',
    handler: {
      directory: {
        path: './css/',
        redirectToSlash: true,
        index: false
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory: {
        path: './js/',
        redirectToSlash: true,
        index: false
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/img/{path*}',
    handler: {
      directory: {
        path: './img/',
        redirectToSlash: true,
        index: false
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: './assets/',
        redirectToSlash: true,
        index: false
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: {
        path: './index.html'
      }
    }
  })

  // Only allow connections from localhost
  server.ext('onRequest', function (request, reply) {
    var host = request.raw.req.connection.address().address
    if (host !== '127.0.0.1') {
      return reply(Boom.forbidden())
    }

    return reply.continue()
  })

  next()
}

// Hapi uses this metadata. It's convention to provide
// it even though we are actually the same package.
module.exports.attributes = {
  name: 'dashboard'
}
