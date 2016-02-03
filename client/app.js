'use strict'

import './index.html'
import './assets/css/main.styl'

import ReactDom from 'react-dom'

import createRootComponent from './bootstrap/createRootComponent'
import store from './bootstrap/store'

const root = createRootComponent(store)
const hook = document.getElementById('app')

ReactDom.render(root, hook)
