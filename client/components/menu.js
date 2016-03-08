'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    return (
      <div className="nav-main-wrapper">
        <input type="checkbox" name="nav-menu-handle" id="nav-menu-handle" className="nav-menu-handle" />
        <label htmlFor="nav-menu-handle"></label>

        <nav role="navigation" className="nav-main">
          <ul className="list-unstyled list-inline">
            <li className="nav-item">
              <Link to={'/'}>Processes</Link>
            </li>

            <li className="nav-item">
              <Link to={'/messages'}>Messages</Link>
            </li>

            <li className="nav-item">
              <Link to={'/sensors'}>Sensors</Link>
            </li>

            <li className="nav-item">
              <Link to={'/profile'}>Profile</Link>
            </li>

            <li className="nav-item">
              <Link to={'/logout'}>Sign out</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
})
