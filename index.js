
module.exports = process.env.MOCHA_COV ?
    require('./lib-cov/git-contributors').GitContributors :
    require('./lib/git-contributors').GitContributors;
