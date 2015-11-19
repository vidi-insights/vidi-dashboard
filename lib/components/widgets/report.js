'use strict'

var React = require('react')

var Chart = require('./chart')


var data = [{
  label: 'somethingA',
  values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
}];

module.exports = React.createClass({
  render: function () {
    return (
      <div className="report">
        <Chart data={data}></Chart>
      </div>
    )
  }
})

