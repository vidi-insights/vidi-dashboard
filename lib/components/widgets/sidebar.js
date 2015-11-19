'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')


module.exports = React.createClass({
  render: function () {
    return (
      <aside className='sidebar'>
        <BoxHeader title={'Menu'} />
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
