'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth'

export const Login = React.createClass({
  componentDidMount () {
  },

  handleSubmit (event) {
    event.preventDefault()

    const {email, pass} = this.refs
    const {dispatch} = this.props

    dispatch(login(email.value, pass.value))

    email.value = ''
    pass.value = ''
  },

  render () {
    const {hasError, niceError} = this.props
    let heading = hasError ? niceError : 'Login'

    return (
      <main className="page page-login" role="main">
        <div className="container-fluid">
          <div className="row middle-xs center-xs vertical-center">
            <form className="login-form col-xs-12 col-md-6 col-lg-4 txt-left form-full-width form-panel"
                  onSubmit={this.handleSubmit}>

              <h2 className="mt0 has-icon">
                <span className='icon icon-signin'></span>
                <span>{heading}</span>
              </h2>

              <input ref="email" type="email" placeholder="Email" className="input-large" required/>
              <input ref="pass" type="password" placeholder="Password" className="input-large" required/>
              <button type="submit" className="btn btn-large submit">Submit</button>
              <a href="/auth/login_google">Google Login</a>

              <div className="panel-footer">
                <p>Or log in using one of the following services:</p>
                <button className="btn btn-secondary btn-github has-icon"><span className="icon icon-github"></span> Github</button>
                <button className="btn btn-secondary btn-twitter has-icon"><span className="icon icon-twitter"></span> Twitter</button>
                <button className="btn btn-secondary btn-google has-icon"><span className="icon icon-google"></span> Google</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }
})

export default connect((state) => {
  const {hasError, niceError} = state.auth

  return {
    hasError: hasError,
    niceError: niceError
  }
})(Login)
