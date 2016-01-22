'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import ClientReport from '../components/clientreport'
import {toggleSidebar} from '../actions/sidebar'


export const Clients = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },
  handleToggle: function (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },
  render: function () {
    const {isExpanded, data} = this.props
    const handleToggle = this.handleToggle

    var styleClass = 'page-wrapper'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className={styleClass}>
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <div className="page container-fluid">
          <div className="row middle-xs">
            <h2 className="col-xs-12 col-sm-6">Node.js Clients</h2>
          </div>
          <ClientReport data={data}></ClientReport>
        </div>
      </div>
    )
  }
})

var mapStatesToProps = function (state) {
  return {
    isExpanded: state.sidebar.isExpanded
  }
}

export default connect(mapStatesToProps)(Clients)
