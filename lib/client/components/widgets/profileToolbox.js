'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="profile-toolbox">
        <ul>
          <li><i className={'fa fa-user'}></i>profile</li>
          <li><i className={'fa fa-sign-out'}></i>sign out</li>
        </ul>
      </div>
    )
  }
})
