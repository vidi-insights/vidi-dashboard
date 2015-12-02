'use strict'

var React = require('react')
var LineChart = require('./charts/linechart')
var BarChart = require('./charts/barchart')
var BoxHeader = require('./boxHeader')
var Varo = require('../../plugins').Varo

module.exports = React.createClass({
  getInitialState: function() {
    return {
      width: 1000,
      data: null
    }
  },

  componentDidMount: function() {
    var that = this

    // Tell 'metrics' we want to 'subscribe' to the metric below.
    Varo.act({role: 'metrics', cmd: 'sub', source: 'msgstats', metric: 'rolling_flow_rate'})

    // Wire up a handler to listen for our newly created subscription
    Varo.observe({role: 'metrics', source: 'msgstats', metric: 'rolling_flow_rate'},
      function (msg) {
        that.setState({data: msg.data})
      })

    // some with stuff to make charts pretty
    var width = document.getElementsByClassName('dashboard')[0].offsetWidth
    this.setState({width: width})
  },

  render: function () {
    var width = this.state.width
    var data = this.state.data

    if (data) {
      // Beware! lists of elements in react need an id.
      function createChart (label, data) {
        return (
          <div className="row">
            <BoxHeader icon={'fa fa-line-chart'} title={label} />
            <LineChart data={data} height={200} width={width * 0.98} />
          </div>
        )
      }

      // Our data has been nicely formated so we
      // are just pushing it straight to the chart.
      var charts = []
      data.forEach(function (measurement) {
        charts.push(createChart(measurement.label, measurement))
      })
      charts.push(createChart('overview', data))
    }

    return (
      <div className="report">
        {charts}
      </div>
    )
  }
})
