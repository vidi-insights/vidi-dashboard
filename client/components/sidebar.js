'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    const isExpanded = this.props.isExpanded
    const onToggle = this.props.onToggle
    let styleClass = 'sidebar'

    // Same as we are doing in each page, we basically generate the correct class to
    // add so that the sidebar appears collapsed. We could also change the markup instead
    // and render two different markups depending on the value of isExpanded.
    if (!isExpanded) {
      styleClass = styleClass + '-docked'
    }

    // On or instead of the <a> if you assign onToggle to the onClick event
    // like below, it will cause redux to invert the toggle, this will effectively
    // change the value of isExpanded and pass the new value down to all components.
    return (
      <aside className={styleClass} role="complementary">
        <a href="" className="icon-menu-container" onClick={onToggle}>
          <span className="icon icon-menu"></span>
        </a>
        <nav role="navigation">
          <ul className="list-unstyled">
            <li><Link to={'/'} className="nav-item">Overview</Link></li>
            <li><Link to={'/byservice'} className="nav-item">By Service</Link></li>
            <li><Link to={'/bymessage'} className="nav-item">By Message</Link></li>
          </ul>
        </nav>
      </aside>
    )
  }
})
