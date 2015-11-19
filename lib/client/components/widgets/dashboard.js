'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')

module.exports = React.createClass({
  render: function () {
    var styleClass = 'dashboard'
    var isExpanded = this.props.isExpanded

    if (isExpanded) {
      styleClass = styleClass + '-expanded'
    }

    return (
      <div className={styleClass}>
        <BoxHeader title={'Coderdojo: Overall Health'} />
      </div>
    )
  }
})
