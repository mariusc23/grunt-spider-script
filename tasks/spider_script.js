/*
 * grunt-spider-script
 * https://github.com/mariusc23/grunt-spider-script
 *
 * Copyright (c) 2014 Marius Craciunoiu
 * Licensed under the MIT license.
 */

'use strict';
var traceur = require('traceur');
var spider = require('spider-script');
var numCPUs = require('os').cpus().length || 1;
var async = require('async');
var chalk = require('chalk');

module.exports = function (grunt) {
  grunt.registerMultiTask('spider_script', 'Compile spider script into javascript.', function () {
    var cb = this.async();
    var options = this.options({
      sourcemap: true,
      strict: true,
      separator: grunt.util.linefeed,
      target: 'ES5'
    });

    options.separator = grunt.util.normalizelf(options.separator);

    async.eachLimit(this.files, numCPUs, function (file, next) {
      var src = file.src[0];

      if (typeof src !== 'string') {
        src = file.orig.src[0];
      }

      if (file.src.length > 1) {
        options.sourcemap = false; // disable if concat
      }

      // Concat files if necessary
      var contents = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(options.separator);

      // Make sure grunt creates the destination folders if they don't exist
      if (!grunt.file.exists(file.dest)) {
        grunt.file.write(file.dest, '');
      }

      var sourceMapDest = file.dest.replace(file.orig && file.orig.ext ? file.orig.ext : '.js', '.map');

      var out = spider.compile({
        text: contents,
        fileName: src,
        target: options.target,
        generateSourceMap: options.sourcemap,
        useStrict: options.strict
      });

      if (out.errors.length) {
        grunt.warn(spider.formatErrors(src, contents, out.errors));
      }

      grunt.file.write(file.dest, out.result);
      grunt.verbose.writeln('Compiled file ' + chalk.cyan(file.dest) + ' created.');

      if (options.sourcemap) {
        grunt.file.write(sourceMapDest, out.sourceMap);
        grunt.verbose.writeln('Source map ' + chalk.cyan(sourceMapDest) + ' created.');
      }

      next();
    }.bind(this), cb);

  });
};
