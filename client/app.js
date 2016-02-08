'use strict'

import './index.html'
import './assets/css/main.styl'

import ReactDom from 'react-dom'

import createRootComponent from './lib/createRootComponent'
import store from './lib/store'

const root = createRootComponent(store)
const hook = document.getElementById('app')

ReactDom.render(root, hook)
