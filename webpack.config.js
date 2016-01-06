'use strict'

module.exports = {
  entry: [
    './lib/client/app.js'
  ],
  output: {
    path: './lib/public/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: '/node_modules/',
      loader: 'babel?presets[]=react,presets[]=es2015'
    }]
  }
}
