'use strict'

import React from 'react'
import {connect} from 'react-redux'

export const Profile = React.createClass({
  render () {
    return (
      <main className="page page-login" role="main">
        <div className="container-fluid">
          
          <div className="row middle-xs center-xs vertical-center">
            <div className="col-xs-12 col-md-7 col-lg-5">
              <div className="panel txt-left">
                <div className="panel-heading has-icon cf">
                  <h2 className="m0">Profile</h2>
                  <button className="btn btn-secondary fl-right btn-compact">Edit</button>
                </div>
                <div className="panel-body">
                  <dl className="cf">
                    <dt>Username</dt>
                    <dd>admin</dd>
                  </dl>
                  <dl className="cf">
                    <dt>Email</dt>
                    <dd>admin@mail.com</dd>
                  </dl>
                  
                  <button className="btn btn-warning mt">Reset password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
})

export default connect((state) => {
  return {
  }
})(Profile)
