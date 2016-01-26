'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {socketSubscribe, socketUnsubscribe} from '../actions/socket'

import LineChart from '../components/line-chart'
import AreaChart from '../components/area-chart'
import TabularChart from '../components/tabular-chart'
import Panel from '../components/panel'
import Moment from 'moment'
import D3 from 'd3'
import _ from 'lodash'

export const Overview = React.createClass({
  componentDidMount () {
    this.props.dispatch(socketSubscribe('msgstats', 'rolling_flow_rate'))
  },

  componentWillUnmount () {
    this.props.dispatch(socketUnsubscribe('msgstats', 'rolling_flow_rate'))
  },

  makePinOverviewSection (data) {
    var flowRateCombined = data['flow_rate_combined']
    var flowRatePerPin = data['flow_rate_per_pin'] || []
    var breakdown = data['flow_rate_breakdown_pin']

    var groupedData = flowRatePerPin.concat([flowRateCombined])
    if (_.isEmpty(groupedData)) {
      return null
    }

    var overviewChart = (
      <Panel>
        <LineChart
          data={groupedData}
          height={200}
          tooltipHtml={tooltipHtml}
          xAxis={{innerTickSize: 10, tickFormat: formatTimeAxis, label: 'time' }}
          yAxis={{label: 'msgs/sec'}}
        />
      </Panel>
    )

    var breakdownChart = (
      <Panel>
        <TabularChart data={breakdown} />
      </Panel>
    )

    return (
      <Panel key={'combined_flow_rate'} title={'Combined'}>
        {overviewChart}
        {breakdownChart}
      </Panel>
    )
  },

  makePerPinSection (data) {
    var perMsgType = null

    data = data['flow_rate_per_pin']

    if (data) {
      var perMsgType = []
      data.forEach(function (measurement) {
        var totalVolume = (
          <Panel title={(measurement.label.replace('_', ', '))}>
            <LineChart
              data={measurement}
              height={200}
              tooltipHtml={tooltipHtml}
              xAxis={{innerTickSize: 5, tickFormat: formatTimeAxis, label: 'time' }}
              yAxis={{label: 'msgs/sec'}}
            />
          </Panel>
        )

        perMsgType.push(totalVolume)
      })
    }

    return perMsgType
  },

  makeRatioSection (data) {
    var perMsgType = null

    data = data['ratio_per_pin']

    if (data) {
      var perMsgType = []
      data.forEach(function (measurement) {
        var totalVolume = (
            <Panel title={(measurement.label.replace(/_/g, ', '))}>
              <LineChart
                data={measurement}
                height={200}
                tooltipHtml={tooltipHtmlRatio}
                xAxis={{innerTickSize: 5, tickFormat: formatTimeAxis, label: 'time' }}
                yAxis={{label: 'ratio'}}
              />
            </Panel>
        )
        perMsgType.push(totalVolume)
      })
    }

    return perMsgType
  },

  makeTagOverviewSection (data) {
    var overview = null

    var combined = data['flow_rate_combined']
    var perService = data['flow_rate_per_service'] || []
    var grouped = perService.concat([combined])
    var breakdown = data['flow_rate_combined_breakdown']


    if (data) {
      var flowrateChart = (
        <div className='eight columns'>
          <LineChart
            data={grouped}
            height={200}
            tooltipHtml={tooltipHtml}
            xAxis={{label: 'time', tickFormat: formatTimeAxis}}
            yAxis={{label: 'msgs/sec'}}
          />
        </div>
      )

      var breakdownChart = (
        <div className='four columns'>
          <TabularChart data={breakdown} />
        </div>
      )

      overview = (
        <div >
          {flowrateChart}
          {breakdownChart}
        </div>
      )
    }

    return overview
  },

  makePerTagSection (data) {
    var perServiceCharts = null

    var perService = data['flow_rate_per_service']
    var perTagAndPid = data['flow_rate_per_tag_and_pid']
    var perTagAndPidMemStats = data['mem_usage_per_tag_and_pid']

    if (data) {
      var perServiceCharts = []
      perService.forEach(function (service) {

        var flowrateChart = (
          <Panel title={'Service: ' + service.label}>
            <LineChart
              data={service}
              height={200}
              tooltipHtml={tooltipHtml}
              xAxis={{label: 'time', tickFormat: formatTimeAxis}}
              yAxis={{label: 'msgs/sec'}}
            />
          </Panel>
        )

        var pidRows = []
        _.each(perTagAndPid, function (tagAndPid) {
          if(_.startsWith(tagAndPid.label, service.label)) {
            var pidChart = (
                <Panel title={tagAndPid.label}>
                  <LineChart
                    data={tagAndPid}
                    height={200}
                    tooltipHtml={tooltipHtml}
                    xAxis={{label: 'time', tickFormat: formatTimeAxis}}
                    yAxis={{label: 'msgs/sec'}}
                  />
                </Panel>
            )

            _.each(perTagAndPidMemStats, function (set) {
              if (_.startsWith(set.label, tagAndPid.label)) {
                var memChart = (
                  <Panel title={'Memory usage'}>
                    <AreaChart
                      data={set.data}
                      height={200}
                      tooltipHtml={areaTootip}
                      xAxis={{label: 'time', tickFormat: formatTimeAxis}}
                      yAxis={{label: 'Mb'}}
                    />
                  </Panel>
                )

                pidRows.push(pidChart)
                pidRows.push(memChart)
              }
            })
          }
        })

        perServiceCharts.push(flowrateChart)
        _.each(pidRows, function (row) {
          perServiceCharts.push(row)
        })
      })
    }

    return perServiceCharts
  },

  render () {
    var data = this.props.data || {}
    var report = null

    if (!_.isEmpty(data)) {
      var pinsOverviewSection =
      this.makePinOverviewSection(data)
      var perPinSection = this.makePerPinSection(data)
      var tagOverviewSection = this.makeTagOverviewSection(data)
      var perServiceSection = this.makePerTagSection(data)
      var ratioSection = this.makeRatioSection(data)

      report = (
       <div>
        <Panel title={'Messages'}>
          {pinsOverviewSection}
          {perPinSection}
          {ratioSection}
        </Panel>

        <Panel title={'Services'}>
          {tagOverviewSection}
          {perServiceSection}
        </Panel>
       </div>
      )
    }

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Overview</h2>
          <div className="col-xs-12 col-sm-6 txt-right">
            <select>
              <option>120 seconds</option>
              <option>5 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>
        {report}
      </div>
    )
  }
})

export default connect((state) => {
  const metric = state.socket['/metrics/msgstats/rolling_flow_rate'] || {data: {}}

  return {
    data: metric.data
  }
})(Overview)

function formatTimeAxis (x) {
  if (!x) return ''
  return Moment(x).format('hh:mm:ss')
}

function tooltipHtml (label, point) {
  if (!label || !point) return ''
  return label.replace(/_/g, ', ').replace(/-/, ' ') +
         "   -  Time: " +
         Moment(point.x).format('hh:mm:ss') +
         "   msgs/sec: " +
         point.y
}

function tooltipHtmlRatio (label, point) {
  if (!point) return ''

  return "   -  Time: " + Moment(point.x).format('hh:mm:ss') +
         "   Ratio: " + point.y
}

function areaTootip (x, y) {
  if (!x || !y) return ''

  return "   -  Time: " +
         Moment(x).format('hh:mm:ss') +
         "   Mb: " + y
}
