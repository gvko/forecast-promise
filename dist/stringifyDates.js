'use strict';

var toDateString = require('./toDateString');

module.exports = function (options) {
  var qs = {};

  if (options.startDate) qs.start_date = toDateString(options.startDate);

  if (options.endDate) {
    qs.end_date = toDateString(options.endDate);
  }

  return qs;
};