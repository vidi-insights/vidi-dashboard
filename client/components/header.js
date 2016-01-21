'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  // We are only going to render the markup in profile if
  // isAuthenticated is true, if not we will assign null
  // to the value, React treats nulls as nothing to render.

  // This is different that swapping classes, We usually do this if
  // we are going to hide the markup via a style, if it's not needed
  // on screen its better to just not render it.

  render () {
    let profile = (
      <div className="col-xs-4 col-sm-6 txt-right">
        <ul className="list-unstyled list-inline">
          <li>
            <Link to={'/profile'} className="has-icon has-icon-profile">
              <span className="icon icon-profile"></span>
              <span>Profile</span>
              </Link>
          </li>
          <li>
            <Link to={'/logout'} className="has-icon has-icon-signout">
              <span className="icon icon-signout"></span>
              <span>Sign out</span>
            </Link>
          </li>
        </ul>
      </div>
    )

    if (!this.props.isAuthenticated) {
      profile = null
    }

    return (
      <header className="header" role="banner">
        <div className="container-fluid">
          <div className="row middle-xs">
            <div className="has-icon col-xs-8 col-sm-6">
              <Link to={'/'} className='logo logo-vidi'></Link>
              <h2 className="m0">Vidi: Dashboard</h2>
            </div>

            {profile}
          </div>
        </div>
      </header>
    )
  }
})
