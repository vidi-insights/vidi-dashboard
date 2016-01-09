'use strict'

import {createStore, applyMiddleware} from 'redux'

import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

export default function configureStore () {
  return applyMiddleware(
    thunkMiddleware,
    loggerMiddleware()
  )(createStore)
}
