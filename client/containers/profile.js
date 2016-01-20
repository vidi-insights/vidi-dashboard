'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import {toggleSidebar} from '../actions/sidebar'

export const Profile = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },

  componentDidMount () {
  },

  componentWillUnmount () {
  },

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const {isExpanded, data} = this.props
    const handleToggle = this.handleToggle

    var styleClass = 'profile-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className="profile">
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className={styleClass}>
          Overview
        </div>
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state

  return {
    isExpanded: sidebar.isExpanded
  }
}

export default connect(mapStatesToProps)(Profile)
