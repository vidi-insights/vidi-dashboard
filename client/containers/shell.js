'use strict'

import React from 'react'
import {connect} from 'react-redux'

import {Header, Footer}  from '../components/index'

export const Shell = React.createClass({
  render () {
    const handleToggle = this.handleToggle
    const {children, isLoggedIn} = this.props

    return (
      <div className="shell">
        <Header showMenu={isLoggedIn}/>
        <div className={'page-wrapper'}>{children}</div>
        <Footer />
      </div>
    )
  }
})

export default connect((state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
})(Shell)
