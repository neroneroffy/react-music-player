const path = require('path')
const baseConfig = {
  entry: path.join(__dirname, '../example/index.tsx'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader'
          },
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|jpeg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}
module.exports = baseConfig
