'use strict'

var React = require('react')
var BoxHeader = require('./boxHeader')

module.exports = React.createClass({
  render: function () {
    var title = 'MIT. Copyright (c) 2016. Vidi: Insights'
    return (
      <footer className="footer txt-small txt-dimmed mb mt txt-center" role="contentinfo">
        <div className="container-fluid">
          <BoxHeader icon={'icon icon-bug'} title={title} />
        </div>
      </footer>
    )
  }
})
