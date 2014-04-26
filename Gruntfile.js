/* jshint maxlen: 87 */
/* global module: false */

module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/*!\n * <%= pkg.title || pkg.name %> (<%= pkg.version %>) - '+
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' <%= pkg.repository.url ? "* " + pkg.repository.url + "\\n" : "* " %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' License: <%= pkg.license %>\n */\n\n',

    watch: {
      files: ['Gruntfile.js', 'lib/*.js', 'test/test.*.js', 'tasks/*'],
      tasks: ['jshint', 'exec:test']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      lib: {
        src: 'lib/*.js'
      },
      test: {
        src: 'test/test.*.js'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      tasks: {
        src: 'tasks/*.js'
      }
    },
    clean: {
      dist: ['dist/', 'bin/', 'tmp/', 'lib-cov'],
      cov: ['lib-cov/']
    },
    exec: {
      test: {
        command: 'mocha test/test.*.js',
        stdout: true
      },
      // code analysis
      plato: {
        command: './node_modules/.bin/plato -l .jshintrc -d reports/plato/ lib/*.js',
        stdout: true
      },
      cov_run: {
        command: 'jscoverage --verbose lib lib-cov'
      },
      /*jshint maxlen: 127 */
      cov_test: {
        command: 'MOCHA_COV=1 mocha test/test.*.js -R html-cov > reports/coverage/index.html',
      },
      cov_report: {
        command: 'node_modules/.bin/istanbul cover '+
                 '--dir reports/istanbul '+
                 'node_modules/.bin/_mocha -- '+
                 '--ui bdd test/test.*.js '+
                 '-R spec test/test.*.js',
        stdout: true
      },
      cov_open: {
        command: 'open reports/coverage/index.html',
        stdout: true
      }
    },
    changelog: {
      options: {
        repository: '<%= pkg.repository.url %>',
        from: '<%= changelog.from %>',
        to:   '<%= changelog.to %>',
        dest: 'CHANGELOG.md',
        file: 'CHANGELOG.m'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  // load external tasks
  grunt.loadTasks('tasks/');

  // Default task.
  grunt.registerTask('default', []);

  // coverage report
  grunt.registerTask('plato', 'exec:plato');

  // execute tests
  grunt.registerTask('test', 'exec:test');

  // generate coverage (html) report using 'jscover' module
  grunt.registerTask('cov', ['clean:cov', 'exec:cov_run', 'exec:cov_test']);

  // clean build
  grunt.registerTask('pre', ['clean', 'default', 'bin']);

  //
  grunt.registerTask('build', ['clean', 'default', 'test', 'generate-binary']);

  //
  grunt.registerTask('release', ['cov', 'build', 'plato', 'update-changelog']);

};
