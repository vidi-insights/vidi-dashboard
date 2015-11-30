'use strict'

var React = require('react')
var LineChart = require('./charts/linechart')
var BarChart = require('./charts/barchart')
var BoxHeader = require('./boxHeader')
var Varo = require('../../plugins').Varo

var Report = React.createClass({
  getInitialState: function() {
    return {
      width: 1000,
      req: {values: [{x: 0, y: 0}]},
      res: {values: [{x: 0, y: 0}]},
      npm: {values: [{x: 0, y: 0}]},
    }
  },

  componentDidMount: function() {
    var that = this

    Varo.observe({role: 'metrics', source: 'seneca', metric: 'responses'},
      function (msg) {
        that.setState({res: {label: 'responses', values: msg.data.data}})
      })

    Varo.observe({role: 'metrics', source: 'seneca', metric: 'requests'},
      function (msg) {
        that.setState({req: {label: 'requests', values: msg.data.data}})
      })

    Varo.observe({role: 'metrics', source: 'seneca', metric: 'npm'},
      function (msg) {
          that.setState({npm: {label: 'npm', values: msg.data.data}})
      })

    var width = document.getElementsByClassName('dashboard')[0].offsetWidth
    this.setState({width: width})
  },

  render: function () {
    var width = this.state.width
    var req = this.state.req
    var res = this.state.res
    var npm = this.state.npm
    var overall = [req, res, npm]


    return (
      <div className="report">
        <div className="row">
          <BoxHeader icon={'fa fa-line-chart'} title={'Overall'} />
          <LineChart data={overall} height={200} width={width * 0.98} />
        </div>
        <div className="row">
          <BoxHeader icon={'fa fa-line-chart'} title={'Requests'} />
          <LineChart data={req} height={150} width={width * 0.98} />
        </div>
        <div className="row">
          <BoxHeader icon={'fa fa-line-chart'} title={'Responses'} />
          <LineChart data={res} height={150} width={width * 0.98} />
        </div>
        <div className="row">
          <BoxHeader icon={'fa fa-line-chart'} title={'NPM Hits'} />
          <LineChart data={npm} height={150} width={width * 0.98} />
        </div>
      </div>
    )
  }
})

module.exports = Report
