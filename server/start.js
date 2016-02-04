'use strict'

var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Hapi = require('hapi')
var Inert = require('inert')
var Nes = require('nes')
var Path = require('path')
var Boom = require('boom')

module.exports = function (opts, done) {
  var server = new Hapi.Server()

  server.connection({port: opts.server.port})
  server.realm.settings.files.relativeTo = Path.join(__dirname, '../dist/')

  var plugins = [
    {register: Bell},
    {register: Cookie},
    {register: Chairo, options: opts.chairo},
    {register: Nes},
    {register: Inert}
  ]

  server.register(plugins, (err) => {
    if (err) return done(err)

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
      path: '/{path*}',
      handler: {
        file: {
          path: './index.html'
        }
      }
    })

    done(null, server)
  })
}
