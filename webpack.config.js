'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = {
  context: __dirname,
  entry: {
    'one-page-scroll': './one-page-scroll.js'
  },
  output: {
    path: __dirname,
    filename: '[name].min.js'
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
                minimize: true,
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]},
  plugins: [
    new webpack.DefinePlugin({
      VERSION: `"${require('./package.json').version}"`
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].min.css')
  ]
}

module.exports = config
