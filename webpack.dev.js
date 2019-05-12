const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    clientLogLevel: 'error',
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 3000
  }
});
