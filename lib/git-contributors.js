/*!
 * git-contributors (0.2.3) - 2015-06-14
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * git-contributors module
 */

var fs    = require('fs'),
    path  = require('path'),
    git   = require('../lib/gitlog'),
    _     = require('lodash');
var Q     = require('q');

var verifyRepositoryExists = function() {
  'use strict';

  var deferred = Q.defer();
  var repo     = path.join(program.cwd, '.git');
  var ok       = fs.existsSync(program.cwd) && fs.existsSync(repo);

  if (ok) { deferred.resolve(program); }
  else {
    deferred.reject(
      new Error('Could not find .git repository at "'+ program.cwd +'"')
    );
  }

  return deferred.promise;
};

var processLog = function(stdout) {
  'use strict';

  var deferred = Q.defer();

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

  deferred.resolve(list);

  return deferred.promise;
};

var format = function(data) {
  'use strict';

  var deferred = Q.defer();
  var stringify = program.markdown === true && program.json === true;

  if (program.markdown) {
    data = require('../lib/markdown-reporter').format(data, program);
  }

  if (stringify) {
    data = _.trim(data, '\n').split('\n');
  }

  if (program.json === true) {
    data = JSON.stringify(data);
  }

  deferred.resolve(data);

  return deferred.promise;
};

var filter = function(data) {
  'use strict';

  var deferred = Q.defer();

  var stripEmail = function(el) {
    return _.omit(el, 'email');
  };

  if (program.email === false) {
    data = _.map(data, stripEmail);
  }

  deferred.resolve(data);

  return deferred.promise;
};

//--

var program = {
  timeout: 5000,
  cwd: '.',
  maxBuffer: 25000 * 1024
};


var GitContributors = function GitContributors () {};

GitContributors.prototype.list = function(opts, cb) {
  'use strict';

  program.markdown = null;
  program.json = null;

  if (_.isString(opts)) {
    program.cwd = opts;
  }
  else {
    program = _.merge(program, opts);
  }

  Q()
  .then(verifyRepositoryExists)
  .then(git.log)
  .then(processLog)
  .then(filter)
  .then(format)
  .done(function(result) {
    cb(null, result);
  }, function(err) {
    cb(err, null);
  });
};

module.exports.GitContributors = new GitContributors();
