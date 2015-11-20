module.exports = function (seneca) {
  seneca.use('user')

  seneca.act({role:'user', cmd:'register', name: "Michele Capra", email: 'm@test.com', password: 'pass'})
  seneca.act({role:'user', cmd:'register', name: "Dean McDonnell", email: 'd@test.com', password: 'pass'})
}
