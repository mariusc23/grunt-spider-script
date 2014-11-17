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
        options: {
          sourcemap: false
        },
        files: {
          'test/tmp/script.js': ['test/fixtures/script.spider']
        }
      },
      compileError: { // not run, here to debug
        files: {
          'test/tmp/script-error.js': ['test/fixtures/error.spider']
        }
      },
      compileBanner: {
        options: {
          banner: '// Banner',
          sourcemap: false
        },
        files: {
          'test/tmp/script-banner.js': ['test/fixtures/script.spider']
        }
      },
      compileSourceMap: {
        options: {
          sourcemap: true
        },
        files: {
          'test/tmp/script-sourcemap.js': ['test/fixtures/sourcemap.spider']
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
  grunt.registerTask('test', ['clean', 'spider_script:compile', 'spider_script:compileBanner', 'spider_script:compileSourceMap', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
