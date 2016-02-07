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
          <div key={process.pid} className="container-fluid">
            {make_process_sections(process, event_loop)}
          </div>
        )
      }
    })

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h1 className="col-xs-12 col-sm-6">Processes</h1>
          <div className="col-xs-12 col-sm-6 txt-right">
            <select>
              <option>120 seconds</option>
              <option>5 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>
        {sections}
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
      <div className="row middle-xs">
        <h2 className="col-xs-12"><b>{now.pid + '-' + now.title}</b></h2>
      </div>
      <div className="row middle-xs">
        <h5 className="col-xs-3">Process uptime</h5><h1 className="col-xs-3">{now.proc_uptime}</h1>
        <h5 className="col-xs-3">System uptime</h5><h1 className="col-xs-3">{now.sys_uptime}</h1>
      </div>
      <div className="row middle-xs">
        <h5 className="col-xs-3"><b>Pid</b></h5>
        <h5 className="col-xs-3"><b>Title</b></h5>
        <h5 className="col-xs-3"><b>Architecture</b></h5>
        <h5 className="col-xs-3"><b>Platform</b></h5>
        <p  className="col-xs-3">{now.pid}</p>
        <p  className="col-xs-3">{now.title}</p>
        <p  className="col-xs-3">{now.arch}</p>
        <p  className="col-xs-3">{now.platform}</p>
      </div>
      <div className="row middle-xs">
        <h5 className="col-xs-12">Memory Usage</h5>
        <div className="col-xs-12">
          <ChartistGraph
            type={'Line'}
            data={{labels: data.series.time, series: [data.series.heap_total, data.series.heap_rss, data.series.heap_used]}}
            options={{
              fullWidth: true,
              showArea: true,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisX: {showGrid: false, labelOffset: {x: -15}, labelInterpolationFnc: (val) => {
                if (_.last(val) == '0') return val
                else return null
              }},
            }}/>
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
      <div className="row middle-xs">
        <h3 className="col-xs-12">Event Loop</h3>
      </div>
      <div className="row middle-xs">
        <h5 className="col-xs-1">Delay</h5>
        <h1 className="col-xs-4">{event_loop.latest.delay}</h1>
        <h5 className="col-xs-1">Limit</h5>
        <h1 className="col-xs-2">{event_loop.latest.limit}</h1>
        <h5 className="col-xs-2">Over Limit</h5>
        <h1 className="col-xs-2">{event_loop.latest.over_limit}</h1>
      </div>
      <div className="row middle-xs">
        <div className="col-xs-12">
          <ChartistGraph
            type={'Line'}
            data={{labels: event_loop.series.time, series: [event_loop.series.delay, event_loop.series.limit]}}
            options={{
              fullWidth: true,
              showArea: false,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisX: {showGrid: false, labelOffset: {x: -15}, labelInterpolationFnc: function (val) {
                if (_.last(val) == '0') return val
                else return null
              }},
              axisY: {showGrid: false}
          }}/>
        </div>
      </div>
    </div>
  )
}
