'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    'one-page-scroll': './one-page-scroll.js'
  },
  output: {
    path: __dirname,
    filename: '[name].min.js',
    library: 'onePageScroll',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env']
          }
        }]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: true,
                module: true,
                localIdentName: '[emoji:4]'
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].min.css'),
    new webpack.BannerPlugin({banner:
`/*!
 * one-page-scroll ${require('./package.json').version}
 * https://github.com/huihuimoe/one-page-scroll
 * Released under the MIT license
 */`,
      raw: true,
      entryOnly: true})
  ]
}

module.exports = config
