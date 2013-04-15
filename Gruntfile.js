/*global module:false*/
module.exports = function(grunt) {

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
        // enforcing
        bitwise: false,
        camelcase: false,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        // indent: 4,
        latedef: false,
        newcap: false,
        noarg: true,
        noempty: true,
        nonew: true,
        plusplus: true,
        // quotmark: true, // true|single|double
        regexp: true,
        undef: false,   // enable for later code cleanup
        unused: false,  // enable for later code cleanup
        strict: false,
        trailing: true,
        maxparams: 4,
        maxdepth: 2,
        maxstatements: 35,
        maxcomplexity: 3,
        maxlen: 135,

        // relaxing

        asi: false,
        boss: true,
        debug: false,
        eqnull: true,
        es5: true,
        esnext: false,
        evil: false,
        expr: true,
        funcscope: true,
        globalstrict: false,
        iterator: false,
        lastsemic: false,
        laxbreak: false,
        laxcomma: false,
        loopfunc: false,
        multistr: true,
        onecase: false,
        proto: false,
        regexdash: false,
        scripturl: false,
        smarttabs: false,
        shadow: false,
        sub: false,
        supernew: false,
        validthis: false,
        white: false,       // enable for later code cleanup

        // environment

        browser: true,
        couch: false,
        devel: true,
        dojo: false,
        jquery: true,
        mootools: false,
        node: true,
        nonstandard: true,
        prototypejs: false,
        rhino: false,
        worker: false,
        wsh: false,
        yui: false,

        globals: {
          jQuery: true,
          window: true,
          console: true,
          underscore: true,
          Backbone: true,
          "$": true,
          _: true,

          // requirejs global
          define: true,
          require: true,

          // node and test globals
          module: true,
          exports: true,
          describe: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    exec: {

      test: {
          command: "mocha test/",
          stdout: true
      },

      // code analysis
      plato: {
          command: "./node_modules/.bin/plato -d reports/plato/",
          stdout: true
      },
      plato_open: {
          command: "open reports/plato/index.html",
          stdout: true
      },

      // code coverage
      cov_pre: {
          command: "rm -rf lib-cov"
      },
      cov_run: {
          command: "jscoverage --verbose lib lib-cov"
      },
      cov_test: {
          command: "MOCHA_COV=1 mocha test/test.*.js -R html-cov > reports/coverage/index.html",
          stdout: true
      },
      cov_open: {
          command: "open reports/coverage/index.html",
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

  // generate coverage (html) report using 'jscover' module
  grunt.registerTask('cov', [ 'exec:cov_pre',
                              'exec:cov_run',
                              'exec:cov_test',
                              'exec:cov_open']);

};
