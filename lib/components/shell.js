'use strict'

var React = require('react')
var Header = require('./widgets/header')
var Footer = require('./widgets/footer')

var Auth = require('../services/auth')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      isAuthenticated: Auth.isAuthenticated()
    }
  },

  render: function () {
    var child = this.props.children

    return (
      <div className="shell">
        <Header />
        {child}
        <Footer />
      </div>
    )
  }
})
