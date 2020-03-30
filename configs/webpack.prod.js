const merge = require('webpack-merge')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')
const prodConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    library: 'CoolPlayer',
    libraryTarget: 'umd'
  },
  externals: [ 'react', 'react-dom', 'react-addons-css-transition-group' ],
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
      filename: 'index.css',
    })
  ]
}
module.exports = merge(baseConfig, prodConfig)