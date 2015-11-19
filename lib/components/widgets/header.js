'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')


module.exports = React.createClass({
  render: function () {
    return (
      <div className="header">
        <BoxHeader title={'Vidi: Dashboard'} />
      </div>
    )
  }
})
