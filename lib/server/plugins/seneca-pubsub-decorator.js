'use strict'

var Varo = require('varo')

var defaults = {

}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend

  options = extend(defaults, options)
  var varo = new Varo(options)

  seneca.add({cmd:'emit'}, function (msg, done) {
    delete msg.cmd

    varo.emit(msg)
    done()
  })

  seneca.add({sub: 'sub', function (msg, done) {
    delete msg.cmd

    varo.observe(msg, done)
  }})

  return {
    name: 'seneca-pubsub-decorator'
  }
}
