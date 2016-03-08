'use strict'

import {
  VIDI_SUBSCRIBE,
  VIDI_UPDATE,
  VIDI_UNSUBSCRIBE
} from '../actions/vidi'

const subState = {
  isSubscribing: true,
  isSubscribed: false,
  data: {}
}

function sub (state = subState, action) {
  switch (action.type) {
    case VIDI_SUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: true,
        isSubscribed: false
      })

    case VIDI_UPDATE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: true,
        data: action.data
      })

    case VIDI_UNSUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: false,
        data: {}
      })

    default:
      return state
  }
}

export default function vidi (state = {}, action) {
  switch (action.type) {
    case VIDI_SUBSCRIBE:
    case VIDI_UPDATE:
    case VIDI_UNSUBSCRIBE:
      return Object.assign({}, state, {
        [action.view]: sub(state[action.view], action)
      })

    default:
      return state
  }
}
