'use strict'

const path = require('path')
const webpack = require('webpack')

const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './app/assets/js/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: '',
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
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
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV' : '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new DashboardPlugin(),
    new ExtractTextPlugin('style.css'),
    new HTMLPlugin({
      title: 'Fellyph Cintra - Front-end Developer',
      template: path.join(__dirname, 'app', 'html', 'template.html')
    })
  ]
}