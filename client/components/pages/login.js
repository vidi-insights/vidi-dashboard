'use strict'

var React = require('react')
var BoxHeader = require('../widgets/boxHeader')
var History = require('react-router').History
var Varo = require('../../plugins').Varo

module.exports = React.createClass({
  mixins: [History],

  initialState: {
    failed: false
  },

  getInitialState: function () {
    return this.initialState
  },

  handleSubmit: function (event) {
    event.preventDefault()

    var that = this
    var refs = this.refs
    var email = refs.email.value
    var pass = refs.pass.value

    Varo.act({role: 'auth', cmd: 'login', username: email, password: pass},
      function (err, reply) {
        if (err) return that.setState({failed: true})
        if (!reply.token) return that.setState({failed: true})

        Varo.act({role: 'user', cmd: 'load', token: reply.token},
          function (err, reply) {
            if (err) return that.setState({failed: true})
            if (!reply.user || !reply.token) return that.setState({failed: true})

            Varo.act({
              role: 'session',
              cmd: 'update',
              user: reply.user,
              token: reply.token
            })

            var location = that.props
            var state = location.state

            if (state && state.nextPathname) that.history.replaceState(null, state.nextPathname)
            else that.history.replaceState(null, '/')
          })
      })
  },

  render: function () {
    var message = 'Login'
    if (this.state.failed) message = 'Wrong username or password, try again'

    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <BoxHeader icon={'fa fa-sign-in'} title={message} />
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
