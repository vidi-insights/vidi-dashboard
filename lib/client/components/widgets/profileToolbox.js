'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {    
    return (
      <div className="profile-toolbox">
        <ul>
          <li>profile</li>
          <li> | </li>
          <li>sign out</li>
        </ul>
      </div>
    )
  }
})
