'use strict'

import React from 'react'
import {Link} from 'react-router'
import {Menu} from './index'

export default React.createClass({
  render () {
    const {count} = this.props

    return (
      <ul className="list-unstyled list-inline cf">
        <li><span className="status status-small status-healthy"></span>{count}</li>
        <li><span className="status status-small status-stress"></span>0</li>
        <li><span className="status status-small status-terminal"></span>0</li>
        <li><span className="status status-small status-dead"></span>0</li>
      </ul>
    )
  }
})
