'use strict';

var fs    = require('fs'),
    path  = require('path'),
    git   = require('./gitlog'),

    _     = require('lodash');


var __parseOpts = function (opts) {

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
    throw {
      type: 'Error',
      message: 'Something went wrong while building target path.'
    };
  }

  return options;
};


var __repositoryExists = function (opts /*, cb */) {

  var repo   = path.join(opts.cwd, '.git'),
      exists = true;

  if (!fs.existsSync(opts.cwd) || !fs.existsSync(repo)) {
    exists = false;
  }
  return exists;
};


var __exec = function (err, stdout, cb) {

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
      percent: +((commits / total * 100)).toFixed(1)
    };
  });

  list = _.sortBy(list, function (committer) {
    return -committer.commits;
  });

  cb(null, list);
};



var GitContributors = function GitContributors () {};

GitContributors.prototype.list = function (git_project, cb) {

  var opts = __parseOpts(git_project);

  if (!__repositoryExists(opts /*, cb*/)) {
    return cb(
      new Error('Could not find .git repository at "'+ opts.cwd +'"'), null
    );
  }

  git.log(opts, function (err, stdout) {
    __exec(err, stdout, cb);
  });
};


module.exports.GitContributors = new GitContributors();
