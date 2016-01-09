'use strict'

import React from 'react'
import BoxHeader from '../components/boxHeader'

export const Sidebar = React.createClass({
  render () {
    const isExpanded = this.props.isExpanded
    const onToggle = this.props.onToggle
    let styleClass = 'sidebar'

    if (!isExpanded) {
      styleClass = styleClass + '-docked'
    }

    return (
      <aside className={styleClass}>
        <BoxHeader icon={'fa fa-bars'} title={'Menu'} onIconClicked={onToggle} />
        <ul className='sidebar-root'>
          <li>
            Your system
            <ul className='sidebar-level-1'>
              <li>System overview</li>
            </ul>
          </li>
        </ul>
      </aside>
    )
  }
})

export default Sidebar
