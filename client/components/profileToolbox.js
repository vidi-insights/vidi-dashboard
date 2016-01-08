'use strict'

var React = require('react')
var IndexLink = require('react-router').IndexLink

module.exports = React.createClass({
  render: function () {
    return (
      <div className="profile-toolbox">
        <ul>
          <li>
            <i className={'fa fa-user'}></i>
            <IndexLink to={'/user'}>profile</IndexLink>
            </li>
          <li>
            <i className={'fa fa-sign-out'}></i>
            <IndexLink to={'/logout'}>sign out</IndexLink>
          </li>
        </ul>
      </div>
    )
  }
})
