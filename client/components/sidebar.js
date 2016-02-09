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
            <li className="nav-item"><Link to={'/'}>Overview</Link></li>
            <li className="nav-item"><Link to={'/processes'}>Processes</Link></li>
            <li className="nav-item">
              <a href="">Live</a>
              <ul className="list-unstyled">
                <li className="nav-item"><a href="">--foo</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="">Historic</a>
              <ul className="list-unstyled">
                <li className="nav-item"><a href="">--foo</a></li>
              </ul>
            </li>
            <li className="nav-item nav-header">Unlinked Header</li>
          </ul>
        </nav>
      </aside>
    )
  }
})
