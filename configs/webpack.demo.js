const merge = require('webpack-merge')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')
const htmlWebpackPlugin = require('html-webpack-plugin')
const demoConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../example/index.tsx'),
  output: {
    filename: 'js/bundle.[contenthash].js',
    path: path.join(__dirname, '../cool-player/static'),
    publicPath: './static/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[contenthash].css',
    }),
    new htmlWebpackPlugin({
      filename: path.join(__dirname, '../cool-player/index.html'),
      template: path.join(__dirname, '../example/index.html'),
      title: 'ReactCoolMusicPlayer'
    })

  ]
}
module.exports = merge(baseConfig, demoConfig)