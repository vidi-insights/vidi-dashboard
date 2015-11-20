var React = require('react')
var ReactD3 = require('react-d3-components')
var BarChart = ReactD3.BarChart

module.exports = React.createClass({
  render: function () {
    return (
      <BarChart
        data={this.props.data}
        width={this.props.width}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
    )}
});