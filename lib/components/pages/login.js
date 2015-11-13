'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="login">
        <form className="login">
          <fieldset>
            <legend className="legend">Login</legend>

            <div className="input">
              <input type="email" placeholder="Email" required />
              <span><i className="fa fa-envelope-o"></i></span>
            </div>

            <div className="input">
              <input type="password" placeholder="Password" required />
              <span><i className="fa fa-lock"></i></span>
            </div>

            <button type="submit" className="submit">
              <i className="fa fa-long-arrow-right"></i>
            </button>
          </fieldset>

          <div className="feedback">
            login successful <br />
            redirecting...
          </div>
        </form>
      </div>
    )
  }
})
