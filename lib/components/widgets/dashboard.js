'use strict'

var React = require('react')
var Report = require('./report')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="dashboard">
        <div className="box-header">
          <div className="box-header-icon">

          </div>
          <div className="box-header-titlebar">
            <span>Coderdojo: Overall Health</span>
          </div>
        </div>
        <Report></Report>
      </div>
    )
  }
})
