'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="dashboard">
        <BoxHeader title={'Coderdojo: Overall Health'} />
      </div>
    )
  }
})
