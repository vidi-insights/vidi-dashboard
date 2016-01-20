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
      <div className="header">
        <div className="logo logo-vidi">
          <Link to={'/'}><img className='logo logo-vidi' /></Link>
        </div>

        <div className="box-header-titlebar">
          Vidi: Dashboard
        </div>

        {profile}
      </div>
    )
  }
})
