'use strict'

var React = require('react')
var LineChart = require('./linechart')
var AreaChart = require('./areachart')
var TabularChart = require('./tabularChart')
var BoxHeader = require('./boxHeader')
var Moment = require('moment')
var Toolbox = require('./toolbox')
var D3 = require('d3')
var _ = require('lodash')

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

module.exports = React.createClass({
  makePinOverviewSection: function (data) {
    var flowRateCombined = data['flow_rate_combined']
    var flowRatePerPin = data['flow_rate_per_pin'] || []
    var breakdown = data['flow_rate_breakdown_pin']

    var groupedData = flowRatePerPin.concat([flowRateCombined])
    if (_.isEmpty(groupedData)) {
      return null
    }

    var overviewChart = (
      <div className='eight columns'>
        <LineChart
          data={groupedData}
          tooltipHtml={tooltipHtml}
          xAxis={{innerTickSize: 10, tickFormat: formatTimeAxis, label: 'time' }}
          yAxis={{label: 'msgs/sec'}}
        />
      </div>
    )

    var breakdownChart = (
      <div className='four columns'>
        <TabularChart data={breakdown} />
      </div>
    )

    return (
      <div key={'combined_flow_rate'} className="row">
        {overviewChart}
        {breakdownChart}
      </div>
    )
  },

  makePerPinSection: function (data) {
    var perMsgType = null

    data = data['flow_rate_per_pin']

    if (data) {
      var perMsgType = []
      data.forEach(function (measurement) {
        var totalVolume = (
          <div key={measurement.label} className={'twelve columns'}>
            <BoxHeader icon={'fa fa-line-chart'} title={(measurement.label.replace('_', ', '))} />
            <LineChart
              data={measurement}
              tooltipHtml={tooltipHtml}
              xAxis={{innerTickSize: 5, tickFormat: formatTimeAxis, label: 'time' }}
              yAxis={{label: 'msgs/sec'}}
            />
          </div>
        )

        var row = (
          <div key={measurement.label} className="row">
            {totalVolume}
          </div>
        )

        perMsgType.push(row)
      })
    }

    return perMsgType
  },

  makeRatioSection: function (data) {
    var perMsgType = null

    data = data['ratio_per_pin']

    if (data) {
      var perMsgType = []
      data.forEach(function (measurement) {
        var totalVolume = (
          <div key={measurement.label} className={'twelve columns'}>
            <BoxHeader icon={'fa fa-line-chart'} title={(measurement.label.replace(/_/g, ', '))} />
            <LineChart
              data={measurement}
              tooltipHtml={tooltipHtmlRatio}
              xAxis={{innerTickSize: 5, tickFormat: formatTimeAxis, label: 'time' }}
              yAxis={{label: 'ratio'}}
            />
          </div>
        )

        var row = (
          <div key={measurement.label} className="row">
            {totalVolume}
          </div>
        )

        perMsgType.push(row)
      })
    }

    return perMsgType
  },

  makeTagOverviewSection: function (data) {
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
        <div className="row">
          {flowrateChart}
          {breakdownChart}
        </div>
      )
    }

    return overview
  },

  makePerTagSection: function (data) {
    var perServiceCharts = null

    var perService = data['flow_rate_per_service']
    var perTagAndPid = data['flow_rate_per_tag_and_pid']
    var perTagAndPidMemStats = data['mem_usage_per_tag_and_pid']

    if (data) {
      var perServiceCharts = []
      perService.forEach(function (service) {

        var flowrateChart = (
          <div key={service.label} className="row">
            <div className='twelve columns'>
              <BoxHeader icon={'fa fa-line-chart'} title={'Service: ' + service.label} />
              <LineChart
                data={service}
                tooltipHtml={tooltipHtml}
                xAxis={{label: 'time', tickFormat: formatTimeAxis}}
                yAxis={{label: 'msgs/sec'}}
              />
            </div>
          </div>
        )

        var pidRows = []
        _.each(perTagAndPid, function (tagAndPid) {
          if(_.startsWith(tagAndPid.label, service.label)) {
            var pidChart = (
              <div className="six columns">
                <BoxHeader icon={'fa fa-line-chart'} title={tagAndPid.label} />
                <LineChart
                  data={tagAndPid}
                  tooltipHtml={tooltipHtml}
                  xAxis={{label: 'time', tickFormat: formatTimeAxis}}
                  yAxis={{label: 'msgs/sec'}}
                />
              </div>
            )

            _.each(perTagAndPidMemStats, function (set) {
              if (_.startsWith(set.label, tagAndPid.label)) {
                var memChart = (
                  <div className="six columns">
                    <BoxHeader icon={'fa fa-line-chart'} title={'Memory usage'} />
                    <AreaChart
                      data={set.data}
                      tooltipHtml={areaTootip}
                      xAxis={{label: 'time', tickFormat: formatTimeAxis}}
                      yAxis={{label: 'Mb'}}
                    />
                  </div>
                )

                var row = (
                  <div className='row'>
                    {pidChart}
                    {memChart}
                  </div>
                )

                pidRows.push(row)
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

  render: function () {
    var data = this.props.data || {}
    var report = (
      <div className="report">
      </div>
    )

    if (!_.isEmpty(data)) {
      var pinsOverviewSection =
      this.makePinOverviewSection(data)
      var perPinSection = this.makePerPinSection(data)
      var tagOverviewSection = this.makeTagOverviewSection(data)
      var perServiceSection = this.makePerTagSection(data)
      var ratioSection = this.makeRatioSection(data)

      report = (
       <div className="report">
        <div className="row foo">
          <h2>Messages</h2>
        </div>
        {pinsOverviewSection}
        {perPinSection}
        {ratioSection}
        <div className="row foo">
          <h2>Services</h2>
        </div>
         {tagOverviewSection}
         {perServiceSection}
       </div>
      )
    }

    return report
  }
})
