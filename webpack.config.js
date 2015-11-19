'use strict'

module.exports = {
  entry: [
    './lib/client/app.js'
  ],
  output: {
    path: './public/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader'
    }]
  }
}
