'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import BoxHeader from '../components/boxHeader'

export const Login = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    hasError: React.PropTypes.bool.isRequired,
  },

  handleSubmit (event) {
    event.preventDefault()

    const {email, pass} = this.refs
    const {dispatch} = this.props

    dispatch(login(email.value, pass.value))
  },

  render () {
    var message = 'Login'
    if (this.props.hasError) message = 'Wrong username or password, try again'

    return (
      <main className="page page-login" role="main">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <BoxHeader icon={'icon icon-signin'} title={message} />
            <input ref="email" type="email" placeholder="Email" className="input-large" required />
            <input ref="pass" type="password" placeholder="Password" className="input-large" required />
            <button type="submit" className="btn btn-large submit">
              <span>Submit</span>
            </button>
        </form>
      </main>
    )
  }
})

function mapStatesToProps (state) {
  const {auth} = state

  return {
    hasError: auth.hasError
  }
}

export default connect(mapStatesToProps)(Login)
