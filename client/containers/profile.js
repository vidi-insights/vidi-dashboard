'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from '../actions/sidebar'
import Sidebar from '../components/sidebar'

export const Profile = React.createClass({
  handleToggle (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },

  render () {
    const handleToggle = this.handleToggle
    const {isExpanded} = this.props

    let styleClass = 'page-wrapper'
    if (isExpanded) {
      styleClass = `${styleClass}-expanded`
    }

    return (
      <div className={styleClass}>
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className="page container-fluid">
          <div className="row middle-xs">
            <h2 className="col-xs-12 col-sm-6">Profile</h2>
          </div>
          <div className="alert alert-info alert-has-icon">
            <span className="icon icon-refresh-blue"></span>
            <p className="m0">Loading data...</p>
          </div>
        </div>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    isExpanded: state.sidebar.isExpanded
  }
})(Profile)
