'use strict'

var Hapi = require('hapi')
var Inert = require('inert')
var Nes = require('nes')
var Path = require('path')
var Boom = require('boom')

var server = new Hapi.Server()
server.connection({port: '3000'})
server.realm.settings.files.relativeTo = Path.join(__dirname, '../dist/')

var plugins = [
  {register: Nes},
  {register: Inert}
]

server.register(plugins, (err) => {
  exitIfErr(err)

  server.route(uiRoutes())

  server.start((err) => {
    exitIfErr(err)

    server.subscription('/sensors')
    setInterval(() => {server.publish('/sensors', {})}, 1000)
    console.log('server started')
  })
})

function exitIfErr (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
}

function uiRoutes () {
  return [
    {
      method: 'GET',
      path: '/css/{path*}',
      handler: {
        directory: {
          path: './css/',
          redirectToSlash: true,
          index: false
        }
      }
    },
    {
      method: 'GET',
      path: '/js/{path*}',
      handler: {
        directory: {
          path: './js/',
          redirectToSlash: true,
          index: false
        }
      }
    },
    {
      method: 'GET',
      path: '/img/{path*}',
      handler: {
        directory: {
          path: './img/',
          redirectToSlash: true,
          index: false
        }
      }
    },
    {
      method: 'GET',
      path: '/{path*}',
      handler: {
        file: {
          path: './index.html'
        }
      }
    }
  ]
}
