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
    // we get these values automagically, we don't care about
    // authentication at the shell level but the Header cares
    // about it because it will use it
    // to decide to show the logout / profile bits or not
    const {children, isAuthenticated} = this.props

    // Here we just pass the value on to the 'isAuthenticated' prop
    return (
      <div className="shell">
        <Header isAuthenticated={isAuthenticated} />
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
