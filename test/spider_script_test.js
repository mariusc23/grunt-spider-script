'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.spider_script = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  compile: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/script.js');
    var expected = grunt.file.read('test/expected/script.js');
    test.equal(actual, expected, 'should compile.');

    test.done();
  },
  compileConcat: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/script-concat.js');
    var expected = grunt.file.read('test/expected/script-concat.js');
    test.equal(actual, expected, 'should concat files.');

    test.done();
  },
  compileExpand: function (test) {
    test.expect(4);

    var actual = grunt.file.read('test/tmp/compile.js');
    var expected = grunt.file.read('test/expected/compile.js');
    test.equal(actual, expected, 'expanded should compile first file.');

    var actualSecond = grunt.file.read('test/tmp/compile-sourcemap.js');
    var expectedSecond = grunt.file.read('test/expected/compile-sourcemap.js');
    test.equal(actualSecond, expectedSecond, 'expanded should compile second file.');

    var actualSourceMap = grunt.file.read('test/tmp/compile.map');
    var expectedSourceMap = grunt.file.read('test/expected/compile.map');
    test.equal(actualSourceMap, expectedSourceMap, 'should include sourcemap.');

    var actualSecondSourceMap = grunt.file.read('test/tmp/compile-sourcemap.map');
    var expectedSecondSourceMap = grunt.file.read('test/expected/compile-sourcemap.map');
    test.equal(actualSecondSourceMap, expectedSecondSourceMap, 'should include second sourcemap.');

    test.done();
  },
  compileBanner: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/tmp/script-banner.js');
    var expected = grunt.file.read('test/expected/script-banner.js');
    test.equal(actual, expected, 'should add banner.');

    test.done();
  },
  compileSourceMap: function (test) {
    test.expect(2);

    var actual = grunt.file.read('test/tmp/script-sourcemap.js');
    var expected = grunt.file.read('test/expected/script-sourcemap.js');
    test.equal(actual, expected, 'should compile with sourcemap url appended.');

    var actualSourceMap = grunt.file.read('test/tmp/script-sourcemap.map');
    var expectedSourceMap = grunt.file.read('test/expected/script-sourcemap.map');
    test.equal(actualSourceMap, expectedSourceMap, 'should include sourcemap.');

    test.done();
  }
};
