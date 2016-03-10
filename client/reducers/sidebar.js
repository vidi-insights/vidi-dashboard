'use strict'

import  * from {Sidebar} as sidebarActions from '../constants/index'

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
