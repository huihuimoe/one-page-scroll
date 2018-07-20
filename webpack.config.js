'use strict'
const randomEmoji = require('random-unicode-emoji')
const webpack = require('webpack')
const config = {
  context: __dirname,
  devtool: 'source-map',
  mode: 'production',
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
        use: [
          'template-string-optimize-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['env']
            }
          }]
      }
    ]},
  plugins: [
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
