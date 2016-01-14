var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var expect = Code.expect

describe('Dummy Test', function (done) {
  expect('this').to.only.include(['this'])
  return done
})
