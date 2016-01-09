'use strict'

import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT_REQUEST,
  LOGOUT_RESPONSE
} from '../actions/auth'

const authState = {
  isLoggingIn: false,
  isLoggingOut: false,
  hasError: false,
  token: null
}

export default function auth (state = authState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true,
        isLoggingOut: false,
        hasError: false
      })

    case LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggingOut: false,
        hasError: action.hasError,
        token: action.token
      })

    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggingOut: true,
        hasError: false
      })

    case LOGOUT_RESPONSE:
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
