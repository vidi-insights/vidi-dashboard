'use strict'

var React = require('react')
var Header = require('./widgets/header')
var Footer = require('./widgets/footer')

var Auth = require('../services/auth')

module.exports = React.createClass({
  initialState: {
    isAuthenticated: Auth.isAuthenticated()
  },

  getInitialState: function () {
    return this.initialState
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
