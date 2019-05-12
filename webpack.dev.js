const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    clientLogLevel: 'error',
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    port: 3000
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
