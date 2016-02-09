'use strict'

import {combineReducers} from 'redux'
import {routeReducer} from 'redux-simple-router'
import authReducer from '../reducers/auth'
import vidiReducer from '../reducers/vidi'

export default function createRootReducer () {
  return combineReducers({
    routing: routeReducer,
    auth: authReducer,
    vidi: vidiReducer
  })
}
