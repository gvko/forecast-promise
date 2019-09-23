'use strict';

var _slicedToArray = function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }

  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
  };
}();

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var axios = require('axios');
var stringifyDates = require('./stringifyDates');

var Forecast = function() {
  function Forecast() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      accountId = _ref.accountId,
      token = _ref.token;

    var instance = arguments[1];

    _classCallCheck(this, Forecast);

    if (!accountId || !token) {
      throw new Error('Forecast module requires accountId and token to be configured.');
    }

    var baseURL = 'https://api.harvestapp.com/api/v2/';
    var headers = {
      Authorization: 'Bearer ' + token,
      'Forecast-Account-Id': accountId,
      'User-Agent': 'https://www.npmjs.com/package/forecast-promise',
    };

    this.instance = instance || axios.create({
      baseURL: baseURL,
      headers: headers,
    });

    var methods = [['whoAmI', 'current_user'], ['clients'], ['people'], ['projects'], ['assignments'], ['milestones'], ['roles']];

    methods.forEach(function(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        name = _ref3[0],
        dataLocation = _ref3[1];

      var route = '/' + name.toLowerCase();
      var prop = dataLocation || name;
      _this[name] = function(options) {
        return _this._request(route, options).then(function(response) {
          return response.data[prop];
        });
      };
    });
  }

  _createClass(Forecast, [{
    key: '_request',
    value: function _request(relativeUrl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var params = stringifyDates(options);
      return this.instance.get(relativeUrl, { params: params });
    },
  }]);

  return Forecast;
}();

module.exports = Forecast;
