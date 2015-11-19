'use strict'

var React = require('react')
var History = require('react-router').History
var Varo = require('../../services').Varo

module.exports = React.createClass({
  mixins: [History],

  initialState: {
    authFailed: false
  },

  getInitialState: function () {
    return this.initialState
  },

  handleSubmit: function (event) {
    event.preventDefault()

    var loginMsg = {
      role: 'auth',
      cmd: 'login',
      username: this.refs.email.value,
      password: this.refs.pass.value
    }

    var that = this

    Varo.act(loginMsg, function (err, reply) {
      if (err) {
        that.history.replaceState(err, '/error')
      }

      if (!reply.isAuthenticated) {
        return that.setState({auth_failed: true})
      }

      var location = that.props
      if (location.state && location.state.nextPathname) {
        that.history.replaceState(null, location.state.nextPathname)
      }
      else {
        that.history.replaceState(null, '/')
      }
    })
  },

  render: function () {
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="box-header">
            <div className="box-header-icon">
            </div>
            <div className="box-header-titlebar">
              <span>Please log in</span>
            </div>
          </div>
          <fieldset>
            <input ref="email" type="email" placeholder="Email" required />
            <input ref="pass" type="password" placeholder="Password" required />
            <button type="submit" className="submit">
              <span>Submit</span>
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
})
