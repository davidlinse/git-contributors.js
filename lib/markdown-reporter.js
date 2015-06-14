/*!
 * git-contributors (0.2.3) - 2015-06-14
 * https://github.com/davidlinse/git-contributors.js.git
 * Copyright (c) 2014 David Linse; License: MIT
 */

/**
 * markdown formatter module
 */

/* jshint indent:2 */

var _ = require('lodash');

module.exports.format = function(data, opts) {

  'use strict';

  opts = opts || {};

  var report = '';

  report += (opts.header || '');

  _.each(data, function(author) {

    report += '+ ' + author.name +
              ((opts.email === false) ?  ' ' : ' <' + author.email + '> ') +
              ' (' + author.commits +
              ' -' +
              ' '  + author.percent + '%)' +
              '\n';
  });

  return report;
};
