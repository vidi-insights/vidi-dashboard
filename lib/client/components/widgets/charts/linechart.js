var React = require('react')
var ReactD3 = require('react-d3-components')
var LineChart = ReactD3.LineChart

var tooltipScatter = function(x, y) {
  return "x: " + x + " y: " + y
}

module.exports = React.createClass({
    render: function () {
      return (
        <LineChart
          data={this.props.data}
          width={this.props.width}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={tooltipScatter}
          xAxis={{innerTickSize: 6, label: this.props.xlabel }}
          yAxis={{label: this.props.ylabel}}
          shapeColor={"red"}
          />
      )
    }
  }
)
