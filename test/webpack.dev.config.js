'use strict';
/* eslint-disable */
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.js');
const { OUTPUT_PATH, ROOT_PATH } = require('./paths');
const ESLintPlugin = require('eslint-webpack-plugin');

const PACKAGE_JSON_PATH = path.join(ROOT_PATH, 'package.json');
const PACKAGE_JSON = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));

webpackBaseConfig.mode = 'development';
webpackBaseConfig.devtool = 'inline-source-map';
webpackBaseConfig.entry = ['babel-polyfill', './test/demo/index-local.ts'];

webpackBaseConfig.plugins = [
  new ESLintPlugin({
    context: path.resolve(__dirname, '..'),
    files: '**/*.ts',
    fix: false,
    extensions: '.ts',
    exclude: ['nodes_modules', 'test/demo'],
    eslintPath: require.resolve('eslint'),
    cache: false,
    useEslintrc: true,
    emitWarning: true,
    emitError: true,
    failOnError: false,
    failOnWarning: false,
    quiet: false,
    outputReport: true,
  }),
  new HtmlWebpackPlugin({
    title: PACKAGE_JSON.name,
    base: '/callflow-visualizer/',
    filename: 'index.html',
    template: path.resolve(__dirname, './demo/index.template.html'),
    chunks: ['all']
  }),
  new CopyPlugin({
    patterns: [
      {
        from: PACKAGE_JSON_PATH,
        to: OUTPUT_PATH
      },
    ]
  }),
];

module.exports = webpackBaseConfig;
