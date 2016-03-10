'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Panel, PageHeader, InfoCell}  from '../components/index'
import ChartistGraph from 'react-chartist'
import {subscribe, unsubscribe} from '../actions/vidi'
import _ from 'lodash'

export const Overview = React.createClass({
  componentDidMount () {
    this.props.dispatch(subscribe('sensors'))
  },

  componentWillUnmount () {
    this.props.dispatch(unsubscribe('sensors'))
  },

  render () {
    var sections = []
    var groups = _.groupBy(this.props.sensors, 'sensor_type')
    var sortedKeys = _.keys(groups).sort()

    _.each(sortedKeys, (theKey) => {
      var group = groups[theKey]

      if (group) {
        var proc_sections = []
        var data = _.orderBy(group, ['sensor_id'], ['desc'])
        var count = data.length
        var tag = ''
        var key

        _.each(data, (message) => {
          if (message) {
            tag = message.sensor_type
            proc_sections.push(makeMessageSections(message))
          }
        })

        sections.push(
          <div key={tag} className="process-group panel">
            <div className="panel-heading cf">
              <h3 className="m0 fl-left"><strong>{tag}</strong></h3>
              <a href="" className="fl-right icon icon-collapse"></a>
            </div>

            <div className="panel-body">
              {proc_sections}
            </div>
          </div>
        )
      }
    })



    return (
      <div className="page page-processes">
        <div className="container-fluid">
          <PageHeader title={'Sensors'} />
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
  var sensors = vidi.sensors || {data: [null]}

  return {
    sensors: sensors.data
  }
})(Overview)

function makeMessageSections (messages) {
  var section = []
  var now = messages.latest

  return (
    <div key={now.sensor_id} className="process-card">
      <div className="process-heading has-icon">
        <span className="status status-healthy status-small" title="Status: healthy"></span>
        {`${now.topic}/${now.sensor_id}`}
      </div>

      <div className="row middle-xs process-stats-row no-gutter">
        <InfoCell title={'UOM'} value={now.uom} />
        <InfoCell title={'Broker'} value={now.broker_id} />
        <InfoCell title={'Topic'} value={now.topic} />
      </div>

      <div className="row middle-xs no-gutter">
        <div className="col-xs-12 mt">
          <ChartistGraph
            type={'Line'}
            data={{labels: messages.series.time, series: [messages.series.value]}}
            options={{
              fullWidth: true,
              showArea: false,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisY: {onlyInteger: true},
              axisX: {labelOffset: {x: -15}, labelInterpolationFnc: (val) => {
                if (_.last(val) == '0') return val
                else return null
              }},
            }}/>
        </div>
      </div>
    </div>
  )
}
