'use strict';

module.exports.GitContributors = process.env.MOCHA_COV ?
    require('./lib-cov/git-contributors').GitContributors :
    require('./lib/git-contributors').GitContributors;

if (!module.parent) {

    var target = process.argv.length > 2 ? process.argv[3] : '.';

    var GC = module.exports.GitContributors;

    GC.list(target, function (err, data) {

        if (err) { throw err; }

        console.log(data);
    });
}
