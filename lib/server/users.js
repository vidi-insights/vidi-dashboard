module.exports = function (seneca) {
  seneca.use('user')
  seneca.use(require('./plugins/vidi-seneca-metrics'))

  seneca.act({
    role:'user',
    cmd:'register',
    name: "Admin",
    email: 'admin@vidi.com',
    password: 'vidi'
  })
}
