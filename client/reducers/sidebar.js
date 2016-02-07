'use strict'

import {TOGGLE_SIDEBAR} from '../actions/sidebar'

const sidebarState = {
  isExpanded: false
}

export default function sidebar (state = sidebarState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isExpanded: !state.isExpanded
      })
    default:
      return state
  }
}
