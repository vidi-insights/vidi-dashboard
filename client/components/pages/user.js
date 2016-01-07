'use strict'

var React = require('react')
var BoxHeader = require('../widgets/boxHeader')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="user">
        <BoxHeader icon={'fa fa-user'} title={'User: Dean McDonnell'} />
      </div>
    )
  }
})
