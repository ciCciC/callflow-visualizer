'use strict';
/* eslint-disable */
const webpackBaseConfig = require('./webpack.config.js');

webpackBaseConfig.mode = 'development';
webpackBaseConfig.devtool = 'inline-source-map';

delete webpackBaseConfig.output.filename;
delete webpackBaseConfig.entry;

webpackBaseConfig.module.rules.push(
  {
    test: /\.ts$/,
    exclude: [
      /\.test\.ts$/,
      /test-helper/,
    ],
    enforce: 'post',
    use: {
      loader: 'istanbul-instrumenter-loader',
      options: { esModules: true },
    },
  },
);

module.exports = webpackBaseConfig;
