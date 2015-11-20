'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')
var Varo = require('../../services').Varo

module.exports = React.createClass({
  handleSidebarToggle: function () {
    Varo.act({role:'sidebar', cmd: 'toggle'})
  },

  render: function () {
    var styleClass = 'sidebar'
    var isExpanded = this.props.isExpanded
    var handleSidebarToggle = this.handleSidebarToggle

    if (!isExpanded) {
      styleClass = styleClass + '-docked'
    }

    return (
      <aside className={styleClass}>
        <BoxHeader title={'Menu'} onIconClicked={handleSidebarToggle} />
        <ul className='sidebar-root'>
          <li>
            <span>Quick actions </span>
            <ul className='sidebar-level-1'>
              <li>New project... </li>
              <li>New report... </li>
            </ul>
          </li>
          <li>
            CoderDojo
            <ul className='sidebar-level-1'>
              <li>Overall Health</li>
              <li>Message Flow rates</li>
              <li>Hotspots</li>
            </ul>
          </li>
          <li>
            NodeZoo
            <ul className='sidebar-level-1'>
              <li>Overall Health</li>
              <li>Message Flow rates</li>
              <li>Traffic</li>
              <li>Hotspots</li>
            </ul>
          </li>
        </ul>
      </aside>
    )
  }
})
