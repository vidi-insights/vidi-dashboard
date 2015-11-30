var React = require('react')
var ReactD3 = require('react-d3-components')
var LineChart = ReactD3.LineChart
var Moment = require('moment')

function formatX (x) {
  return Moment(x).format('hh:mm:ss')
}

module.exports = React.createClass({
    getInitialState: function() {

      return {windowWidth: window.innerWidth, width: this.props.width}
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({width: nextProps.width})
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.handleResize)
    },

    handleResize: function(e) {
      var width = e.currentTarget.innerWidth * this.state.width  / this.state.windowWidth  ;

      this.setState({windowWidth: e.currentTarget.innerWidth})
      this.setState({width: width})
    },

    render: function () {
      return (
        <LineChart
          data={this.props.data}
          width={this.state.width}
          height={this.props.height}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={this.props.tooltip}
          xAxis={{innerTickSize: 2, tickFormat: formatX, label: 'time' }}
          yAxis={{label: 'msgs'}}
          shapeColor={"blue"}
          stroke={{strokeDasharray: '2 4 2', strokeWidth: '2', strokeLinecap: 'round'}}
          />
      )
    }
  }
)
