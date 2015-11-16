
var internals = {

}

internals.start = function (done) {
  console.log('session, start')
  return done()
}

module.exports = {
  start: internals.start
}
