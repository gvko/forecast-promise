'use strict';

var stringifyDates = require('./stringifyDates');

// Mocks the toDateString function to always return
// the input. It isn't the system under test in this
// file.
jest.mock('./toDateString', function() {
  return function(args) {
    return args;
  };
});

describe('stringifyDates', function() {
  it('returns input as-is', function() {
    expect(stringifyDates({})).toEqual({});
  });

  it('converts the start date', function() {
    expect(stringifyDates({ startDate: 'someValue' })).toMatchObject({
      start_date: 'someValue',
    });
  });

  it('converts the end date', function() {
    var output = stringifyDates({ endDate: 'someValue' });

    expect(output).toMatchObject({
      end_date: 'someValue',
    });

    expect(Object.keys(output).length).toBe(1);
  });
});
