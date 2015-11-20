'use strict'

var React = require('react')

var Sidebar = require('../widgets/sidebar')
var Dashboard = require('../widgets/dashboard')

var Varo = require('../../services').Varo

module.exports = React.createClass({
  toggleSidebar: {role: 'sidebar', cmd: 'toggle'},

  getInitialState: function () {
    return {
      sidebarExpanded: true
    }
  },

  handleSidebarToggle: function (msg, done) {
    this.setState({
      sidebarExpanded: !this.state.sidebarExpanded
    })

    return done()
  },

  componentWillMount: function () {
    Varo.handle(this.toggleSidebar, this.handleSidebarToggle)
  },

  componentWillUnmount: function () {
    Varo.removeHandler(this.toggleSidebar, this.handleSidebarToggle)
  },

  render: function () {
    var sidebarExpanded = this.state.sidebarExpanded

    return (
      <div className="presenter">
        <Sidebar isExpanded={sidebarExpanded} />
        <Dashboard isExpanded={!sidebarExpanded} />
      </div>
    )
  }
})
