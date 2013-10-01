/* jshint maxlen: 124, indent: 4 */
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
          ' License: <%= pkg.license %>\n */\n\n',
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
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
        watch: {
            files: ['lib/*.js', 'test/test.*.js'],
            tasks: ['jshint', 'exec:test']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            //    gruntfile: {
            //      src: 'Gruntfile.js'
            //    },
            lib: {
                src: 'lib/*.js'
            },
            test: {
                src: 'test/test.*.js'
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

    // coverage report
    grunt.registerTask('plato', 'exec:plato');

    grunt.registerTask('test', 'exec:test');

    // generate coverage (html) report using 'jscover' module
    grunt.registerTask('cov', ['exec:cov_pre', 'exec:cov_run', 'exec:cov_test', 'exec:cov_open']);

    grunt.registerTask('bin', function () {

        var shebang = grunt.file.read('fixtures/node-shebang');

        var footer  = grunt.file.read('fixtures/binary-footer.js');

        var opts = {
            process: function(content) {
                return shebang + '\n' + content + '\n\n' + footer;
            }
        };

        var src = grunt.config.process('dist/<%= pkg.name %>');
        var dest = grunt.config.process('bin/<%= pkg.name %>').replace('.js', '');

        grunt.file.copy(src, dest, opts);
    });
};
