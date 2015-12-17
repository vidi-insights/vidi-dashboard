'use strict'

var React = require('react')
var IndexLink = require('react-router').IndexLink

module.exports = React.createClass({
  render: function () {
    return (
      <div className="profile-toolbox">
        <ul>
          <li>
            <i className={'fa fa-close'}></i>
          </li>
        </ul>
      </div>
    )
  }
})
