/* jshint maxlen: 124 */
/* global module: false */

module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/*!\n * <%= pkg.title || pkg.name %> (<%= pkg.version %>) - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' <%= pkg.repository.url ? "* " + pkg.repository.url + "\\n" : "* " %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' License: <%= pkg.license %>\n */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>'],
        dest: 'dist/<%= pkg.name %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        compress: true
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>-min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    exec: {

      test: {
          command: 'mocha test/',
          stdout: true
      },

      // code analysis
      plato: {
          command: './node_modules/.bin/plato -d reports/plato/',
          stdout: true
      },
      plato_open: {
          command: 'open reports/plato/index.html',
          stdout: true
      },

      // code coverage
      cov_pre: {
          command: 'rm -rf lib-cov'
      },
      cov_run: {
          command: 'jscoverage --verbose lib lib-cov'
      },
      cov_test: {
          command: 'MOCHA_COV=1 mocha test/test.*.js -R html-cov > reports/coverage/index.html',
          stdout: true
      },
      cov_open: {
          command: 'open reports/coverage/index.html',
          stdout: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('plato', 'exec:plato');

  grunt.registerTask('test', 'exec:test');

  // generate coverage (html) report using 'jscover' module
  grunt.registerTask('cov', [ 'exec:cov_pre',
                              'exec:cov_run',
                              'exec:cov_test',
                              'exec:cov_open']);

};
