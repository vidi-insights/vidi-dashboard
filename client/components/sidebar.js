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
      <aside className={styleClass} role="complementary">
        <nav role="navigation">
          <ul className="list-unstyled">
            <li className="nav-item"><Link to={'/'}>Overview</Link></li>
            <li className="nav-item"><Link to={'/byservice'}>By Service</Link></li>
            <li className="nav-item"><Link to={'/bymessage'}>By Message</Link></li>
          </ul>
        </nav>
      </aside>
    )
  }
})
