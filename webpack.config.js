'use strict'

var Webpack = require('webpack')
var Path = require('path')

var buildPath = Path.resolve(__dirname, 'dist')
var nodeModulesPath = Path.resolve(__dirname, 'node_modules')
var entryPath = Path.join(__dirname, '/client/app.js')
var clientPath = Path.resolve(__dirname, "client")

module.exports = {
  entry: [entryPath],
  resolve: ["", ".js", ".jsx"],
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  module: {
    noParse: [ 'react', 'd3' ],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel?presets[]=react,presets[]=es2015',
      exclude: [nodeModulesPath],
    }]
  }
}
