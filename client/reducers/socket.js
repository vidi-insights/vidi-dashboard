'use strict'

import * as socketActions from '../constants/socket'

const subState = {
  isSubscribing: true,
  isSubscribed: false,
  data: {}
}

function sub (state = subState, action) {
  switch (action.type) {
    case socketActions.SOCKET_SUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: true,
        isSubscribed: false
      })

    case socketActions.SOCKET_UPDATE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: true,
        data: action.data
      })

    case socketActions.SOCKET_UNSUBSCRIBE:
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
    case socketActions.SOCKET_SUBSCRIBE:
    case socketActions.SOCKET_UPDATE:
    case socketActions.SOCKET_UNSUBSCRIBE:
      return Object.assign({}, state, {
        [action.uri]: sub(state[action.uri], action)
      })

    default:
      return state
  }
}
