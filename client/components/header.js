'use strict'

import React from 'react'
import BoxHeader from './boxHeader'
import ProfileToolbox from './profileToolbox'

export const Header = React.createClass({
  render () {
    let toolbox = <ProfileToolbox />

    if (!this.props.showProfile) {
      toolbox = null
    }

    return (
      <div className="header">
        <BoxHeader
          icon={require('../assets/img/vidi-logo-small.svg')}
          iconLink={'/'}
          title={'Vidi: Dashboard'}
          toolbox={toolbox} />
      </div>
    )
  }
})

export default Header
