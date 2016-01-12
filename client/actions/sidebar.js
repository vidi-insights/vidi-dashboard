'use strict'

import * as sidebarActions from '../constants/sidebar'

export function toggleSidebar () {
  return (dispatch) => {
    dispatch({type: sidebarActions.TOGGLE_SIDEBAR})
  }
}
