'use strict'

var React = require('react')
var BoxHeader = require('../widgets/boxHeader')
var Varo = require('../../plugins').Varo
var IndexLink = require('react-router').IndexLink

module.exports = React.createClass({
  getInitialState: function () {
    return {
      completed: false
    }
  },

  handleSubmit: function (event) {
    event.preventDefault()

    var that = this

    Varo.act({role: 'session', cmd: 'current'},
      function (err, reply) {
        if (err || !reply.valid) {
          Varo.act({role: 'session', cmd: 'stop'})
          return that.setState({complete: true})
        }

        Varo.act({role: 'auth', cmd: 'logout', token: reply.token},
          function (err, reply) {
              Varo.act({role: 'session', cmd: 'stop'})
              return that.setState({completed: true})
          })
      })
  },

  render: function () {
    var completeForm = (
      <form className="login-form">
        <BoxHeader icon={'fa fa-sign-out'} title={'Sign out'} />
        <fieldset>
          <p>
            You are now logged out.
          </p>
          <button type="submit" className="submit">
            <span><IndexLink to='/'>Home</IndexLink></span>
          </button>
        </fieldset>
      </form>
    )

    var logoutForm = (
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
    )

    var child = logoutForm
    if (this.state.complete) {
      child = completeForm
    }

    return (
      <div className="logout">
        {child}
      </div>
    )
  }
})
