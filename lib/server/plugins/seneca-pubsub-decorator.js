'use strict'

var Varo = require('varo')
var varo

var defaults = {

}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend

  options = extend(defaults, options)
  varo = new Varo(options)

  seneca.decorate('subscribe', varo.observe.bind(varo))
  seneca.decorate('publish', varo.emit.bind(varo))

  return {
    name: 'seneca-pubsub-decorator'
  }
}
