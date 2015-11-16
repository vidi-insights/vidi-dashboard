'use strict'

var React = require('react')
var History = require('react-router').History

var Auth = require('../../services/auth')

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

    var email = this.refs.email.value
    var pass = this.refs.pass.value
    var that = this

    Auth.login(email, pass, function (isAuthenticated) {
      if (!isAuthenticated) {
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
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend className="legend">Login</legend>

            <div className="input">
              <input ref="email" type="email" placeholder="Email" required />
              <span><i className="fa fa-envelope-o"></i></span>
            </div>

            <div className="input">
              <input ref="pass" type="password" placeholder="Password" required />
              <span><i className="fa fa-lock"></i></span>
            </div>

            <button type="submit" className="submit">
              <span>Login</span>
              <i className="fa fa-long-arrow-right"></i>
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
})
