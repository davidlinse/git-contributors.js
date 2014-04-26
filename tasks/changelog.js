/**

  Generate or update the CHANGELOG.md utilizing "grunt-conventional-changelog".
  You can run pass the NEEDED arguments in the following format:

  $ grunt generate-changelog --from=SHA1|tag --to=SHA1|tag

  alternatively you can use the "short" form:

  $ grunt generate-changelog:<from>:<to>

  @author     David Linse <davidlinse@gmail.com>
  @version    0.1.0
  @license    MIT

  */

module.exports = function(grunt) {

  'use strict';

  var _verifyOrUpdateArgs = function _verifyOrUpdateArgs (opts) {

    if (opts.from === null) {
      opts.from = 'list';
      grunt.log.warn('No --from param given, using default. (%s)', opts.from);
    }

    if (opts.to === null) {
      opts.to   = 'HEAD';
      grunt.log.warn('No --to param given, using default. (%s)', opts.to);
    }

    return opts;
  };


  grunt.registerTask('cl', 'Generate or updates CHANGELOG.md file',
  function(from, to) {

    grunt.config.requires('changelog');

    var opts = {
      from: from,
      to: to
    };

    opts = _verifyOrUpdateArgs(opts);

    grunt.config.set('changelog.from', opts.from);
    grunt.config.set('changelog.to', opts.to);

    grunt.task.run('changelog');
  });
};
