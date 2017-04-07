/*
  Environment varibles:
    - CORDOVA: if it exists a script tag including cordova.js will be added to the index.html file-loader
    - NODE_ENV:
      -> production: activate optimizations (takes a lot of time)
      -> development: no optimizations

  Babel options: in the .babelrc file
*/

'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isCordova = process.env.CORDOVA !== undefined

const cordovaExternalJS = ['cordova.js']
const commonExternalJS = []
const externalJS = ((process.env.NODE_ENV === 'production') && isCordova) ? commonExternalJS.concat(cordovaExternalJS) : commonExternalJS

const commonPlugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.ejs',
    externalJS
  }),
  new ExtractTextPlugin('[name].bundle.css'),
  new CopyWebpackPlugin([{
    from: path.join(__dirname, 'src', 'public'),
    ignore: ['index.ejs']
  }]),
  new ProgressBarPlugin()
]
const optimizePlugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor']
  })
]
// run optimizations only on production
const plugins = process.env.NODE_ENV === 'production' ? commonPlugins.concat(optimizePlugins) : commonPlugins

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['./main'],
    vendor: ['react', 'react-dom', 'onsenui', 'react-onsenui']
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  plugins
}
