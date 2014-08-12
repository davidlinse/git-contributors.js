var _ = require('lodash');

module.exports.format = function(data, opts) {

  'use strict';

  opts = opts || {};

  var report = '';

  report += (opts.header || '');

  _.each(data, function(author) {

    report += '+ ' + author.name +
              ' <' + author.email + '> ' +
              ' (' + author.commits +
              ' -' +
              ' '  + author.percent + '%)' +
              '\n';
  });

  return report;
};
