'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="footer">
        <BoxHeader title={'Version: 0.0.1'} />
      </div>
    )
  }
})
