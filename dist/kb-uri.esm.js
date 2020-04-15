/**
 * kb-uri v1.0.0
 * release at 2020-4-15
 * by Keuby
 * github git+https://github.com/keuby/kb-uri.git
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function isDef(val) {
  return val !== null && val !== undefined;
}

var Query = /*#__PURE__*/function () {
  function Query(qs) {
    var _this = this;

    _classCallCheck(this, Query);

    this._query = Object.create(null);
    var decodedQs = decodeURIComponent(qs || '');
    decodedQs.split('&').forEach(function (item) {
      var _item$split = item.split('='),
          _item$split2 = _slicedToArray(_item$split, 2),
          k = _item$split2[0],
          v = _item$split2[1];

      k && (_this._query[k] = v);
    });
  }

  _createClass(Query, [{
    key: "get",
    value: function get(key) {
      return this._query[key];
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return Object.assign({}, this._query);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._query[key] = value;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      delete this._query[key];
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this2 = this;

      var encode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var convert = encode ? function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(_this2._query[key]));
      } : function (key) {
        return "".concat(key, "=").concat(_this2._query[key]);
      };
      var qs = Object.keys(this._query).map(convert).join('&');
      return qs && '?' + qs;
    }
  }]);

  return Query;
}();

// const genDelims = '[:/?#\\[\\]@]'
var scheme = '[a-zA-Z][a-zA-Z0-9+-.]*';
var subDelims = '[!$&\'()*+,;=]';
var unreserved = '[a-zA-z0-9-._~]';
var pctEncoded = '(?:%[0-9a-fA-F]{2})';
var pchar = "".concat(unreserved, "|").concat(pctEncoded, "|").concat(subDelims, "|:|@");
var segment = "(?:".concat(pchar, ")*");
var userinfo = "((?:".concat(unreserved, "|").concat(pctEncoded, "|").concat(subDelims, "|:)*)");
var host = "(?:([^/?#:]*))";
var port = "([0-9]*)";
var authority = "(?:".concat(userinfo, "@)?").concat(host, "(?::").concat(port, ")?");
var abemptyPath = "((?:/".concat(segment, ")*)"); // const relativePath = `(${segment}(?:/${segment})*)`

var hierPath = "(?:(?://".concat(authority).concat(abemptyPath, ")|").concat(abemptyPath, ")");
var query = "((?:".concat(pchar, "|[/?])*)");
var fragment = "((?:".concat(pchar, "|[/?])*)");
var URIRegExp = new RegExp("^(?:(".concat(scheme, "):)?").concat(hierPath, "(\\?").concat(query, ")?(#").concat(fragment, ")?$")); // export const RelURIRegExp = new RegExp(`^${relativePath}(\\?${query})?(#${fragment})?$`)

var URI = /*#__PURE__*/function () {
  function URI(url) {
    _classCallCheck(this, URI);

    this.query = new Query();

    if (!isDef(url) && typeof location !== 'undefined') {
      url = location.href;
    }

    this.resolve(url);
  }

  _createClass(URI, [{
    key: "resolve",
    value: function resolve(url) {
      if (URIRegExp.test(url)) {
        this._resolveURIPath(url);
      } else {
        throw new TypeError('Invalid URL');
      }

      return this;
    }
  }, {
    key: "_resolveURIPath",
    value: function _resolveURIPath(url) {
      var matched = URIRegExp.exec(url);
      this.protocol = matched[1] || '';
      this.userinfo = matched[2] || '';
      this.hostname = matched[3] || '';
      this.port = matched[4] || '';
      this.path = matched[5] || matched[6] || '';
      this.query = new Query(matched[8] || '');
      this.hash = matched[9] || '';
    }
  }, {
    key: "queryString",
    get: function get() {
      return this.query.toString();
    }
  }, {
    key: "host",
    get: function get() {
      return this.port ? "".concat(this.host, ":").concat(this.port) : this.host;
    },
    set: function set(host) {
      host = String(host);
      var splited = host.split(':');
      this.hostname = splited[0];
      this.port = splited[1] || '';
    }
  }, {
    key: "href",
    get: function get() {
      var href = "".concat(this.protocol, ":");
      var authority = '';

      if (this.hostname) {
        authority = this.hostname;

        if (this.port) {
          authority = "".concat(authority, ":").concat(this.port);
        }

        if (this.userinfo) {
          authority = "".concat(this.userinfo, "@").concat(authority);
        }

        href += "//".concat(authority);
      }

      return href + this.path + this.queryString + this.hash;
    }
  }]);

  return URI;
}();

export default URI;
