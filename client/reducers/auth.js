'use strict'

import * as storage from '../util/storage'
import {TOKEN_REQUEST, TOKEN_RESPONSE} from '../actions'

const authState = {
  isFetching: false,
  hasError: false,
  token: storage.get('token')
}

export default function (state = authState, action) {
  switch (action.type) {
    case TOKEN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false
      })

    case TOKEN_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: action.hasError,
        token: action.token
      })

    default:
      return state
  }
}
