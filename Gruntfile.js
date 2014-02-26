/* jshint maxlen: 124, indent: 4 */
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
            files: ['Gruntfile.js', 'lib/*.js', 'test/test.*.js'],
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
            }
        },
        clean: {
            dist: ['dist/', 'bin/', 'tmp/']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', []);

    // coverage report
    grunt.registerTask('plato', 'exec:plato');

    // execute tests
    grunt.registerTask('test', 'exec:test');

    // generate coverage (html) report using 'jscover' module
    grunt.registerTask('cov', ['exec:cov_pre', 'exec:cov_run', 'exec:cov_test']);

    // clean build
    grunt.registerTask('pre', ['clean', 'default', 'bin']);

    //
    grunt.registerTask('bin', function () {

        var shebang = grunt.file.read('fixtures/binary-header');

        var footer  = grunt.file.read('fixtures/binary-footer');

        var banner  = grunt.config.get('banner');

        var opts = {
            process: function(content) {
                return shebang + '\n' + banner + content + '\n\n' + footer;
            }
        };

        var src  = grunt.config.process('lib/<%= pkg.name %>.js');
        var dest = grunt.config.process('bin/<%= pkg.name %>');

        grunt.file.copy(src, dest, opts);

        require('fs').chmodSync(dest, '755');
    });

    //
    grunt.registerTask('build', ['clean', 'default', 'test', 'bin']);

    //
    grunt.registerTask('release', ['cov', 'build', 'plato']);
};