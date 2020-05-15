const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts',
          },
        },
      },
    ],
  },
};
