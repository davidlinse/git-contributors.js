/**
 * git-contributors module
 * https://github.com/davidlinse/git-contributors.js
 *
 * Copyright (c) 2014 David Linse, contributors
 * Licensed under the MIT license.
 */

var fs    = require('fs'),
    path  = require('path'),
    git   = require('./gitlog'),

    _     = require('lodash');


var __parseOpts = function (opts) {
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


var __repositoryExists = function (opts /*, cb */) {
  'use strict';
  var repo   = path.join(opts.cwd, '.git'),
      exists = true;

  if (!fs.existsSync(opts.cwd) || !fs.existsSync(repo)) {
    exists = false;
  }
  return exists;
};


var __exec = function (err, stdout, cb) {
  'use strict';
  if (err) { return cb(err, null); }

  var list,
      entries = _.compact(stdout.split('\n')),
      total   = _.size(entries);

  list = _.map(_.uniq(entries), function (committer) {

    var parts   = committer.split(' '),
        email   = _.last(parts),
        author  = _.without(parts, email).join(' '),
        commits = _.size(_.filter(entries, function(e) {
          return e.indexOf(email) > -1;
        }));

    return {
      commits: commits,
      name:    author,
      email:   email,
      // TODO: grant 0.1% contribution
      percent: +((commits / total * 100)).toFixed(1)
    };
  });

  list = _.sortBy(list, function (committer) {
    return -committer.commits;
  });

  cb(null, list);
};



var GitContributors = function GitContributors () {};

GitContributors.prototype.list = function (opts, cb) {
  'use strict';

  opts = __parseOpts(opts);

  if (!__repositoryExists(opts /*, cb*/)) {
    return cb(
      new Error('Could not find .git repository at "'+ opts.cwd +'"'), null
    );
  }

  git.log(opts, function (err, stdout) {
    __exec(err, stdout, cb);
  });
};


GitContributors.prototype.parse = function parseOpts (argv, version) {
  'use strict';

  var program = require('commander');

  // TODO: move to 'cli' helper
  //
  program
    .version(version)
    .usage('/path/to/repository')
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
    process.exit(0);
  }

  var target = program.args[0];

  this.list(target, function (err, data) {

    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(data);

    process.exit(0);
  });
};

module.exports.GitContributors = new GitContributors();
