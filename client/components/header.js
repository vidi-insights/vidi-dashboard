'use strict'

import React from 'react'
import {Link} from 'react-router'
import {Menu} from './index'

export default React.createClass({
  render () {
    const {showMenu} = this.props

    return (
      <header className="header" role="banner">
        <div className="container-fluid">
          <div className="row middle-xs">
            {(showMenu ? <Menu /> : null)}

            <div className="col-xs-12">
              <Link to={'/'} className='logo logo-vidi'><h2 className="m0">Vidi: Dashboard</h2></Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
