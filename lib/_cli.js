/*!
 * git-contributors (0.1.8) - 2014-05-24
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * cli helper module
 * @version    0.1.1
 */

module.exports = {

  parse: function parse (argv, version) {
    'use strict';

    var program = require('commander');

    // TODO: move to 'cli' helper
    //
    program
      .version(version)
      .usage('/path/to/repository')
      .option('-f, --format [markdown]', 'Output in markdown format (default json)')
      .option('-m, --markdown', 'Output in markdown format')
      .option('--no-email', 'remove author email from output')
      .parse(argv);

    if (!program.args.length) {
      program.help();
      process.exit(0);
    }

    return program;
  }
};
