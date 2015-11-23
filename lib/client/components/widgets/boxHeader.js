'use strict'

var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({
  render: function () {
    var title = this.props.title
    var handleIconClick = this.props.onIconClicked
    var toolbox = this.props.toolbox

    var icon = this.props.icon
    var iconLink = this.props.iconLink;
    var iconTag;

    if (icon) {
      if (icon.includes('fa')) {
        iconTag = (<i className={icon}> </i>)
      }
      else {
        iconTag = (<img src={icon} />)
      }
    }

    if (iconLink) {
      iconTag = (
        <Link to={iconLink}>
          {iconTag}
        </Link>
      )
    }

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
          {iconTag}
        </div>
        {toolbox}
        <div className="box-header-titlebar">
          <span>{title}</span>
        </div>
      </div>
    )
  }
})
