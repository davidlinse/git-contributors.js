/**
 * https://github.com/davidlinse/git-contributors.js
 *
 * Copyright (c) 2014 David Linse, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports.GitContributors = process.env.MOCHA_COV ?
  require('./lib-cov/git-contributors').GitContributors :
  require('./lib/git-contributors').GitContributors;
