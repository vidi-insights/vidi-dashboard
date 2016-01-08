'use strict'

var React = require('react')
var BoxHeader = require('../widgets/boxHeader')
var History = require('react-router').History
import { connect } from 'react-redux'
import {fetchToken} from '../../actions'

const LoginPage = React.createClass({
  handleSubmit (event) {
    event.preventDefault()

    const {email, pass} = this.refs
    const {dispatch} = this.props

    dispatch(fetchToken(email.value, pass.value))
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
    isFetching: auth.isFetching,
    hasError: auth.hasError,
    token: auth.token
  }
}

export default connect(mapStatesToProps)(LoginPage)
