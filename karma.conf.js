/* global module */
module.exports = function (config) {
  'use strict'
  config.set({
    autoWatch: true,
    singleRun: false,

    frameworks: ['jspm', 'jasmine'],

    jspm: {
      config: 'www/config.js',
      loadFiles: [
        'www/**/*.test.js'
      ],
      serveFiles: [
        'www/**/!(*test).js'
      ]
    },

    preprocessors: {
      'www/**/!(*test).js': ['babel', 'sourcemap', 'coverage']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        blacklist: ['useStrict']
      },
      sourceFileName: function (file) {
        return file.originalPath
      }
    },

    coverageReporter: {
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        'www/**/*.js': 'isparta'
      },

      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          dir: 'coverage/',
        }
      ]
    },

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js'
    ],

    proxies: {
      '/www/': '/base/www/',
      '/jspm_packages/': '/www/jspm_packages/'
    },

    browsers: ['Chrome'],

    reporters: ['progress', 'coverage']
  })
}
