const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const config = require('./webpack.shared.config');

module.exports = merge(config, {
  entry: ['webpack/hot/poll?100', './dev/server'],
  watch: true,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  mode: 'development',
  plugins: [
    new StartServerPlugin({
      name: 'index.js',
      nodeArgs: ['--inspect']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: path.join(__dirname, '../dev/build'),
    filename: 'index.js'
  }
})

