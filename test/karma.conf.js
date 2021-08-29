'use strict';
let debug = !!process.env.debug;
let coveragePreprocessors = debug ? [] : ['karma-coverage-istanbul-instrumenter'];

if (debug) {
  console.log('Debug enabled, skipping coverage');
} else {
  console.log('Coverage is enabled, debugging not possible');
}

module.exports = function (config) {
  // const testFiles = 'test/unit/**/*.test.ts';
  // const testFixtures = 'test/unit/fixture/*.ts';
  // const testHelpers = 'test/test-helper/*.ts';
  const srcFiles = 'src/**/*.ts';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-typescript',
      'karma-spec-reporter',
      'karma-babel-preprocessor',

      // fallback: resolve any karma- plugins
      'karma-*',
    ],

    // frameworks to use
    frameworks: ['jasmine', 'karma-typescript'],

    mime: {
      'text/x-typescript': ['ts'],
    },


    // list of files / patterns to load in the browser
    files: [
      // { pattern: testFiles },
      // { pattern: testFixtures },
      // { pattern: testHelpers },
      { pattern: srcFiles },
    ],

    // list of files / patterns to exclude
    exclude: [
      'src/**/*local*.ts',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [testFiles]: ['karma-typescript'],
      [testFixtures]: ['karma-typescript'],
      [testHelpers]: ['karma-typescript'],
      [srcFiles]: ['karma-typescript', ...coveragePreprocessors],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-experimental-web-platform-features'],
      },
    },

    coverageIstanbulInstrumenter: {
      esModules: true,
      produceSourceMap: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: 'coverage',
      thresholds: {
        global: {
          statements: 0, //90
          lines: 0, //90
          branches: 0, //75
          functions: 0, //90
        },
        file: {
          branches: 0, //75
          functions: 0, //75
          lines: 0 //75
        },
      },
    },

    // Karma typescript configuration
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.test.json',
      coverageOptions: {
        instrumentation: false,
      },
      stopOnFailure: false,
      bundlerOptions: {
        acornOptions: {
          ecmaVersion: 2020,
        },
        sourceMap: true,
        transforms: [
          require('karma-typescript-es6-transform')({
            presets: [
              // ['@babel/preset-env'],
              // ['@babel/preset-typescript'],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-spread',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              '@babel/plugin-proposal-optional-chaining'
            ],
          })],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,
  });
};
