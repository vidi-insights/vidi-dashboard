var React = require('react')
var ReactD3 = require('react-d3-components')
var LineChart = ReactD3.LineChart

var tooltipScatter = function(x, y) {
  return "x: " + x + " y: " + y;
};
var dashFunc = function(label) {
  if (label == "somethingA") {
    return "4 4 4";
  }
  if (label == "somethingB") {
    return "3 4 3";
  }
}

var widthFunc = function(label) {
  if (label == "somethingA") {
    return "4";
  }
  if (label == "somethingB") {
    return "2";
  }
}

var linecapFunc = function(label) {
  if (label == "somethingA") {
    return "round";
  }
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
          xAxis={{innerTickSize: 6, label: "x-label"}}
          yAxis={{label: "y-label"}}
          shapeColor={"red"}
          stroke={{strokeDasharray: dashFunc, strokeWidth: widthFunc, strokeLinecap: linecapFunc}}
          />
      )
    }
  }
);
