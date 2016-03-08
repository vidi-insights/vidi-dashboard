'use strict'

import React from 'react'

export default React.createClass({
  render () {
    const {title, value} = this.props

    return (
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 process-stats-container process-stats-floated">
        <ul className="list-unstyled list-inline cf">
          <li><h4 className="m0">{title}</h4></li>
          <li>{value}</li>
        </ul>
      </div>
    )
  }
})
