'use strict'

module.exports = {
  entry: [
    //'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/dev-server',
    './lib/client/app.js'
  ],
  output: {
    path: './lib/public/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader'
    }]
  }
}
