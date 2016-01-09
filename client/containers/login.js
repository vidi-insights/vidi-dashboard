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

function mapStatesToProps (state) {
  const {auth} = state

  return {
    hasError: auth.hasError
  }
}

export default connect(mapStatesToProps)(Login)
