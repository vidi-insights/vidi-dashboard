var React = require('react')
var ReactD3 = require('react-d3-components')
var AreaChart = ReactD3.AreaChart

module.exports = React.createClass({

  getInitialState: function() {
    return {windowWidth: this.props.width}
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize)
  },

  handleResize: function(e) {
    this.setState({windowWidth: e.currentTarget.innerWidth - 400})
  },

  render: function () {
    return (
        <AreaChart
      data={this.props.data}
      width={this.state.windowWidth}
      height={400}
      tooltipHtml={this.props.tooltip}
      margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
    )}
  })
