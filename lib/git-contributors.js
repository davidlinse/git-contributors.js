
var os    = require('os'),
    fs    = require('fs'),
    path  = require('path'),
    exec  = require('child_process').exec,

    _     = require('underscore');


exports.GitContributors = {

   list: function (git_project, cb) {

        var shortlog,

            opts = { timeout: 5000, cwd: '.', maxBuffer: 5000 * 1024 },
            git  = path.join(git_project, '.git');


        if (!fs.existsSync(git_project) || !fs.existsSync(git)) {
            return cb(new Error('Could not find .git repository at "'+git_project+'"'), null);
        }


        process.chdir(git_project);

        shortlog = exec('git log --pretty=%an', opts, function (err, stdout, stderr) {

            if (err) { return cb(err, null); }

            var list,
                entries = _.compact(stdout.split('\n')),
                total   = _.size(entries);

            list = _.map(_.uniq(entries), function (committer) {

                var commits = _.size(_.filter(entries, function(e) { return e === committer; }));

                return {
                    commits: commits,
                    name: committer,
                    percent: +(commits / total * 100).toFixed(1)
                };
            });

            list = _.sortBy(list, function (committer) {
                return -committer.commits;
            });

            cb(null, list);
        });
    }
};
