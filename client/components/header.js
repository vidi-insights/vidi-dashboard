'use strict'

import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render () {
    let profile = (
      <div className="profile-toolbox">
        <ul>
          <li><Link to={'/profile'}>profile</Link></li>
          <li><i className={'fa fa-sign-out'}></i><Link to={'/logout'}>sign out</Link></li>
        </ul>
      </div>
    )

    if (!this.props.showProfile) {
      profile = null
    }

    return (
      <header className="header" role="banner">
        <div className="container-fluid">
          <div className="has-icon">
            <Link to={'/'} className='logo logo-vidi'></Link>
            <h2 className="m0">Vidi: Dashboard</h2>
          </div>
        </div>

        {profile}
      </header>
    )
  }
})
