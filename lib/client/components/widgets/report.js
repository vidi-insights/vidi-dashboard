'use strict'

var React = require('react')
var LineChart = require('../charts/linechart')
var BoxHeader = require('./boxHeader')
var Varo = require('../../plugins').Varo
var Moment = require('moment')

function formatX (x) {
  return Moment(x).format('mm:ss')
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      width: 1000,
      data: null
    }
  },

  componentDidMount: function() {
    var that = this

    Varo.act({role: 'metrics', cmd: 'sub', source: 'msgstats', metric: 'rolling_flow_rate'})
    Varo.observe({role: 'metrics', source: 'msgstats', metric: 'rolling_flow_rate'},
      function (msg) {
        that.setState({data: msg.data})
      })
  },

  render: function () {
    var width = this.state.width
    var data = this.state.data

    if (data) {
      function createChart (label, data) {
        return (
          <div key={label} className="row">
            <BoxHeader icon={'fa fa-line-chart'} title={label} />
            <LineChart
              data={data}
              xAxis={{innerTickSize: 2, tickFormat: formatX, label: 'time' }}
              yAxis={{label: 'msgs'}}
            />
          </div>
        )
      }

      var charts = [createChart('overview', data)]
      data.forEach(function (measurement) {
        charts.push(createChart(measurement.label, measurement))
      })
    }

    return (
      <div className="report">
        {charts}
      </div>
    )
  }
})
