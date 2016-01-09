'use strict'

import './index.html'
import './assets/css/styles.css'
import './assets/css/font-awesome.css'

import ReactDom from 'react-dom'

import createRootReducer from './bootstrap/createRootReducer'
import configureStore from './bootstrap/configureStore'
import createRootComponent from './bootstrap/createRootComponent'

const rootReducer = createRootReducer()
const createStore = configureStore()

const initalState = {
  auth: {
    hasError: false,
    token: window.localStorage.getItem('token')
  }
}

const store = createStore(rootReducer, initalState)
const root = createRootComponent(store)
const hook = document.getElementById('app')

ReactDom.render(root, hook)
