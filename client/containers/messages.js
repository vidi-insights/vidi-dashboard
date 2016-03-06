'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'
import pageHeader from '../components/pageHeader'

export const Messages = React.createClass({
  render () {
    return (
      <div className="page container-fluid">
        <PageHeader title={'Messages'} />
        <Panel title={'messages'}>
        </Panel>
      </div>
    )
  }
})

export default connect((state) => {
})(Messages)
