'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import {toggleSidebar} from '../actions/sidebar'

export const Overview = React.createClass({
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

    var styleClass = 'overview-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <main className="page page-overview overview" role="main">
        <div className="container-fluid">
          <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
          <div className={styleClass}>
            <h2>Overview</h2>
          </div>
        </div>
      </main>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state

  return {
    isExpanded: sidebar.isExpanded
  }
}

export default connect(mapStatesToProps)(Overview)
