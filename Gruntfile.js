/*
 * grunt-spider-script
 * https://github.com/mariusc23/grunt-spider-script
 *
 * Copyright (c) 2014 Marius Craciunoiu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp']
    },

    // Configuration to be run (and then tested).
    spider_script: {
      compile: {
        files: {
          'test/tmp/script.js': 'test/fixtures/compile.spider'
        }
      },

      compileES6: {
        options: {
          target: 'ES6'
        },
        files: {
          'test/tmp/ecma-script-6.js': 'test/fixtures/compile.spider'
        }
      },

      compileUnstrict: {
        options: {
          target: 'ES6',
          strict: false
        },
        files: {
          'test/tmp/unstrict.js': 'test/fixtures/compile.spider'
        }
      },

      compileConcat: {
        files: {
          'test/tmp/script-concat.js': ['test/fixtures/compile.spider', 'test/fixtures/compile-sourcemap.spider']
        }
      },

      compileExpand: {
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['*.spider'],
          dest: 'test/tmp/',
          ext: '.js'
        }]
      },

      // compileError: { // not run, here to debug
      //   files: {
      //     'test/tmp/script-error.js': ['test/fixtures/compile-error.spiderz']
      //   }
      // },

      compileSourceMap: {
        options: {
          sourcemap: true
        },
        files: {
          'test/tmp/script-sourcemap.js': ['test/fixtures/compile-sourcemap.spider']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'spider_script', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
