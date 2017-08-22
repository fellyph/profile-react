module.exports = {
  entry: './app/assets/js/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  }
}