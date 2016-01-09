'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../components/sidebar'
import Dashboard from '../components/dashboard'
import {toggleSidebar} from '../actions/sidebar'
import {socketSubscribe, socketUnsubscribe} from '../actions/socket'

export const Home = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  componentDidMount () {
    this.props.dispatch(socketSubscribe('msgstats', 'rolling_flow_rate'))
  },

  componentWillUnmount () {
    this.props.dispatch(socketUnsubscribe('msgstats', 'rolling_flow_rate'))
  },

  handleToggle (event) {
    event.preventDefault()

    this.props.dispatch(toggleSidebar())
  },

  render () {
    const {isExpanded, data} = this.props
    const handleToggle = this.handleToggle

    console.log(data)

    return (
      <div className="presenter">
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        <Dashboard isExpanded={!isExpanded} data={data} />
      </div>
    )
  }
})

function mapStatesToProps (state) {
  const {sidebar} = state
  const metric = state.socket['/metrics/msgstats/rolling_flow_rate'] || {data: {}}

  return {
    isExpanded: sidebar.isExpanded,
    data: metric.data
  }
}

export default connect(mapStatesToProps)(Home)
