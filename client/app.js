'use strict'

import './index.html'
import './assets/css/main.styl'

import ReactDom from 'react-dom'

import createRootComponent from './lib/createRootComponent'

const root = createRootComponent()
const hook = document.getElementById('app')

ReactDom.render(root, hook)
