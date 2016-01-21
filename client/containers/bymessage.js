'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {toggleSidebar} from '../actions/sidebar'
import Sidebar from '../components/sidebar'

export const ByMessage = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired
  },

  // This method gets passed to the sidebar, it
  // gets wired up to the toggle button. It's job
  // is to tell redux we want to toggle the sidebar.
  handleToggle (event) {
    event.preventDefault()
    this.props.dispatch(toggleSidebar())
  },

  render () {
    // The event handler from above
    const handleToggle = this.handleToggle

    // We get this automagically from redux, at
    // any point in time this will be true or false
    // it always starts out as true when the app starts.
    const {isExpanded} = this.props

    // This is the style class for the bymessage panel or page to the right of the
    // sidebar. Feel free to use whatever classes you want. It's a basic, if expanded
    // use 'bymessage-panel-expanded' class otherwise use 'bymessage-panel'
    var styleClass = 'bymessage-panel'
    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      // I don't do anything special with this as it's just a container
      <div className="bymessage-wrapper">
        // we pass the method to handle the toggle down to the sidebar, it has the button
        // so it needs the method to call. We also pass is expanded, this lets the sidebar
        // change to 'expanded' exactly like the class above.
        <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
        // This is where we assign the calculated style class from above. You might not event
        // need this if the whole thing is flexable. My orginal design wasn't so I needed to
        // add an expanded class to fill the space the sidebar leaves when it is not expanded.
        <div className={styleClass}>
          By Message
        </div>
      </div>
    )
  }
})

// This code is the magic that lets redux update our control with new state
// implicitly. You don't need to care about this. You only need to care that
// at some point in time isExpanded will be true or false. Redux causes a
// redraw we simply work with the data as it is presented to us.
function mapStatesToProps (state) {
  const {sidebar} = state

  return {
    isExpanded: sidebar.isExpanded
  }
}

export default connect(mapStatesToProps)(ByMessage)
