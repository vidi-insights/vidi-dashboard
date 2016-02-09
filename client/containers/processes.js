'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'
import ChartistGraph from 'react-chartist'
import {subscribe, unsubscribe} from '../actions/vidi'
import _ from 'lodash'

export const Processes = React.createClass({
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
            <h2 className="col-xs-12 col-sm-8">Processes</h2>
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
})(Processes)

function make_process_sections (data, event_loop) {
  var section = []
  var now = data.latest

  section.push(
    <div key={(now.pid + 'process')}>
      <div className="process-heading has-btn cf">
        <h1 className="mt0 mb0 txt-truncate fl-left"><span className="process-status status-running"></span> {now.pid}</h1>
        <button className="btn btn-small fl-right">Collapse</button>
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
          <h2 className="txt-truncate m0">{now.pid}</h2>
          <p className="label-dimmed m0">Pid</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.title}</h2>
          <p className="label-dimmed m0">Title</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.arch}</h2>
          <p className="label-dimmed m0">Architecture</p>
        </div>

        <div className="col-xs-6 col-sm-3 col-md-3 process-stats-container cf">
          <h2 className="txt-truncate m0">{now.platform}</h2>
          <p className="label-dimmed m0">Platform</p>
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

      <div className="row middle-xs no-gutter">
        <h3 className="col-xs-12 mb0 mt0 process-heading">Heap Usage</h3>
      </div>

      <div className="row middle-xs">
        <div className="col-xs-12 mtb">
          <ChartistGraph
            type={'Line'}
            data={{labels: data.series.time, series: [data.series.heap_total, data.series.heap_rss, data.series.heap_used]}}
            options={{
              fullWidth: true,
              showArea: false,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisX: {labelOffset: {x: -15}, labelInterpolationFnc: (val) => {
                if (_.last(val) == '0') return val
                else return null
              }},
            }}/>
        </div>
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
          <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
            <p className="txt-truncate m0">{now.heap_total + ' mb'}</p>
            <p className="label-dimmed m0">Total</p>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
            <p className="txt-truncate m0">{now.heap_used  + ' mb'}</p>
            <p className="label-dimmed m0">Used</p>
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
            <p className="txt-truncate m0">{now.heap_rss  + ' mb'}</p>
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
        <h3 className="col-xs-12 mb0 mt0 process-heading">Event Loop</h3>

        <div className="col-xs-12 mtb">
          <ChartistGraph
            type={'Line'}
            data={{labels: event_loop.series.time, series: [event_loop.series.delay, event_loop.series.limit]}}
            options={{
              fullWidth: true,
              showArea: false,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisX: { labelOffset: {x: -15}, labelInterpolationFnc: function (val) {
                if (_.last(val) == '0') return val
                else return null
              }}
          }}/>
        </div>
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
        <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
          <p className="txt-truncate m0">{(Math.round(event_loop.latest.delay * 100) / 100)}</p>
          <p className="label-dimmed m0">Delay</p>
        </div>

        <div className="col-xs-6 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
          <p className="txt-truncate m0">{event_loop.latest.limit}</p>
          <p className="label-dimmed m0">Limit</p>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-4 process-stats-container process-stats-floated process-stats-compact cf">
          <p className="txt-truncate m0 label-met">{event_loop.latest.over_limit}</p>
          <p className="label-dimmed m0">Over Limit</p>
        </div>
      </div>
    
      <div className="row middle-xs process-stats-row no-gutter">
        <h3 className="col-xs-12 mb0 mt0 process-heading">Execution</h3>
        <div className="col-xs-12 col-sm-6 col-md-6 txt-truncate cf no-padding">
          <h4 className="mb0 txt-truncate m0 process-stats-container process-stats-floated process-stats-compact">Script</h4>
          <ul className="list-unstyled">
            <li className="process-argument">full/path/to/node</li>
            <li className="process-argument">full/path/to/script</li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 txt-truncate cf no-padding">
          <h4 className="mb0 txt-truncate m0 process-stats-container process-stats-floated process-stats-compact">Arguments</h4>
          <ul className="list-unstyled process-arguments">
            <li className="process-argument">-r</li>
            <li className="process-argument">toolbag</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
