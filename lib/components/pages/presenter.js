'use strict'

var React = require('react')

var Sidebar = require('../widgets/sidebar')
var Dashboard = require('../widgets/Dashboard')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="presenter">
        <Sidebar />
        <Dashboard />
      </div>
    )
  }
})
