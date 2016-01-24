'use strict'

import React from 'react'
import {connect} from 'react-redux'

import Header from '../components/header'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'

import {toggleSidebar} from '../actions/sidebar'

export const Shell = React.createClass({
  handleToggle (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },

  render () {
    const handleToggle = this.handleToggle
    const {children, isLoggedIn, isExpanded} = this.props

    var styleClass = 'page-wrapper'
    if (isExpanded) styleClass = `${styleClass}-expanded`

    return (
      <div className="shell">
        <Header showProfile={isLoggedIn} />

        <div className={styleClass}>
          <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
          {children}
        </div>

        <Footer />
      </div>
    )
  }
})

export default connect((state) => {

  return {
    isLoggedIn: state.auth.isLoggedIn,
    isExpanded: state.sidebar.isExpanded
  }
})(Shell)
