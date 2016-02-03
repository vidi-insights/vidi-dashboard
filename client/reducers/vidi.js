'use strict'

import * as vidiActions from '../constants/vidi'

const subState = {
  isSubscribing: true,
  isSubscribed: false,
  data: {}
}

function sub (state = subState, action) {
  switch (action.type) {
    case vidiActions.VIDI_SUBSCRIBE:
      return Object.assign({}, state, {
        isSubscribing: true,
        isSubscribed: false
      })

    case vidiActions.VIDI_UPDATE:
      return Object.assign({}, state, {
        isSubscribing: false,
        isSubscribed: true,
        data: action.data
      })

    case vidiActions.VIDI_UNSUBSCRIBE:
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
    case vidiActions.VIDI_SUBSCRIBE:
    case vidiActions.VIDI_UPDATE:
    case vidiActions.VIDI_UNSUBSCRIBE:
      return Object.assign({}, state, {
        [action.uri]: sub(state[action.uri], action)
      })

    default:
      return state
  }
}
