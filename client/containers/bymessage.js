'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import {toggleSidebar} from '../actions/sidebar'

export const ByMessage = React.createClass({
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

    var styleClass = 'bymessage-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className="bymessage">
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

export default connect(mapStatesToProps)(ByMessage)
