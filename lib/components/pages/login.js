'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="login">
        <form class="login">
          <fieldset>
            <legend class="legend">Login</legend>

            <div class="input">
              <input type="email" placeholder="Email" required />
              <span><i class="fa fa-envelope-o"></i></span>
            </div>

            <div class="input">
              <input type="password" placeholder="Password" required />
              <span><i class="fa fa-lock"></i></span>
            </div>

            <button type="submit" class="submit">
              <i class="fa fa-long-arrow-right"></i>
            </button>
          </fieldset>

          <div class="feedback">
            login successful <br />
            redirecting...
          </div>
        </form>
      </div>
    )
  }
})
