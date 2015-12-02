'use strict'

var Varo = require('varo')

var defaults = {

}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend

  options = extend(defaults, options)
  var varo = new Varo(options)

  seneca.decorate('publish', varo.emit)
  seneca.decorate('subscribe', varo.observe)

    return {
      name: 'seneca-pubsub-decorator'
    }
  }
}
