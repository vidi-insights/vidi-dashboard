'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import Footer from '../components/footer'

export const Shell = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
  },

  render () {
    const {children, isAuthenticated} = this.props

    return (
      <div className="shell">
        <Header showProfile={isAuthenticated} />
          {children}
        <Footer />
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {auth} = state

  return {
    isAuthenticated: Boolean(auth.token)
  }
}

export default connect(mapStatesToProps)(Shell)
