'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')


module.exports = React.createClass({
  render: function () {
    return (
      <aside className='sidebar'>
        <BoxHeader title={'Menu'} />
        <ul>
          <li>
            <span>Quick actions </span>
            <ul>
              <li>New project... </li>
              <li>New report... </li>
            </ul>
          </li>
          <li>
            CoderDojo
            <ul>
              <li>Overall Health</li>
              <li>Message Flow rates</li>
              <li>Hotspots</li>
            </ul>
          </li>
          <li>
            NodeZoo
            <ul>
              <li>Overall Health</li>
              <li>Message Flow rates</li>
              <li>Hotspots</li>
            </ul>
          </li>
        </ul>
      </aside>
    )
  }
})
