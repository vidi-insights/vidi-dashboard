var React = require('react')
var ReactD3 = require('react-d3-components')
var AreaChart = ReactD3.AreaChart

module.exports = React.createClass({
  render: function () {
    return (
        <AreaChart
      data={this.props.data}
      width={this.props.width}
      height={400}
      tooltipHtml={this.props.tooltip}
      margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
    )}
  })
