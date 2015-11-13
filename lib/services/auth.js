
var internals = {
}

internals.login = function (user, password, done) {
  done(true)
}

internals.logout = function (done) {
  done(false)
}

internals.isAuthenticated = function () {
  return false
}

module.exports = {
  login: internals.login,
  logout: internals.logout,
  isAuthenticated: internals.isAuthenticated
}
