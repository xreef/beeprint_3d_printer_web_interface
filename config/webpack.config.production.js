const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin2');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname);
const BUILD_DIRECTORY = path.join(ROOT_DIRECTORY, '../build');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, '../public');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, '../src');

const config = require('./webpack.config.js');
const webpackConfig = merge(config, {
  mode: 'production',
  output: {
    path: path.resolve(BUILD_DIRECTORY),
    filename: 'bundle.min.js',
    publicPath: '/',
    clean: true
  },
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin(
        {
          include: /\.min\.js$/,
          terserOptions: {
            ecma: undefined,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            // Deprecated
            output: null,
            format: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false
          }

        }
      )

    ]
    // splitChunks: {
    //     chunks: 'all',
    //     minChunks: 3
    // },

  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: path.join(PUBLIC_DIRECTORY), to: path.join(BUILD_DIRECTORY) },
          { from: path.join(SRC_DIRECTORY, 'resources', 'images', 'favicon'), to: path.join(BUILD_DIRECTORY) }
        ]
      }
    ),

    new Visualizer({
      filename: `${BUILD_DIRECTORY}/statistics.html`
    }),
    new ReplaceInFileWebpackPlugin(
      [{
        dir: BUILD_DIRECTORY,
        files: ['index.html'],
        rules: [{
          search: 'bundle.js',
          replace: 'bundle.min.js'
        }]
      }, {
        dir: BUILD_DIRECTORY,
        files: ['settings.js'],
        rules: [{
          search: 'localIP',
          replace: 'localDevIP'
        }]
      }, {
        dir: BUILD_DIRECTORY,
        files: ['manifest.json', 'index.html'],
        rules: [{
          search: 'resources/images/favicon',
          replace: ''
        }]
      }]
    ),
    // new ExtractTextPlugin("styles.css"),
    new CompressionPlugin({
      // asset: '[path].gz[query]',
      exclude: ['index.html', 'settings.js'],
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.svg$|\.jpg$|\.png$/,
      // threshold: 8192
      minRatio: 0.8,
      deleteOriginalAssets: true
    })

  ]
});

module.exports = webpackConfig;
