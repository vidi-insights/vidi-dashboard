'use strict'

var React = require('react')


module.exports = React.createClass({
  render: function () {
    return (
      <aside className='sidebar'>
        <div className="box-header">
          <div className="box-header-icon">

          </div>
          <div className="box-header-titlebar">
            <span>Menu</span>
          </div>
        </div>
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
