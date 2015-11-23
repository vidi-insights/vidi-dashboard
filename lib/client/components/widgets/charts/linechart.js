var React = require('react')
var ReactD3 = require('react-d3-components')
var LineChart = ReactD3.LineChart



module.exports = React.createClass({
    getInitialState: function() {

      return {windowWidth: window.innerWidth, width: this.props.width}
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
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={this.props.tooltip}
          xAxis={{innerTickSize: 6, label: this.props.xlabel }}
          yAxis={{label: this.props.ylabel}}
          shapeColor={"red"}
          />
      )
    }
  }
)
