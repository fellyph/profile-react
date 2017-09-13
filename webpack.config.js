'use strict'

const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: './app/assets/js/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {test: /\.scss$/, exclude: /nodule_modules/, use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
      {test: /\.js$/, exclude: /nodule_modules/, use: 'babel-loader'}
    ]
  }
}