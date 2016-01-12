'use strict'

import * as sidebarActions from '../constants/sidebar'

const sidebarState = {
  isExpanded: true
}

export default function sidebar (state = sidebarState, action) {
  switch (action.type) {
    case sidebarActions.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        isExpanded: !state.isExpanded
      })
    default:
      return state
  }
}
