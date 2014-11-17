/*
 * grunt-spider-script
 * https://github.com/mariusc23/grunt-spider-script
 *
 * Copyright (c) 2014 Marius Craciunoiu
 * Licensed under the MIT license.
 */

'use strict';
var spider = require('spider-script');
var path = require('path');
var dargs = require('dargs');
var numCPUs = require('os').cpus().length || 1;
var async = require('async');
var chalk = require('chalk');

module.exports = function (grunt) {
  grunt.registerMultiTask('spider_script', 'Compile spider script into javascript.', function () {
    var cb = this.async();
    var options = this.options();
    var banner;
    var passedArgs;

    // Unset banner option if set
    if (options.banner) {
      banner = options.banner;
      delete options.banner;
    }

    passedArgs = dargs(options, ['bundleExec']);

    async.eachLimit(this.files, numCPUs, function (file, next) {
      var src = file.src[0];
      var errors = [];
      var sourceMapDest = file.dest.replace('.js', '.map');

      if (typeof src !== 'string') {
        src = file.orig.src[0];
      }

      if (!grunt.file.exists(src)) {
        grunt.log.warn('Source file "' + src + '" not found.');
        return next();
      }

      // Make sure grunt creates the destination folders if they don't exist
      if (!grunt.file.exists(file.dest)) {
        grunt.file.write(file.dest, '');
      }

      // Default some options to true
      options.sourcemap = options.sourcemap !== false;
      options.strict = options.strict !== false;

      if (options.sourcemap) {
        var result = spider.compile(grunt.file.read(src), false, errors, src, sourceMapDest, true, options.strict);
      } else {
        var result = {
          code: spider.compile(grunt.file.read(src), false, errors, false, sourceMapDest, true, options.strict)
        };
      };

      if (errors.length) {
        for (var i = 0; i < errors.length; i++) {
          var startLoc = (errors[i].loc && errors[i].loc.start) ? ('Line: ' + errors[i].loc.start.line + ', Column: ' + errors[i].loc.start.column) : '';
          var endLoc = (errors[i].loc && errors[i].loc.end) ? ('Line: ' + errors[i].loc.end.line + ', Column: ' + errors[i].loc.end.column) : '';
          grunt.warn([errors[i].type + ':' , errors[i].message, 'at', src, 'on', startLoc, endLoc].join(' '));
        };
      };

      grunt.file.write(file.dest, result.code);
      grunt.verbose.writeln('Compiled file ' + chalk.cyan(file.dest) + ' created.');

      if (options.sourcemap !== false) {
        grunt.file.write(sourceMapDest, result.map);
        grunt.verbose.writeln('Source map ' + chalk.cyan(sourceMapDest) + ' created.');
      };

      if (banner) {
        grunt.verbose.writeln('Writing banner for ' + chalk.cyan(file.dest));
        grunt.file.write(file.dest, banner + grunt.util.linefeed + grunt.file.read(file.dest));
      };

      next();
    }, cb);

  });
};
