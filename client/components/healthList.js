'use strict'

import React from 'react'
import {Link} from 'react-router'
import Menu from './menu'

export default React.createClass({
  render () {
    const {count} = this.props
    
    return (
      <ul className="list-unstyled list-inline cf">
        <li><strong>Total:</strong> {count}</li>
        <li><span className="status status-small status-healthy"></span><strong>Healthy:</strong> {count}</li>
        <li><span className="status status-small status-stress"></span><strong>Stressed:</strong> 0</li>
        <li><span className="status status-small status-terminal"></span><strong>Terminal:</strong> 0</li>
        <li><span className="status status-small status-dead"></span><strong>Dead:</strong> 0</li>
      </ul>
    )
  }
})
