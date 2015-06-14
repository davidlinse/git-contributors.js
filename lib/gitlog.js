/*!
 * git-contributors (0.2.3) - 2015-06-14
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * gitlog module
 */

/* jshint indent:2 */

var Q    = require('q');
var exec = require('child_process').exec;

var git = {

  log: function log (opts) {
    'use strict';

    var deferred = Q.defer();

    process.chdir(opts.cwd);

    exec('git log --pretty="%an %ae"', opts, function(err, stdout) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(stdout);
      }
    });

    return deferred.promise;
  }
};

module.exports = git;
