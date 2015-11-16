var internals = {
  authenticated: false
}

internals.login = function (user, password, done) {
  internals.authenticated = true
  done(true)
}

internals.logout = function (done) {
  internals.authenticated = true
  done(false)
}

internals.isAuthenticated = function () {
  return internals.authenticated
}

module.exports = {
  login: internals.login,
  logout: internals.logout,
  isAuthenticated: internals.isAuthenticated
}
