'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'

export const Services = React.createClass({
  render () {
    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-8">Services</h2>
          <div className="col-xs-12 col-sm-4 txt-right">
            <select>
              <option>120 seconds</option>
              <option>5 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>

        <Panel title={'services'} />
      </div>
    )
  }
})

export default connect((state) => {
  return {
  }
})(Services)
