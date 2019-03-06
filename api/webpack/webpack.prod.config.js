const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.shared.config');

module.exports = merge(config, {
  entry: ['./src/index.ts'],
  watch: false,
})



