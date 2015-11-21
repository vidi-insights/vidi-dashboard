'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')
var ProfileToolbox = require('./profileToolbox')

module.exports = React.createClass({
  render: function () {
    var toolbox = <ProfileToolbox />

    return (
      <div className="header">
        <BoxHeader
          icon={'./img/vidi-logo-small.svg'}
          iconLink={'/'}
          title={'Vidi: Dashboard'}
          toolbox={toolbox} />
      </div>
    )
  }
})
