'use strict'

import storage from '../util/storage'

import {
  LOGIN_REQUEST, LOGIN_RESPONSE,
  LOGOUT_REQUEST, LOGOUT_RESPONSE
} from '../actions/auth'

const authState = {
  isLogginIn: false,
  isLogginOut: false,
  hasError: false,
  token: storage.get('token')
}

export default function auth (state = authState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLogginIn: true,
        isLogginOut: false,
        hasError: false
      })

    case LOGIN_RESPONSE:
      return Object.assign({}, state, {
        isLogginIn: false,
        isLogginOut: false,
        hasError: action.hasError,
        token: action.token
      })

    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isLogginIn: false,
        isLogginOut: true,
        hasError: false
      })

    case LOGOUT_RESPONSE:
      return Object.assign({}, state, {
        isLogginIn: false,
        isLogginOut: false,
        hasError: action.hasError,
        token: action.token
      })

    default:
      return state
  }
}
