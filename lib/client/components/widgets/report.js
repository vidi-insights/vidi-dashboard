'use strict'

var React = require('react')

var LineChart = require('./charts/linechart')
var AreaChart = require('./charts/areachart')
var BarChart = require('./charts/barchart')

var rand = function(move, base) {
  return Math.floor(Math.random() * move + base)
}

var genData = function (move, base, trend, point) {
  var data = []
  for(var i = 0; i < point; i++) {
    data.push({x: i, y: rand(move,base + i / trend)})
  }
  return data
}

var cpuPopup = function(label, point) {
  return  point.y + " %"
}

var memPopup = function(label, point) {
  return  point.y + " MB"
}

var commitPopup = function(label, point) {
  return  point.y + " commits"
}

var flowPopup = function(x, y) {
  return y + " messages"
}

var microPopup = function(x, y,z) {
  return z + " messages"
}

var micro1 = [{
  label: 'Microservices',
  values: [
    {x: 'cd-agreements', y: 144},
    {x: 'email', y: 10},
    {x: 'cd/oauth2', y: 454},
    {x: 'cd-nodebb-api', y: 2744},
    {x: 'cd-profiles', y: 110},
    {x: 'cd-users', y: 102}
  ]
}]

var memory = [{
  label: 'Time',
  values:  genData(200, 800, 80, 100)
}]


var CPU = [{
  label: 'CPU usage',
  values: genData(20, 50, 10, 100),
}]

var commits = [{
  label: 'Commit',
  values: genData(2, 10, 2, 10),
}]

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
    var width = document.getElementsByClassName('container')[0].offsetWidth

    this.setState({width: width})
  },

  render: function () {
    console.log(this.state)
    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <div className="chart-titlebar">Message Flow Rate</div>
            <AreaChart data={messageFlowRate} width={this.state.width} tooltip={flowPopup}></AreaChart>
          </div>
        </div>

        <div className="row">
          <div className="seven columns">
            <div className="chart-titlebar">Messages by Microservice last 24 hours</div>
            <BarChart data={micro1} width={this.state.width * 0.5666666667} ></BarChart>
          </div>
          <div className="five columns">
            <div className="chart-titlebar">Project commit</div>
            <LineChart data={commits} width={this.state.width * 0.3933333333} tooltip={commitPopup}></LineChart>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <div className="chart-titlebar">Memory Footprint (MB)</div>
            <LineChart data={memory} width={this.state.width * 0.46} xlabel="minutes" ylabel="memory %" tooltip={memPopup}></LineChart>
          </div>
          <div className="six columns">
            <div className="chart-titlebar">CPU</div>
            <LineChart data={CPU} width={this.state.width * 0.46} xlabel="minutes" ylabel="cpu %" tooltip={cpuPopup} ></LineChart>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Report

