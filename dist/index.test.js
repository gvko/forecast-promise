'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var Forecast = require('./index');

jest.mock('axios');

jest.mock('./toDateString', function () {
  return function () {
    return 'mock__dateString';
  };
});

var MOCK_CREDENTIALS = {
  accountId: 'mock__accountId',
  token: 'mock__token'
};

describe('forecast-promise', function () {
  it('crashes with no input', function () {
    expect(function () {
      return new Forecast();
    }).toThrow('Forecast module requires accountId and token to be configured.');
  });

  it('crashes with only one input', function () {
    expect(function () {
      return new Forecast({ accountId: MOCK_CREDENTIALS.accountId });
    }).toThrow('Forecast module requires accountId and token to be configured.');

    expect(function () {
      return new Forecast({ token: MOCK_CREDENTIALS.token });
    }).toThrow('Forecast module requires accountId and token to be configured.');
  });

  it('instantiates axios with valid input', function () {
    axios.create.mockImplementation(function (args) {
      return args;
    });
    var f = new Forecast(MOCK_CREDENTIALS);

    expect(f.instance).toEqual({
      baseURL: 'https://api.forecastapp.com/',
      headers: {
        Authorization: 'Bearer ' + MOCK_CREDENTIALS.token,
        'Forecast-Account-Id': MOCK_CREDENTIALS.accountId,
        'User-Agent': 'https://www.npmjs.com/package/forecast-promise'
      }
    });
  });

  it('calls requests on axios', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var get, axiosMock, f, whoAmI, projects;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            get = jest.fn().mockImplementation(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(url === '/whoami')) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt('return', {
                          data: { current_user: 'mock__user' }
                        });

                      case 2:
                        return _context.abrupt('return', {
                          data: _defineProperty({}, url.substring(1), url)
                        });

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());
            axiosMock = { get: get };
            f = new Forecast(MOCK_CREDENTIALS, axiosMock);
            _context2.next = 5;
            return f.whoAmI();

          case 5:
            whoAmI = _context2.sent;


            expect(whoAmI).toEqual('mock__user');

            _context2.next = 9;
            return f.projects({
              startDate: 'mock__input',
              endDate: 'mock__input'
            });

          case 9:
            projects = _context2.sent;


            // Not mocking API response, just want to know the query went out
            expect(projects).toEqual('/projects');

            expect(get).toBeCalledTimes(2);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});