'use strict'

var React = require('react')
var Header = require('../components/widgets/header')
var Footer = require('../components/widgets/footer')

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
