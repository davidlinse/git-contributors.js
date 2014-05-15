/**
 * gitlog module
 * https://github.com/davidlinse/git-contributors.js
 *
 * Copyright (c) 2014 David Linse, contributors
 * Licensed under the MIT license.
 */

/* jshint indent:2 */

var exec = require('child_process').exec;

var git = {

  log: function(opts, cb) {
    'use strict';

    process.chdir(opts.cwd);

    exec('git log --pretty="%an %ae"', opts, function(err, stdout) {
      cb(err, stdout);
    });

  }
};

module.exports = git;
