'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="user">
        <div className="box-header">
          <div className="box-header-icon">
          </div>
          <div className="box-header-titlebar">
            <span>User: Dean McDonnell</span>
          </div>
        </div>
      </div>
    )
  }
})
