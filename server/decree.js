//NOTE: move to seneca-decree

'use strict'

const Minimist = require('minimist')
const Jsonic = require('jsonic')
const Patrun = require('patrun')()
const _ = require('lodash')

module.exports = (opts, scripts, ready) => {
  let catch_all = (opts, server, done) => {
    const seneca = server.seneca
    seneca.ready(() => {
      seneca.log.info('PORT', server.info.port)
      server.start(done)
    })
  }

  _.each(scripts, (map) => {
    if (map.pin) Patrun.add(map.pin, map.script)
    else catch_all = map.script
  })

  const input = Minimist(process.argv.slice(2))._[0] || ''
  const pattern = Jsonic(input)

  let match = Patrun.find(pattern)
  if (match) match = wrap(match)
  else match = wrap(catch_all)

  return ready(opts, match)
}

function endOnError (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
}

function wrap (inner) {
  const wrapper = (err, opts, server) => {
    endOnError(err)

    return inner(opts, server, (err) => {
      endOnError(err)
    })
  }

  return wrapper
}
