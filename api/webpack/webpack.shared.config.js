const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'server.js',
  // },
};
