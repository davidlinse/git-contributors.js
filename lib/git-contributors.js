/*!
 * git-contributors (0.1.8) - 2014-05-24
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * git-contributors module
 */

var fs    = require('fs'),
    path  = require('path'),
    git   = require('./gitlog'),
    _     = require('lodash');

var __parseOpts = function(opts) {
  'use strict';

  var options;

  options = {
    timeout: 5000,
    cwd: '.',
    maxBuffer: 5000 * 1024,
    format: 'json'
  };

  if (_.isObject(opts)) {
    options = _.merge(options, opts);
  }
  else if (_.isString(opts)) {
    options.cwd = opts;
  }
  else {
    throw new Error('Something went wrong while building target path.');
  }

  return options;
};

var __repositoryExists = function(dir /*, cb */) {
  'use strict';
  var repo   = path.join(dir, '.git'),
      exists = true;

  if (!fs.existsSync(dir) || !fs.existsSync(repo)) {
    exists = false;
  }
  return exists;
};

var __exec = function(err, stdout, cb) {
  'use strict';
  if (err) { return cb(err, null); }

  var list,
      entries = _.compact(stdout.split('\n')),
      total   = _.size(entries);

  list = _.map(_.uniq(entries), function(committer) {

    var parts   = committer.split(' '),
        email   = _.last(parts),
        author  = _.without(parts, email).join(' '),
        commits = _.size(_.filter(entries, function(e) {
          return e.indexOf(author) > -1 && e.indexOf(email) > -1;
        })),
        percentage = (commits / total * 100);

    return {
      commits: commits,
      name:    author,
      email:   email,
      percent: parseFloat(Math.max(0.1, percentage).toFixed(1), 10)
    };
  });

  list = _.sortBy(list, function(committer) {
    return -committer.commits;
  });

  cb(null, list);
};

var __format = function(data, program) {
  'use strict';

  if (program.markdown || program.format === 'markdown') {
    data = require('../lib/markdown-reporter').format(data);
  }

  return data;
};

//--

var GitContributors = function GitContributors () {};

GitContributors.prototype.list = function(opts, cb) {
  'use strict';

  opts = __parseOpts(opts);

  var _callback = function(err, stdout) {
    __exec(err, stdout, function(err, data) {
      cb(err, __format(data, opts));
    });
  };

  if (!__repositoryExists(opts.cwd /*, cb*/)) {
    return cb(
      new Error('Could not find .git repository at "' + opts.cwd + '"'), null
    );
  }

  git.log(opts, _callback);
};

GitContributors.prototype.parse = function parseOpts (argv, version) {
  'use strict';

  var program = require('./_cli').parse(argv, version);
  var target  = program.args[0];

  this.list(target, function(err, data) {

    if (err) {
      console.log(err);
      process.exit(1);
    }

    data = __format(data, program);

    console.log(data);
    process.exit(0);
  });
};

module.exports.GitContributors = new GitContributors();
