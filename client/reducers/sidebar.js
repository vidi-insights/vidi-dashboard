'use strict'

import {
  TOGGLE_SIDEBAR
} from '../actions/sidebar'

const sidebareState = {
  isExpanded: true,
}

export default function sidebar (state = sidebareState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isExpanded: !state.isExpanded
      })
    default:
      return state
  }
}
