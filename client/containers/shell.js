'use strict'

var React = require('react')
var Header = require('../components/header')
var Footer = require('../components/footer')

module.exports = React.createClass({
  render: function () {
    var page = this.props.children

    return (
      <div className="shell">
        <Header />
          {page}
        <Footer />
      </div>
    )
  }
})
