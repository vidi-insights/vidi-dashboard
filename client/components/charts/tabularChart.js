'use strict'

var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      width: 1000,
      data: {
        labels: ['Message type', 'Volume'],
        values: [
          ['role:foo_cmd:bar', 24],
          ['role:bar_cmd:foo', 24],
          ['role:hi_cmd:lo', 24]
        ]
      }
    }
  },

  componentDidMount: function() {
    var that = this
  },

  render: function () {
    var data = this.props.data || this.state.data
    data.labels = data.labels || []
    data.values = data.values || []

    var headers = []
    data.labels.forEach(function (header) {
      headers.push(<th>{header}</th>)
    })

    var rows = []
    data.values.forEach(function (row) {
      var cells = []

      row.forEach(function (value) {
        cells.push(<td>{value}</td>)
      })

      rows.push(<tr>{cells}</tr>)
    })

    return (
      <div className="tabular-chart">
        <table>
          <thead>
            {headers}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
})
