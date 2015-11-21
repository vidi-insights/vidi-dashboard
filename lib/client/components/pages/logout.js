'use strict'

var React = require('react')
var BoxHeader = require('../widgets/boxHeader')
var History = require('react-router').History
var Varo = require('../../services').Varo

module.exports = React.createClass({
  mixins: [History],

  initialState: {
    logoutCompleted: false,
    token: null
  },

  getInitialState: function () {
    return this.initialState
  },

  onComponentWillMount: function () {
    Varo.act({role: 'user', query: 'profile'},
      function (reply, done) {
        this.setState({
          token: reply.token
        })
      })
  },

  handleSubmit: function (event) {
    event.preventDefault()

    var token = this.state.token
    var logoutMsg = {
      role: 'auth',
      cmd: 'logout',
      token: token
    }

    var that = this

    Varo.act(logoutMsg, function (err, reply) {
      if (err) {
        that.history.replaceState(err, '/error')
      }

      if (!reply.isAuthenticated) {
        return that.setState({
          logoutCompleted: true
        })
      }
    })
  },

  render: function () {
    return (
      <div className="logout">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <BoxHeader icon={'fa fa-sign-out'} title={'Sign out'} />
          <fieldset>
            <p>
              Are you sure you wish to sign out ?
            </p>
            <button type="submit" className="submit">
              <span>Confirm</span>
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
})
