'use strict';

var toDateString = require('./toDateString');

describe('toDateString', function () {
	it('throws without input', function () {
		expect(function () {
			return toDateString();
		}).toThrow('Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.');
	});

	it('throws on invalid string input', function () {
		var warn = jest.spyOn(global.console, 'warn').mockImplementation(function () {});

		expect(function () {
			return toDateString('Invalid');
		}).toThrow('Invalid date string; expecting ISO-8601 compatible format.');

		// Moment deprecation warning
		expect(warn).toHaveBeenCalled();
	});

	it('works on valid string input', function () {
		expect(toDateString('01-31-2000')).toBe('2000-01-31');
	});

	it('throws on invalid Date input', function () {
		expect(function () {
			return toDateString(new Date('Invalid'));
		}).toThrow('Invalid date object; expecting non NaN date value.');
	});

	it('works on valid Date input', function () {
		expect(toDateString(new Date('01-31-2000'))).toBe('2000-01-31');
	});

	it('accepts any moment-ish object', function () {
		var input = {
			_isAMomentObject: true,
			format: jest.fn().mockReturnValue('mocked value')
		};

		expect(toDateString(input)).toBe('mocked value');

		expect(input.format).toHaveBeenCalledWith('YYYY-MM-DD');
	});
});