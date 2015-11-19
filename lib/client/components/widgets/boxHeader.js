'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    var title = this.props.title
    var handleIconClick = this.props.onIconClicked
    var toolbox = this.props.toolbox

    if (toolbox) {
      toolbox = (
        <div className="box-header-toolbox" >
          {toolbox}
        </div>
      )
    }

    return (
      <div className="box-header">
        <div className="box-header-icon" onClick={handleIconClick}>
        </div>
        {toolbox}
        <div className="box-header-titlebar">
          <span>{title}</span>
        </div>
      </div>
    )
  }
})
