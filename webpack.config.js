'use strict'

module.exports = {
  entry: [
    './lib/app.js'
  ],
  output: {
    path: './lib/deploy/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader'
    }]
  }
}
