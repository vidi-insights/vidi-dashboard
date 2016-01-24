'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    const {isExpanded, onToggle} = this.props
    let styleClass = 'sidebar'

    if (!isExpanded) {
      styleClass = `${styleClass}-docked`
    }

    return (
      <aside className={styleClass} role="complementary">
        <a href="" className="icon-menu-container" onClick={onToggle}>
          <span className="icon icon-menu"></span>
        </a>
        <nav role="navigation">
          <ul className="list-unstyled">
            <li><Link to={'/'} className="nav-item">Overview</Link></li>
            <li><Link to={'/services'} className="nav-item">Services</Link></li>
            <li><Link to={'/messages'} className="nav-item">Messages</Link></li>
            <li><Link to={'/processes'} className="nav-item">Processes</Link></li>
            <li><Link to={'/clients'} className="nav-item">Clients</Link></li>
          </ul>
        </nav>
      </aside>
    )
  }
})
