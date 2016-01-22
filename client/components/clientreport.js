'use strict'

var React = require('react')
var LineChart = require('./linechart')
var Moment = require('moment')
var D3 = require('d3')
var _ = require('lodash')

module.exports = React.createClass({
  render: function () {
    if (!this.props.data) {
      return (
        <div className="alert alert-info alert-has-icon">
          <span className="icon icon-refresh-blue"></span>
          <p className="m0">No data found</p>
        </div>
      )
    }

    var processSection = this.makeProcessSection(this.props.data)

    return (
      <div className="row middle-xs">
        <h2 className="col-xs-12 col-sm-6">CPU Utilization</h2>
        {{processSection}}
    </div>
    )
  },
  makeProcessSection: function (data) {
    console.log(data)
    return [
      (
        <div>
        <LineChart
          data="10"
          tooltipHtml='my tooltop'
          xAxis={{innerTickSize: 5, tickFormat: formatTimeAxis, label: 'time' }}
          yAxis={{label: 'ratio'}}
        />
        </div>
      )
    ]
  }
})


function formatTimeAxis (x) {
  if (!x) return ''
  return Moment(x).format('hh:mm:ss')
}
