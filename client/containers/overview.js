'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'
import ChartistGraph from 'react-chartist'
import {subscribe, unsubscribe} from '../actions/vidi'
import _ from 'lodash'

export const Overview = React.createClass({
  componentDidMount () {
    this.props.dispatch(subscribe('toolbag', 'process'))
    this.props.dispatch(subscribe('toolbag', 'event_loop'))
  },

  componentWillUnmount () {
    this.props.dispatch(unsubscribe('toolbag', 'process'))
    this.props.dispatch(unsubscribe('toolbag', 'event_loop'))
  },

  render () {
    var sections = []
    var data = _.orderBy(this.props.process_stats, ['pid'], ['desc'])
    var count = data.length

    _.each(data, (process) => {
      if (process) {
        var event_loop = _.find(this.props.event_loop_stats, ['pid', process.pid])
        sections.push(make_process_sections(process, event_loop))
      }
    })

    return (
      <div className="page page-processes">
        <div className="container-fluid">
          {make_header()}
          {make_search()}
        </div>

        <div className="container-fluid">
          <div className="process-group panel">
            <div className="panel-heading cf">
              <h3 className="m0 fl-left">Processes tagged with <strong>tag name</strong></h3>
              <a href="" className="fl-right icon icon-collapse"></a>
            </div>

            <div className="panel-body">
              <ul className="list-unstyled list-inline cf">
                <li><strong>Total:</strong> {count}</li>
                <li><span className="status status-small status-healthy"></span><strong>Healthy:</strong> {count}</li>
                <li><span className="status status-small status-stress"></span><strong>Stressed:</strong> 0</li>
                <li><span className="status status-small status-terminal"></span><strong>Terminal:</strong> 0</li>
                <li><span className="status status-small status-dead"></span><strong>Dead:</strong> 0</li>
              </ul>

              {sections}
            </div>
          </div>
        </div>
      </div>
   )
  }
})

export default connect((state) => {
  var vidi = state.vidi
  var process = vidi.toolbag_process || {data: [null]}
  var event_loop = vidi.toolbag_event_loop || {data: [null]}

  return {
    process_stats: process.data,
    event_loop_stats: event_loop.data
  }
})(Overview)

function make_header () {
  return (
    <div className="row middle-xs page-heading">
      <h2 className="col-xs-12 col-sm-8">Overview</h2>
      <div className="col-xs-12 col-sm-4 txt-right">
        <select>
          <option>120 seconds</option>
          <option>5 minutes</option>
          <option>30 minutes</option>
          <option>1 hour</option>
        </select>
      </div>
    </div>
  )
}

function make_search () {
  return (
    <div className="row middle-xs search-wrapper">
      <div className="col-xs-12 col-sm-8 col-md-8 search-input-wrapper">
        <input type="search" className="input-large" placeholder="Find a process"/>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 txt-left search-btn-wrapper">
        <button className="btn btn-large btn-search">Search</button>
      </div>
    </div>
  )
}

function make_process_sections (data, event_loop) {
  var section = []
  var now = data.latest

  var delay  = (Math.round(event_loop.latest.delay * 100) / 100)

  return (
    <div key={now.pid} className="process-card">
      <div className="process-heading has-icon">
        <span className="status status-healthy status-small" title="Status: healthy"></span> {now.pid}
      </div>

      <div className="process-stats-row cf row no-gutter">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 process-stats-container process-stats-floated">
          <ul className="list-unstyled list-inline cf">
            <li><h4 className="m0">Process uptime:</h4></li>
            <li>{now.proc_uptime}</li>
          </ul>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 process-stats-container process-stats-floated">
          <ul className="list-unstyled list-inline cf">
            <li><h4 className="m0">System uptime:</h4></li>
            <li>{now.sys_uptime}</li>
          </ul>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 process-stats-container process-stats-floated">
          <ul className="list-unstyled list-inline cf">
            <li><h4 className="m0">Heap usage:</h4></li>
            <li>{`${now.heap_used} out of ${now.heap_total} (${now.heap_rss} RSS)`}</li>
          </ul>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 process-stats-container process-stats-floated">
          <ul className="list-unstyled list-inline cf">
            <li><h4 className="m0">Event loop:</h4></li>
            <li>{`${delay}s delay (${event_loop.latest.limit}s limit)`}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
