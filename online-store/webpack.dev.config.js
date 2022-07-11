const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    watchFiles: ['src/*.html'],
    hot: true,
    port: 'auto',
    client: {
      overlay: true,
    },
  },
};
