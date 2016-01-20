'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    const isExpanded = this.props.isExpanded
    const onToggle = this.props.onToggle
    let styleClass = 'sidebar'

    if (!isExpanded) {
      styleClass = styleClass + '-docked'
    }

    return (
      <aside className={styleClass}>
        <ul className='sidebar-root'>
          <li>
            Menu
            <ul className='sidebar-level-1'>
              <Link to={'/'}>Overview</Link>
              <Link to={'/byservice'}>By Service</Link>
              <Link to={'/bymessage'}>By Message</Link>
            </ul>
          </li>
        </ul>
      </aside>
    )
  }
})
