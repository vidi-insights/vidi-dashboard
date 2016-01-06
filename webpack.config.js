'use strict'

var Webpack = require('webpack')
var Path = require('path')

var Transfer = require('transfer-webpack-plugin')
var UglyifyJs = Webpack.optimize.UglifyJsPlugin

var buildPath = Path.resolve(__dirname, 'lib/bundle')
var nodeModulesPath = Path.resolve(__dirname, 'node_modules')
var entryPath = Path.join(__dirname, '/lib/client/app.js')
var clientPath = Path.resolve(__dirname, "lib/client")

module.exports = {
  entry: [entryPath],
  resolve: ["", ".js", ".jsx"],
  output: {
    path: buildPath,
    filename: 'js/app.js'
  },
  plugins: [
    new UglyifyJs({compress: {warnings: false}}),
    new Transfer([{from: 'www'}], clientPath)
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel?presets[]=react,presets[]=es2015',
      exclude: [nodeModulesPath],
    }]
  }
}
