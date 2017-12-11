'use strict'

const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const dist = 'build'

module.exports = {
  devtool: 'source-map',
  entry: './app/assets/js/main.js',
  output: {
    path: __dirname + '/' + dist,
    publicPath: '',
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.scss$/,
        exclude: /nodule_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {test: /\.js$/, exclude: /nodule_modules/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new DashboardPlugin(),
    new HTMLPlugin({
      title: 'Fellyph Cintra - Front-end Developer',
      template: path.join(__dirname, 'app', 'html', 'template.html')
    }),
    new WorkboxPlugin({
      globDirectory: './',
      globPatterns: ['**/*.{html,js}'],
      swDest: path.join(dist, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}