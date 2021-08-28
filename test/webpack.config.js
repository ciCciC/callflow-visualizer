'use strict';
/* eslint-disable */
const { OUTPUT_PATH, ROOT_PATH } = require('./paths');
const path = require('path');

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve(ROOT_PATH, './node_modules'),
    ]
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
