'use strict'

var React = require('react')
var ReactD3 = require('react-d3-components')
var AreaChart = ReactD3.AreaChart

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      margin: {top: 10, bottom: 30, left: 30, right: 10},
      data: {label: 'default', values: {x:0, y:0}},
      xAxis: {label: 'x-axis'},
      yAxis: {label: 'y-axis'},
    }
  },

  getInitialState: function () {
    return {
      height: 0,
      width: 0
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.fitToParent()
  },

  componentDidMount: function () {
    this.fitToParent()
  },

  fitToParent: function () {
    var node = this.getDOMNode()
    var nodeWidth = node.parentNode.offsetWidth
    var nodeHeight = node.parentNode.offsetHeight
    var currentWidth = this.state.width
    var currentHeight = this.state.height

    if (nodeHeight !== currentHeight || nodeWidth !== currentWidth) {
      this.setState({
        height: nodeHeight,
        width: nodeWidth
      })
    }
  },

  render: function () {
    var width = ((this.state.width - (this.props.margin.right)) || 200)
    var height = ((this.state.height - (this.props.margin.bottom + this.props.margin.top)) || 100)

    return (
      <AreaChart
        data={this.props.data}
        width={width}
        height={height}
        tooltipHtml={this.props.tooltipHtml}
        margin={this.props.margin}
        xAxis={this.props.xAxis}
        yAxis={this.props.yAxis}
      />
    )
  }
})
