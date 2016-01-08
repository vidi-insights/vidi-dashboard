'use strict'

import {SOCKET_SUBSCRIBE, SOCKET_UPDATE, SOCKET_UNSUBSCRIBE} from '../actions'

const subState = {
  isSubscribing: true
  isSubscribed: false,
  data: null
}

function sub (state = subState, action) {
  switch (action.type) {
    case SOCKET_SUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: true
        isSubscribed: false,
      })

    case SOCKET_UPDATE:
      return Object.assign({}, state, {
        isSubscribing: false
        isSubscribed: action.isSubscribed,
        data: action.isSubscribed ? action.data : null
      })

    case SOCKET_UNSUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: false
        isSubscribed: false,
        data: null
      })

    default:
      return state
  }
}

export default function Socket (state = {}, action) {
  switch (action.type) {
    case SOCKET_SUBSCRIBE:
    case SOCKET_UPDATE:
    case SOCKET_UNSUBSCRIBE:
      return Object.assign({}, state, {
        [action.sub]: handleSub(state[action.sub], action)
      })

    default:
      return state
  }
}
