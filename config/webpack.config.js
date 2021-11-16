const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname);
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, '../src');
const BUILD_DIRECTORY = path.join(ROOT_DIRECTORY, '../build');

const config = {
  entry: [path.resolve(SRC_DIRECTORY, 'index-web.jsx')],
  output: {
    path: path.resolve(BUILD_DIRECTORY),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
    alias: {
      '@': SRC_DIRECTORY
    },
    extensions: ['.js', '.jsx']
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {
              runtime: 'automatic'
            }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[sha512:hash:base64:7].[ext]'
          }
        }
      }

    ]
  }
};

module.exports = config;
