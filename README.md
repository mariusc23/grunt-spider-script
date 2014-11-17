# grunt-spider-script v0.0.2

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

#### options.sourcemaps
Type: `Boolean`  
Default: `true`    

Generates sourcemaps next to compiled javascript files.

#### options.strict
Type: `Boolean`  
Default: `true`    

Determines if "use strict" should be enforced.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  spider_script: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
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
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2014-11-17   v0.0.2   Add support for source maps.  
 * 2014-11-17   v0.0.1   Initial release.  

## License
Copyright (c) 2014 Marius Craciunoiu. Licensed under the MIT license.
