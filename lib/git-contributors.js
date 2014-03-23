'use strict';

var fs    = require('fs'),
    path  = require('path'),
    exec  = require('child_process').exec,

    _     = require('lodash');


var __exec = function (err, stdout, cb) {

    if (err) { return cb(err, null); }

    var list,
        entries = _.compact(stdout.split('\n')),
        total   = _.size(entries);

    list = _.map(_.uniq(entries), function (committer) {

        var parts   = committer.split(' '),
            email   = _.last(parts),
            author  = _.without(parts, email).join(' '),
            commits = _.size(_.filter(entries, function(e) { return e.indexOf(author) > -1; }));

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


var __parseOpts = function (opts) {

    var defOpts = {
            path: '.',
            format: ''
        };

    var options = _.merge({}, defOpts);

    if (_.isObject(opts)) {
        options = _.merge(options, opts);
    }
    else if (_.isString(opts)) {
        options.url = opts;
    }

    return options;
};



var GitContributors = function GitContributors () {
};


GitContributors.prototype.list = function (git_project, cb) {

        var shortlog,
            opts = { timeout: 5000, cwd: '.', maxBuffer: 5000 * 1024 },
            git  = path.join(git_project, '.git');


        if (!fs.existsSync(git_project) || !fs.existsSync(git)) {
            return cb(new Error('Could not find .git repository at "' + git_project + '"'), null);
        }

        process.chdir(git_project);

        shortlog = exec('git log --pretty="%an %ae"', opts, function (err, stdout) {
            __exec(err, stdout, cb);
        });
    };



module.exports.GitContributors = new GitContributors();
