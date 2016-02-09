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
              <Link to={'/'}>Overview</Link>
            </li>

            <li className="nav-item">
              <Link to={'/processes'}>Processes</Link>
            </li>

            <li className="nav-item">
              <Link to={'/profile'} className="has-icon has-icon-profile">
                <span className="icon icon-profile"></span>
                <span>Profile</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={'/logout'} className="has-icon has-icon-signout">
                <span className="icon icon-signout"></span>
                <span>Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
})
