'use strict'

import React from 'react'

export default React.createClass({
  render () {
    const {title, children} = this.props

    let heading = null
    if (title) {
      heading = <h3 className="panel-heading m0">{title}</h3>
    }

    return (
      <div className="panel">
        {heading}
        <div className="panel-body">
          {children}
        </div>
      </div>
    )
  }
})
