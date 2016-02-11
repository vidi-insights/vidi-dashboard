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

    _.each(data, (process) => {
      if (process) {
        var event_loop = _.find(this.props.event_loop_stats, ['pid', process.pid])
        sections.push(
          <div key={process.pid} className="process-card">
            {make_process_sections(process, event_loop)}
          </div>
        )
      }
    })

    return (
      <div className="page page-processes">
        <div className="container-fluid">
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
          
          <div className="row middle-xs search-wrapper">
            <div className="col-xs-12 col-sm-8 col-md-8 search-input-wrapper">
              <input type="search" className="input-large" placeholder="Find a process"/>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 txt-left search-btn-wrapper">
              <button className="btn btn-large btn-search">Search</button>
            </div>
          </div>
          
        </div>
        <div className="container-fluid">
          <div className="processes-table">
            <table>
              <thead>
                <tr>
                  <th>Pid</th>
                  <th>Tag</th>
                  <th>Host</th>
                  <th>Heap Usage</th>
                  <th>Event Loop</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="status status-healthy" title="Status: healthy"></span> 65296</td>
                  <td>taggoeshere</td>
                  <td>192.0.0.2</td>
                  <td><strong>73mb</strong> out of <strong>106mb</strong> (103mb RSS)</td>
                  <td><strong>4.23s delay</strong> (30s limit)</td>
                </tr>
                <tr>
                  <td><span className="status status-stress" title="Status: healthy"></span> 65296</td>
                  <td>taggoeshere</td>
                  <td>192.0.0.2</td>
                  <td><strong>73mb</strong> out of <strong>106mb</strong> (103mb RSS)</td>
                  <td><strong>4.23s delay</strong> (30s limit)</td>
                </tr>
                <tr>
                  <td><span className="status status-terminal" title="Status: healthy"></span> 65296</td>
                  <td>taggoeshere</td>
                  <td>192.0.0.2</td>
                  <td><strong>73mb</strong> out of <strong>106mb</strong> (103mb RSS)</td>
                  <td><strong>4.23s delay</strong> (30s limit)</td>
                </tr>
                <tr className="process-status-dead">
                  <td><span className="status status-dead" title="Status: healthy"></span> 65296</td>
                  <td>taggoeshere</td>
                  <td>192.0.0.2</td>
                  <td><strong>73mb</strong> out of <strong>106mb</strong> (103mb RSS)</td>
                  <td><strong>4.23s delay</strong> (30s limit)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {sections}
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

function make_process_sections (data, event_loop) {
  var section = []
  var now = data.latest

  section.push(
    <div key={(now.pid + 'process')}>
      <div className="process-heading">
        <h1 className="mt0 mb0 txt-truncate"><span className="process-status status-running"></span> <b>{now.pid}</b></h1>
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 process-stats-container process-stats-floated cf">
          <h2 className="txt-truncate m0">{now.proc_uptime}</h2>
          <p className="label-dimmed m0">Process uptime</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 process-stats-container process-stats-floated cf">
          <h2 className="txt-truncate m0">{now.sys_uptime}</h2>
          <p className="label-dimmed m0">System uptime</p>
        </div>
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_node}</h2>
          <p className="label-dimmed m0">Node</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_v8}</h2>
          <p className="label-dimmed m0">V8</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_uv}</h2>
          <p className="label-dimmed m0">LibUV</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_openssl}</h2>
          <p className="label-dimmed m0">OpenSSL</p>
        </div>
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
          <h3 className="col-xs-12 mb0 mt0 process-heading">Heap Usage</h3>
        
          <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
            <h2 className="txt-truncate m0">{now.heap_total + ' mb'}</h2>
            <p className="label-dimmed m0">Total</p>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
            <h2 className="txt-truncate m0">{now.heap_used  + ' mb'}</h2>
            <p className="label-dimmed m0">Used</p>
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
            <h2 className="txt-truncate m0">{now.heap_rss  + ' mb'}</h2>
            <p className="label-dimmed m0">Rss</p>
          </div>
      </div>
    </div>
  )

  if (event_loop) section.push(make_event_loop_section(event_loop))

  return section
}

function make_event_loop_section (event_loop) {
  return (
    <div key={(event_loop.latest.pid + 'event_loop')}>
      <div className="row middle-xs process-stats-row no-gutter">
        
        <h3 className="col-xs-12 mt0 mb0 process-heading">Event Loop</h3>
        
        <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
          <h2 className="txt-truncate m0">{(Math.round(event_loop.latest.delay * 100) / 100)}</h2>
          <p className="label-dimmed m0">Delay</p>
        </div>

        <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
          <h2 className="txt-truncate m0">{event_loop.latest.limit}</h2>
          <p className="label-dimmed m0">Limit</p>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-4 process-stats-container process-stats-floated cf">
          <h2 className="txt-truncate m0 label-running">{event_loop.latest.over_limit}</h2>
          <p className="label-dimmed m0">Over Limit</p>
        </div>
      </div>
    </div>
  )
}
