'use strict'

import * as authActions from '../constants/auth'

const authState = {
  isLoggingIn: false,
  isLoggingOut: false,
  hasError: false,
  token: null
}

export default function auth (state = authState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true,
        isLoggingOut: false,
        hasError: false
      })

    case authActions.LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: action.hasError,
        token: action.token
      })

    case authActions.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggingOut: true,
        hasError: false
      })

    case authActions.LOGOUT_RESPONSE:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: action.hasError,
        token: action.token
      })

    default:
      return state
  }
}
