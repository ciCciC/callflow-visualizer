'use strict';
/* eslint-disable */
const path = require('path');
const fs = require('fs');
const os = require('os');
const glob = require('glob');

const webpackTestConfig = require('./test/webpack.test.config.js');

const bundlePath = path.join(os.tmpdir(), `webpack.test.bundle.${(new Date()).getTime()}.js`);

module.exports = (config) => {
  const requires = [];
  const testFiles = glob.sync('test/**/*.test.ts');

  requires.push(...testFiles.map((file) => `require('${path.resolve(file)
    .replace(/\\/g, '\\\\')
    .replace(/.ts$/, '')}');`));
  fs.writeFileSync(bundlePath, requires.join('\n'));

  const reporters = ['coverage-istanbul', 'brief'];
  if (config.coverage === false) {
    reporters.shift();
  }

  config.set({
    basePath: '',
    colors: true,
    concurrency: 1,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    frameworks: ['jasmine'],
    reporters,

    files: [
      path.resolve('node_modules', 'regenerator-runtime', 'runtime.js'),
      path.resolve('node_modules', '@webcomponents', 'webcomponentsjs', 'custom-elements-es5-adapter.js'),
      bundlePath,
    ],
    preprocessors: {
      [bundlePath]: ['webpack'],
    },

    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },

    webpack: webpackTestConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },

    briefReporter: {
      earlyErrorReport: true,
      omitExternalStackFrames: true,
      renderOnRunCompleteOnly: true,
    },

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: path.resolve('.', 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 90,
          lines: 90,
          branches: 75,
          functions: 90,
        },
        each: {
          branches: 75,
          functions: 75,
          lines: 75
        },
      },
    },
  });
};
