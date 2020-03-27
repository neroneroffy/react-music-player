const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.join(__dirname, '../server/index.js'),
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '../cool-player')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
    ]
  }
}