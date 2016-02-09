'use strict'

import React from 'react'
import {Link} from 'react-router'
import Menu from './menu'

export default React.createClass({
  render () {
    const {showMenu} = this.props

    return (
      <header className="header" role="banner">
        <div className="container-fluid">
          <div className="row middle-xs">
            <div className="has-icon col-xs-8 col-sm-6">
              <Link to={'/'} className='logo logo-vidi'></Link>
              <h2 className="m0">Vidi: Dashboard</h2>
            </div>

            {(showMenu ? <Menu /> : null)}
          </div>
        </div>
      </header>
    )
  }
})
