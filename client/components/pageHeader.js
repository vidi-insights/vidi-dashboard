'use strict'

import React from 'react'
import {Link} from 'react-router'
import Menu from './menu'

export default React.createClass({
  render () {
    const {title, titleLink} = this.props

    const titleTag = titleLink
      ? <Link to={titleLink}>{title}</Link>
      : title

    return (
      <div className="row middle-xs page-heading">
        <h2 className="col-xs-12 col-sm-8">{titleTag}</h2>
        <div className="col-xs-12 col-sm-4 txt-right">
          <select>
            <option>120 seconds</option>
          </select>
        </div>
      </div>
    )
  }
})
