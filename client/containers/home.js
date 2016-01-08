'use strict'

var React = require('react')
var Sidebar = require('../components/sidebar')
var Dashboard = require('../components/dashboard')
var Varo = require('../plugins').Varo

module.exports = React.createClass({
  toggleSidebar: {role: 'sidebar', cmd: 'toggle'},

  getInitialState: function () {
    return {
      sidebarExpanded: true,
    }
  },

  componentWillMount: function () {
    var that = this

    Varo.handle(this.toggleSidebar,
      function (msg, done) {
      that.setState({
        sidebarExpanded: !that.state.sidebarExpanded
      })

      return done()
    })
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
