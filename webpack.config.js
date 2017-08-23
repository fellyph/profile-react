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
      {test: /\.scss$/, exclude: /nodule_modules/, use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {test: /\.js$/, exclude: /nodule_modules/, use: 'babel-loader'}
    ]
  }
}