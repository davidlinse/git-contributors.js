'use strict';

module.exports.GitContributors = process.env.MOCHA_COV ?
  require('./lib-cov/git-contributors').GitContributors :
  require('./lib/git-contributors').GitContributors;


if (!module.parent) {

  var program = require('commander');
  var fs      = require('fs');
  var version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;

  program
    .version(version)
    .on('--help',
      function () {
        console.log('  Usage:');
        console.log('');
        console.log('    $ git-contributors `pwd`');
        console.log('    $ git-contributors </path/to/repository>');
        console.log('');
      })
    .parse(process.argv);


  if (!program.args.length) {
    program.help();
    process.exit(0);
  }

  var target = program.args[0];

  var GC = module.exports.GitContributors;

  GC.list(target, function (err, data) {

    if (err) { throw err; }

    console.log(data);

    process.exit(0);
  });
}
