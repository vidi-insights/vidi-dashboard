'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'

export const Shell = React.createClass({
  render () {
    const {children, isLoggedIn} = this.props

    return (
      <div className="shell">
        <Header showProfile={isLoggedIn} />
          {children}
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
