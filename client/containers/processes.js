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
          <div className="single-process process-collapsed">
            <div>
              <div className="row middle-xs mb">
                <h1 className="col-xs-7 mt0 mb0 txt-truncate">4832-node</h1>
                <div className="col-xs-5 txt-right">
                  <button className="btn btn-small">Expand</button>
                </div>
              </div>
              <div className="row middle-xs stats-row no-gutter">
                
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
                  <h1 className="txt-truncate m0">453</h1>
                  <p className="label-dimmed m0">Process uptime</p>
                </div>
                
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
                  <h1 className="txt-truncate m0">459040</h1>
                  <p className="label-dimmed m0">System uptime</p>
                </div>
                
              </div>
            </div>
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
})(Processes)

function make_process_sections (data, event_loop) {
  var section = []
  var now = data.latest

  section.push(
    <div key={(now.pid + 'process')}>
      <div className="row middle-xs">
        <h1 className="col-xs-7 mt0 txt-truncate">{now.pid + '-' + now.title}</h1>
        <div className="col-xs-5 txt-right">
          <button className="btn btn-small">Collapse</button>
        </div>
      </div>
      <div className="row middle-xs stats-row no-gutter">
        
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{Math.floor(now.proc_uptime)}</h1>
          <p className="label-dimmed m0">Process uptime</p>
        </div>
        
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 stats-container stats-floated cf">
          <h1 className="txt-truncate m0">{now.sys_uptime}</h1>
          <p className="label-dimmed m0">System uptime</p>
        </div>
        
      </div>
      
      <div className="row middle-xs stats-row no-gutter">
        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.pid}</h2>
          <p className="label-dimmed m0">Pid</p>
        </div>
        
        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.title}</h2>
          <p className="label-dimmed m0">Title</p>
        </div>
        
        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.arch}</h2>
          <p className="label-dimmed m0">Architecture</p>
        </div>
        
        <div className="col-xs-6 col-sm-3 col-md-3 stats-container cf">
          <h2 className="txt-truncate m0">{now.platform}</h2>
          <p className="label-dimmed m0">Platform</p>
        </div>
    
      </div>
      
      <div className="row no-gutter middle-xs">
        <h2 className="col-xs-12">Memory Usage</h2>
        <div className="col-xs-12 mtb">
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
        <h2 className="col-xs-12">Event Loop</h2>
      </div>
      <div className="row middle-xs stats-row no-gutter no-border">
        
        <div className="col-xs-6 col-sm-4 col-md-4 stats-container cf">
          <h2 className="txt-truncate m0">{(Math.round(event_loop.latest.delay * 100) / 100)}</h2>
          <p className="label-dimmed m0">Delay</p>
        </div>
        
        <div className="col-xs-6 col-sm-4 col-md-4 stats-container cf">
          <h2 className="txt-truncate m0">{event_loop.latest.limit}</h2>
          <p className="label-dimmed m0">Limit</p>
        </div>
        
        <div className="col-xs-6 col-sm-4 col-md-4 stats-container cf">
          <h2 className="txt-truncate m0 label-met">{event_loop.latest.over_limit}</h2>
          <p className="label-dimmed m0">Over Limit</p>
        </div>
      </div>
      
      <div className="row middle-xs">
        <div className="col-xs-12 mtbx">
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
