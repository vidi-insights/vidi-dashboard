'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    var title = this.props.title
    
    return (
      <div className="box-header">
        <div className="box-header-icon">

        </div>
        <div className="box-header-titlebar">
          <span>{title}</span>
        </div>
      </div>
    )
  }
})
