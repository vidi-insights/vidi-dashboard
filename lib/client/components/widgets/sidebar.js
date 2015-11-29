'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')
var Varo = require('../../plugins').Varo

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
        <BoxHeader icon={'fa fa-bars'} title={'Menu'} onIconClicked={handleSidebarToggle} />
        <ul className='sidebar-root'>
          <li>
            Your system
            <ul className='sidebar-level-1'>
              <li>Message flow rate</li>
            </ul>
          </li>
        </ul>
      </aside>
    )
  }
})
