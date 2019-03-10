const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.shared.config');

module.exports = merge(config, {
  entry: ['./src/index.ts'],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
  },
  watch: false,
  mode: 'production',
  externals: [nodeExternals()],
  plugins: [new webpack.NamedModulesPlugin(), ],
  optimization: {
    minimize: false
  },
})
