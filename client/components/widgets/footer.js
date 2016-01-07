'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')

module.exports = React.createClass({
  render: function () {
    var title = 'MIT. Copyright (c) 2015. Vidi: Insights'
    return (
      <div className="footer">
        <BoxHeader icon={'fa fa-bug'} title={title} />
      </div>
    )
  }
})
