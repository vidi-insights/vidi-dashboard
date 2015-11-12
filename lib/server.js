'use strict'

const Path = require('path')
const Hapi = require('hapi')
const Inert = require('inert')


const server = new Hapi.Server()
server.connection({ port: process.env.PORT || 8080 })

server.register(Inert, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  server.route([
    { path: '/{file*}', method: 'GET', config: { handler: { file: Path.join(__dirname, '/deploy/index.html') } } },
    { path: '/{file*1}', method: 'GET', config: { handler: { directory: { path: Path.join(__dirname, '/deploy') } } } }
  ])

  server.start((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('server started on port ' + server.info.port)
  })
})
