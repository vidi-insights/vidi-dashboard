'use strict'

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({
  render: function () {
    return (
      <div className="profile-toolbox">
        <ul>
          <li>
            <i className={'fa fa-user'}></i>
            <Link to={'/user'}>profile</Link>
            </li>
          <li>
            <i className={'fa fa-sign-out'}></i>
            <Link to={'/logout'}>sign out</Link>
          </li>
        </ul>
      </div>
    )
  }
})
