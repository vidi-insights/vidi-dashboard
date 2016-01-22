'use strict'

var React = require('react')
var LineChart = require('./linechart')
var Moment = require('moment')
var D3 = require('d3')
var _ = require('lodash')

module.exports = React.createClass({
  render: function () {


    var processSection = this.makeProcessSection(this.props.data || {})

    return (
      <div className="row middle-xs">
        <h2 className="col-xs-12 col-sm-6">CPU Utilization</h2>
        {processSection}
    </div>
    )
  },
  makeProcessSection: function (data) {
    console.log(data)
    var result = [];

    var row = (<div key="cpu">
      <LineChart
        legend={true}
        data={data.cpu}
        width='100%'
        height={400}
        title="CPU Utilization"
        yAxisLabel="%"
        xAxisLabel="Timestamp"
        gridHorizontal={true}
      />
    </div>);

    result.push(row)

    return result
  }
})


function formatTimeAxis (x) {
  if (!x) return ''
  return Moment(x).format('hh:mm:ss')
}
