'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from '../actions/sidebar'
import Sidebar from '../components/sidebar'

export const ByService = React.createClass({
  handleToggle (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },

  render () {
    const handleToggle = this.handleToggle
    const {isExpanded} = this.props

    var styleClass = 'page-wrapper'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className={styleClass}>
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className="page container-fluid">
          <div className="row middle-xs">
            <h2 className="col-xs-12 col-sm-6">By Service</h2>
            <div className="col-xs-12 col-sm-6 txt-right">
              <select>
                <option>120 seconds</option>
                <option>5 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
        </div>
          <div className="alert alert-info alert-has-icon">
            <span className="icon icon-refresh-blue"></span>
            <p className="m0">Loading data...</p>
          </div>

          <div className="panel">
            <h3 className="panel-heading m0">Panel heading</h3>
            <div className="panel-body"></div>
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
})(ByService)
