'use strict'

var React = require('react')
var LineChart = require('./charts/linechart')
var BarChart = require('./charts/barchart')

var flowPopup = function(x, y) {
  return y + " messages"
}

var messageFlowRate = [
  {
    label: 'cd-agreements',
    values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
  },
  {
    label: 'email-notifications',
    values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}, {x: 4.5, y: 7}, {x: 5, y: 7.8}, {x: 5.5, y: 9}]
  },
  {
    label: 'cd/oauth2',
    values: [{x: 0, y: 3}, {x: 1.3, y: 6}, {x: 3, y: 2}, {x: 3.5, y: 2}, {x: 4, y: 3}, {x: 4.5, y: 9}, {x: 5, y: 8}, {x: 5.5, y: 2}]
  },
  {
    label: 'cd-nodebb-api',
    values: [{x: 0, y: 3}, {x: 1.3, y: 2}, {x: 3, y: 5}, {x: 3.5, y: 5}, {x: 4, y: 4}, {x: 4.5, y: 3}, {x: 5, y: 5}, {x: 5.5, y: 6}]
  },
  {
    label: 'cd-profiles',
    values: [{x: 0, y: 3}, {x: 1.3, y: 5}, {x: 3, y: 3}, {x: 3.5, y: 3}, {x: 4, y: 6}, {x: 4.5, y: 5}, {x: 5, y: 6}, {x: 5.5, y: 4.4}]
  },
  {
    label: 'cd-users',
    values: [{x: 0, y: 3}, {x: 1.3, y: 8}, {x: 3, y: 9}, {x: 3.5, y: 6}, {x: 4, y: 8}, {x: 4.5, y: 4}, {x: 5, y: 8}, {x: 5.5, y: 5}]
  }
]


var Report = React.createClass({
  getInitialState: function() {
    return {width: 1000}
  },

  componentDidMount: function() {
    var width = document.getElementsByClassName('dashboard')[0].offsetWidth

    this.setState({width: width})
  },

  render: function () {
    var width = this.state.width

    return (
      <div className="report">
        <div className="row">
            <div className="chart-titlebar">Overall Rate</div>
            <LineChart data={messageFlowRate} width={ width * 0.98} tooltip={flowPopup} />
        </div>

        <div className="row">
          <div className="six columns">
            <div className="chart-titlebar">Message Flow Rate</div>
            <LineChart data={messageFlowRate[0]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
          <div className="six columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={messageFlowRate[1]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={messageFlowRate[2]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
          <div className="six columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={messageFlowRate[3]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={messageFlowRate[4]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
          <div className="six columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={messageFlowRate[5]} width={ width * 0.46} tooltip={flowPopup} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Report
