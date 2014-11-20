# grunt-spider-script v0.0.5

> Compile spider script into javascript.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-spider-script --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-spider-script');
```

## The "spider_script" task

### Overview
In your project's Gruntfile, add a section named `spider_script` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  spider_script: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.banner
Type: `String`  

Prepend the specified string to the output file. Useful for licensing information.

#### options.sourcemap
Type: `Boolean, String`  
Default: `true`    

Generates sourcemaps next to compiled javascript files. If a string is provided, it will be used as the source file to generate the sourcemap from.

#### options.strict
Type: `Boolean`  
Default: `true`    

Determines if "use strict" should be enforced.

#### options.separator
Type: `String`  
Default: grunt linefeed    

Concatenated files will be joined with this string.

### Usage Examples

#### Single File

```js
grunt.initConfig({
  spider_script: {
    files: {
      'js/script.js': 'spider/script.spider'
    }
  }
})
```

#### Concatenate Files

Note: sourcemaps will be disabled.

```js
grunt.initConfig({
  spider_script: {
    files: {
      'js/script.js': ['spider/script.spider', 'spider/script2.spider']
    }
  }
})
```

#### Multiple files

```js
grunt.initConfig({
  spider_script: {
    options: {},
    files: [{
      expand: true,
      cwd: 'spiders',
      src: ['*.spider'],
      dest: 'js/',
      ext: '.js'
    }]
  }
})
```

#### Banner
You can add a banner by specifying it in the options.

```js
grunt.initConfig({
  spider_script: {
    options: {
      banner: '// JavaScript comment here'
    },
    files: [{
      expand: true,
      cwd: 'spider',
      src: ['*.spider'],
      dest: '../js',
      ext: '.spider'
    }]
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2014-11-19   v0.0.5   Update spider-script. Allow custom sourcemap source file.
 * 2014-11-17   v0.0.4   Make spider-script dependency less strict
 * 2014-11-17   v0.0.3   Support concatenation and file expanding
 * 2014-11-17   v0.0.2   Add support for source maps and use strict mode
 * 2014-11-17   v0.0.1   Initial release.  

## License
Copyright (c) 2014 Marius Craciunoiu. Licensed under the MIT license.
