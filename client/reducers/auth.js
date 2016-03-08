'use strict'

const authState = {
  isLoggedIn: false,
  hasError: false,
  niceError: null
}

export default function auth (state = authState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoggedIn: false,
        hasError: false,
        niceError: null
      }

    case 'AUTH_VALIDATED':
    case 'LOGIN_RESPONSE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        hasError: action.hasError,
        niceError: action.niceError
      }

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        hasError: false,
        niceError: null
      }

    case 'LOGOUT_RESPONSE':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        hasError: action.hasError,
        niceError: action.niceError
      }

    default:
      return state
  }
}
