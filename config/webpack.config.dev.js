const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_DIRECTORY = path.join(__dirname);
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, '../public');

const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, '../src');
const BUILD_DIRECTORY = path.join(ROOT_DIRECTORY, '../build');

const config = require('./webpack.config.js');
const webpackConfig = merge(config, {
  plugins: [
    // new CopyWebpackPlugin(
    //   {
    //     patterns: [
    //       { from: path.join(SRC_DIRECTORY, 'resources'), to: path.join(BUILD_DIRECTORY, 'resources') },
    //       { from: path.join(PUBLIC_DIRECTORY), to: path.join(BUILD_DIRECTORY) }
    //     ]
    //   }
    // )
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(PUBLIC_DIRECTORY),

    host: 'localhost',
    inline: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    },
    progress: true,
    open: true,
    hot: true,
    port: 8080
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = webpackConfig;
