'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    var title = this.props.title
    var handleIconClick = this.props.onIconClicked

    return (
      <div className="box-header">
        <div className="box-header-icon" onClick={handleIconClick}>

        </div>
        <div className="box-header-titlebar">
          <span>{title}</span>
        </div>
      </div>
    )
  }
})
