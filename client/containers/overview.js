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
          <div key={process.pid} className="single-process">
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
        </div>
        <div className="container-fluid">
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
      <div className="row middle-xs">
        <h1 className="col-xs-7 mt0 txt-truncate"><b>{now.pid}</b></h1>
      </div>

      <div className="row middle-xs stats-row no-gutter">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{now.proc_uptime}</h1>
          <p className="label-dimmed m0">Process uptime</p>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{now.sys_uptime}</h1>
          <p className="label-dimmed m0">System uptime</p>
        </div>
      </div>

      <div className="row middle-xs stats-row no-gutter">
        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_node}</h2>
          <p className="label-dimmed m0">Node</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_v8}</h2>
          <p className="label-dimmed m0">V8</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_uv}</h2>
          <p className="label-dimmed m0">LibUV</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.ver_openssl}</h2>
          <p className="label-dimmed m0">OpenSSL</p>
        </div>
      </div>

      <div className="row middle-xs stats-row no-gutter">
          <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
            <h1 className="txt-truncate m0">{now.heap_total + ' mb'}</h1>
            <p className="label-dimmed m0">Heap Total</p>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
            <h1 className="txt-truncate m0">{now.heap_used  + ' mb'}</h1>
            <p className="label-dimmed m0">Heap Used</p>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
            <h1 className="txt-truncate m0">{now.heap_rss  + ' mb'}</h1>
            <p className="label-dimmed m0">Heap Rss</p>
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
      <div className="row middle-xs stats-row no-gutter no-border">
        <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{(Math.round(event_loop.latest.delay * 100) / 100)}</h1>
          <p className="label-dimmed m0">Delay</p>
        </div>

        <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{event_loop.latest.limit}</h1>
          <p className="label-dimmed m0">Limit</p>
        </div>

        <div className="col-xs-6 col-sm-4 col-md-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0 label-met">{event_loop.latest.over_limit}</h1>
          <p className="label-dimmed m0">Over Limit</p>
        </div>
      </div>
    </div>
  )
}
