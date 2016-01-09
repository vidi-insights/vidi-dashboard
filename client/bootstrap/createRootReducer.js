'use strict'

import {combineReducers} from 'redux'

import {routeReducer} from 'redux-simple-router'
import authReducer from '../reducers/auth'
import sidebarReducer from '../reducers/sidebar'
import socketReducer from '../reducers/socket'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer,
    auth: authReducer,
    socket: socketReducer,
    sidebar: sidebarReducer
  })
}
