/*!
 * git-contributors (0.1.8) - 2014-05-24
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * gitlog module
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
