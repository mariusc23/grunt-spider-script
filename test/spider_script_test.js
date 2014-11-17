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
