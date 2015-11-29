'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')
var ProfileToolbox = require('./profileToolbox')
var Varo = require('../../plugins').Varo

module.exports = React.createClass({
  initialState: {
    isLoggedIn: false
  },

  getInitialState: function () {
    return this.initialState
  },

  componentDidMount: function () {
    var that = this

    Varo.act({role: 'user', cmd: 'isLoggedIn'},
      function (err, reply) {
        that.setState({
          isLoggedIn: reply.isLoggedIn
        })
      })

    Varo.observe({role: 'user', event: 'updated'},
      function (user) {
        that.setState({
          isLoggedIn: user.isLoggedIn
        })
      })
  },
  
  render: function () {
    var toolbox = <ProfileToolbox />
    if (!this.state.isLoggedIn) {
      toolbox = null
    }

    return (
      <div className="header">
        <BoxHeader
          icon={'./img/vidi-logo-small.svg'}
          iconLink={'/'}
          title={'Vidi: Dashboard'}
          toolbox={toolbox} />
      </div>
    )
  }
})
