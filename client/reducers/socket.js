'use strict'

import {
  SOCKET_SUBSCRIBE,
  SOCKET_UPDATE,
  SOCKET_UNSUBSCRIBE
} from '../actions/socket'

const subState = {
  isSubscribing: true,
  isSubscribed: false,
  data: {}
}

function sub (state = subState, action) {
  switch (action.type) {
    case SOCKET_SUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: true,
        isSubscribed: false
      })

    case SOCKET_UPDATE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: true,
        data: action.data
      })

    case SOCKET_UNSUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: false,
        data: {}
      })

    default:
      return state
  }
}

export default function socket (state = {}, action) {
  switch (action.type) {
    case SOCKET_SUBSCRIBE:
    case SOCKET_UPDATE:
    case SOCKET_UNSUBSCRIBE:
      return Object.assign({}, state, {
        [action.uri]: sub(state[action.uri], action)
      })

    default:
      return state
  }
}
