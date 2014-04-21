/* jshint indent:2 */

/*
 * gitlog module
 * https://github.com/davidlinse/git-contributors.js
 *
 * Copyright (c) 2014 David Linse, contributors
 * Licensed under the MIT license.
 */


'use strict';

var exec = require('child_process').exec;

module.exports = {

  log: function(opts, cb) {

    process.chdir(opts.path);

    exec('git log --pretty="%an %ae"', opts, function(err, stdout) {
      cb(err, stdout);
    });

  }
};
