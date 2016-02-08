'use strict'

import React from 'react'
import {connect} from 'react-redux'

export const Profile = React.createClass({
  render () {
    return (
      <div className="page container-fluid">
        <div className="row middle-xs page-heading">
          <h2 className="col-xs-12 col-sm-6">Profile</h2>
        </div>
      </div>
    )
  }
})

export default connect((state) => {
  return {
  }
})(Profile)
