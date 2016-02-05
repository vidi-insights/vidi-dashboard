'use strict'

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export function toggleSidebar () {
  return (dispatch) => {
    dispatch({type: TOGGLE_SIDEBAR})
  }
}
