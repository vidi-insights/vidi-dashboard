'use strict'

var React = require('react')
var ReactD3 = require('react-d3-components')
var LineChart = ReactD3.LineChart
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
        data={data.cpu}
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}
        xAxis={{innerTickSize: 6, label: "Timestamp"}}
        yAxis={{label: "% Utilization"}}
        shapeColor={"red"}
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
