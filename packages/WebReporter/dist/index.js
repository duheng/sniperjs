'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _ownKeys(Object(source), true).forEach(function (key) { _defineProperty2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/* eslint-disable no-empty */

/* eslint-disable no-undef */


var toString = Object.prototype.toString;

function isPlainObject(target) {
  return toString.call(target) === '[object Object]';
}

function isString(target) {
  return toString.call(target) === '[object String]';
}

function isArray(target) {
  return toString.call(target) === '[object Array]';
}

function isEmptyObject(target) {
  if (!isPlainObject(target)) return false;
  return Object.keys(target).length > 0;
}

function isBoolean(target) {
  return toString.call(target) === '[object Boolean]';
}

function isFunction(target) {
  return typeof target === 'function';
}

function isNumber(target) {
  // eslint-disable-next-line no-restricted-globals
  return toString.call(target) === '[object Number]' && !isNaN(target);
}

function isPromise(object) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  }
}

function extend(target, source) {
  return _objectSpread2(_objectSpread2({}, target), source);
}

function getAgent() {
  try {
    if (window && window.history) {
      return 'WEB_APP';
    }

    if (wx) {
      return 'WX_MINI_APP';
    }

    if (swan) {
      return 'BAIDU_MINI_APP';
    }

    if (my) {
      return 'ALIPAY_MINI_APP';
    }

    if (tt) {
      return 'TT_MINI_APP';
    }

    if (qq) {
      return 'QQ_MINI_APP';
    }

    if (quick) {
      return 'QUICK_APP';
    }
  } catch (err) {
    return 'UNKNOWN_APP';
  }
}

function getGlobal() {
  try {
    if (window && window.history) {
      return window;
    }

    if (wx) {
      return wx;
    }

    if (swan) {
      return swan;
    }

    if (my) {
      return my;
    }

    if (tt) {
      return tt;
    }

    if (qq) {
      return qq;
    }
  } catch (err) {
    return {};
  }
}

function getSystemInfo() {
  // 这里做个缓存
  var globalObj = getGlobal();
  var key = '__sniper__internal__data__';

  if (globalObj[key] && !isEmptyObject(globalObj[key].systemInfo || {})) {
    return globalObj[key].systemInfo;
  }

  try {
    var systemInfo = globalObj.getSystemInfoSync();
    globalObj[key] = globalObj[key] || {};
    globalObj[key].systemInfo = systemInfo;
    return systemInfo;
  } catch (err) {
    return {};
  }
}

function getMeta() {
  if (getAgent() === 'WEB_APP') {
    return _getWebMeta();
  }

  return {
    agent: getAgent(),
    system: Object.assign({}, getSystemInfo())
  };
}

function _getWebMeta() {
  var uType = !!(window['hysdk'] && window.hysdk.env === 'hy') ? 'appH5' : 'h5';
  var winSearch = window.location.search.replace('?', '');
  var versionSearch = winSearch.split('&').map(function (item) {
    var data = {},
        arr = item.split('=');
    data[arr[0]] = arr[1];
    return data;
  }).filter(function (d) {
    return d['version'];
  });
  return {
    p: uType,
    logType: 'ue',
    c: {
      ua: window.navigator.userAgent || '',
      send_time: +new Date(),
      cookie: document.cookie,
      user_type: uType,
      version: versionSearch.length ? versionSearch[0]['version'] : '1'
    }
  };
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function throwErr(err) {
  throw new Error(err);
}

var strategies = {
  url: {
    validate: function validate(val) {
      if (!val) {
        throwErr(this.msgRequred);
      }
    },
    msgRequred: 'SNIPER ERROR: 配置中 url 字段必填.'
  },
  appVersion: {
    validate: function validate(val) {
      if (!val) return;

      if (!isString(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 appVersion 字段类型需为 String.'
  },
  env: {
    validate: function validate(val) {
      if (!val) return;

      if (!isString(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 env 字段类型需为 String.'
  },
  repeat: {
    validate: function validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 repeat 字段类型需为 Number.'
  },
  ignoreErrors: {
    validate: function validate(val) {
      if (!isArray(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 ignoreErrors 字段类型需为 Array.'
  },
  autoBreadcrumbs: {
    validate: function validate(val) {
      if (!isBoolean(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 autoBreadcrumbs 字段类型需为 Array.'
  },
  breadcrumbsMax: {
    validate: function validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.'
  },
  random: {
    validate: function validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      } else if (!(val > 0 && val <= 1)) {
        throwErr(this.msgRangeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.',
    msgRangeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段范围需满足 (0, 1]'
  },
  delay: {
    validate: function validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 delay 字段类型需为 Number.'
  },
  beforeReport: {
    validate: function validate(val) {
      if (!isFunction(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 beforeReport 字段类型需为 Function.'
  }
};

function proxyValidate() {
  var proxyObj = {};
  return new Proxy(proxyObj, {
    set: function set(target, key, val) {
      strategies[key].validate(val); // eslint-disable-next-line no-param-reassign

      target[key] = val;
      return true;
    }
  });
}

function validateConfig(config) {
  var proxy = proxyValidate();
  Object.keys(config).forEach(function (prop) {
    proxy[prop] = config[prop];
  });
}

var BehaviorReporter = /*#__PURE__*/function () {
  function BehaviorReporter() {
    _classCallCheck(this, BehaviorReporter);

    this.logQueue = [];
    this.config = {
      url: '',
      appkey: '',
      // 以后商业化要用到的
      delay: 1000,
      // 延迟, 合并上报
      appVersion: '',
      // 应用Version
      env: '',
      // 环境
      beforeReport: function beforeReport(log) {
        // 1.可在这里劫持上报的数据, 比如添加userid, session等等
        // 2.如果return false, 则不用内置http上报, 此时可以在这里自定义自己的http上报方式
        //   比如以后浏览器端，可以自定义 ajax 上报还是用图片上报
        return log;
      }
    };
    this.applyRequested = false;
    this.delayTimer = -1;
  }

  _createClass(BehaviorReporter, [{
    key: "mergeConfig",
    value: function mergeConfig(opts) {
      validateConfig(opts);
      this.config = extend(this.config, opts);
    }
  }, {
    key: "addLog",
    value: function addLog(log) {
      this.logQueue.push(log);
      return this;
    }
  }, {
    key: "getLog",
    value: function getLog() {
      return this.logQueue.slice();
    }
  }, {
    key: "clearLog",
    value: function clearLog() {
      this.logQueue = [];
      return this;
    }
  }, {
    key: "report",
    value: function report() {
      var _this = this;

      var curLogQueue = this.getLog();

      if (this.config.delay > 0) {
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
        }

        this.delayTimer = setTimeout(function () {
          _this.sendLog(curLogQueue);
        }, this.config.delay);
      } else {
        this.sendLog(curLogQueue);
      }
    }
  }, {
    key: "gLog",
    value: function gLog(log) {
      var _this$config = this.config,
          appVersion = _this$config.appVersion,
          env = _this$config.env;
      return _objectSpread2$1(_objectSpread2$1({}, getMeta()), {}, {
        appVersion: appVersion,
        env: env,
        logs: log
      });
    }
  }, {
    key: "sendLog",
    value: function sendLog() {
      var _this2 = this;

      var logQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var log = logQueue.slice();
      if (!log.length) return;
      var data = this.gLog(log);
      var ret = isFunction(this.config.beforeReport) && this.config.beforeReport.call(this, data); // 异步回调

      if (isPromise(ret)) {
        ret.then(function (res) {
          if (isBoolean(res) && res === false) {
            // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
            return;
          }

          _this2.startReport(res);
        });
      } else {
        if (isBoolean(ret) && ret === false) {
          // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
          return;
        }

        this.startReport(ret);
      }
    }
  }, {
    key: "startReport",
    value: function startReport(data) {
      this.clearLog(); // 默认上报

      this.request({
        url: this.config.url,
        method: 'POST',
        data: data
      });
    }
  }, {
    key: "use",
    value: function use(plugin) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      plugin.init.apply(plugin, [this].concat(args));
    }
  }, {
    key: "applyRequest",
    value: function applyRequest(request) {
      if (this.applyRequested) return false;
      this.request = request;
      this.applyRequested = true;
      return true;
    }
  }]);

  return BehaviorReporter;
}();

var parseReportLog = function parseReportLog(list) {
  var arr = [+new Date(), 'web', 'h5'];
  return arr.concat(list).join('*');
};

var getElmPath = function getElmPath(e) {
  var maxDeep = 5;
  if (!e || 1 !== e.nodeType) return '';
  var ret = [],
      deepLength = 0,
      elm = '';
  ret.push("(".concat(e.innerText.substr(0, 50), ")"));

  for (var t = e || null; t && deepLength++ < maxDeep && !('html' === (elm = normalTarget(t)));) {
    ret.push(elm), t = t.parentNode;
  }

  return ret.reverse().join(' > ');
};

var getCommonAttribute = function getCommonAttribute() {
  return {
    url: encodeURIComponent(window.location.href),
    time: +new Date()
  };
};

var normalTarget = function normalTarget(e) {
  var t,
      n,
      r,
      a,
      i,
      o = [];
  if (!e || !e.tagName) return '';

  if (o.push(e.tagName.toLowerCase()), e.id && o.push('#'.concat(e.id)), (t = e.className) && '[object String]' === Object.prototype.toString.call(t)) {
    for (n = t.split(/\s+/), i = 0; i < n.length; i++) {
      // className包含active的不加入路径
      if (n[i].indexOf('active') < 0) o.push('.'.concat(n[i]));
    }
  }

  var s = ['type', 'name', 'title', 'alt', 'src'];

  for (i = 0; i < s.length; i++) {
    r = s[i], (a = e.getAttribute(r)) && o.push('['.concat(r, '="').concat(a, '"]'));
  }

  return o.join('');
};

var fnToString = function fnToString(e) {
  return function () {
    return e + '() { [native code] }';
  };
};

var parseUrl = function parseUrl(e) {
  return e && 'string' == typeof e ? e.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '') : '';
};

var dispatchCustomEvent = function dispatchCustomEvent(e, t) {
  var r;
  window.CustomEvent ? r = new CustomEvent(e, {
    detail: t
  }) : ((r = window.document.createEvent('HTMLEvents')).initEvent(e, !1, !0), r.detail = t);
  window.dispatchEvent(r);
};

var hookHistoryState = {
  init: function init() {
    function doHook(e) {
      var t = history[e];
      'function' == typeof t && (history[e] = function (n, i, s) {
        var c = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
            u = location.href,
            f = t.apply(history, c);
        if (!s || 'string' != typeof s) return f;
        if (s === u) return f;

        try {
          var l = u.split('#'),
              h = s.split('#'),
              p = parseUrl(l[0]),
              d = parseUrl(h[0]),
              g = l[1] && l[1].replace(/^\/?(.*)/, '$1'),
              v = h[1] && h[1].replace(/^\/?(.*)/, '$1');
          p !== d ? dispatchCustomEvent('historystatechanged', d) : g !== v && dispatchCustomEvent('historystatechanged', v);
        } catch (m) {
          console.error('[retcode] error in ' + e + ': ' + m);
        }

        return f;
      }, history[e].toString = fnToString(e));
    }

    ['pushState', 'replaceState'].forEach(function (e) {
      return doHook(e);
    });
  }
};

function theEventLoad() {
  var url = encodeURIComponent(window.location.href);
  var commonAttr = getCommonAttribute();
  var endLog = parseReportLog(["web_end:".concat(JSON.stringify(commonAttr))]),
      pageToLog = parseReportLog(['web_to', 'unknown', url]);
  this.addLog(endLog);
  this.addLog(pageToLog);
  this.report();
}

function theEventError(error) {
  // ErrorEvent 捕获异常, Event 资源错误
  var commonAttr = getCommonAttribute();
  var msg = '',
      errcode = '';

  if (error instanceof ErrorEvent) {
    msg = error.message;
    errcode = 'error';
  } else {
    var thePath = getElmPath(error.target);
    msg = '资源错误: ' + thePath;
    errcode = 'resource_error';
  }

  var data = _objectSpread(_objectSpread({}, commonAttr), {
    errcode: errcode,
    errmsg: msg
  });

  var errLog = parseReportLog(["web_error:".concat(JSON.stringify(data))]);
  this.addLog(errLog);
  this.report();
}

function theEventUnhandledrejection(e) {
  e.preventDefault();
  var commonAttr = getCommonAttribute();

  var data = _objectSpread(_objectSpread({}, commonAttr), {
    errcode: 'unhandledrejection',
    errmsg: e.reason.stack
  });

  var errLog = parseReportLog(["web_error:".concat(JSON.stringify(data))]);
  this.addLog(errLog);
  this.report();
}

function theEventClick(event) {
  var target;

  try {
    target = event.target;
  } catch (err) {
    target = '<unknown>';
  }

  if (target.nodeName === 'HTML' || target.nodeName === 'TEXTAREA') return;
  if (target.length === 0) return;
  var thePath = getElmPath(target);
  if (!thePath) return;
  var contentText;

  switch (target.nodeName) {
    case 'DIV':
      contentText = target.textContent;
      break;

    case 'IMG':
      contentText = target.src;
      break;

    case 'INPUT':
      contentText = target.defaultValue;
      break;

    default:
      contentText = null;
  }

  var url = encodeURIComponent(window.location.href);
  var clickLog = parseReportLog(['click', target.id || target.className, "".concat(url, "\uFF1A").concat(thePath), contentText]);
  this.addLog(clickLog);
  this.report();
}

function theEventHashchange(event) {
  var newURL = event.newURL,
      oldURL = event.oldURL;
  var hashchangeLog = parseReportLog(['web_to', encodeURIComponent(newURL), encodeURIComponent(oldURL)]);
  this.addLog(hashchangeLog);
  this.report();
}

function theEventUnload() {
  var url = encodeURIComponent(window.location.href);
  var pageFromLog = parseReportLog(['web_to', url, 'unknown']);
  this.addLog(pageFromLog);
  this.report();
}

function theEventHistorystatechanged(event) {
  var target = event.target;
  var hashchangeLog = parseReportLog(['web_to', 'unknow', encodeURIComponent(target.location.href)]);
  this.addLog(hashchangeLog);
  this.report();
}

var addEventListener = {
  init: function init(core) {
    // 页面加载前
    var startLog = parseReportLog(["web_start: ".concat(JSON.stringify(getCommonAttribute()))]);
    core.addLog(startLog);
    core.report();
    var initEvent = {
      load: {
        fn: theEventLoad
      },
      error: {
        fn: theEventError
      },
      unhandledrejection: {
        fn: theEventUnhandledrejection
      },
      click: {
        fn: theEventClick
      },
      hashchange: {
        fn: theEventHashchange
      },
      unload: {
        fn: theEventUnload
      },
      historystatechanged: {
        fn: theEventHistorystatechanged
      }
    }; // 监听函数不要使用匿名函数, 可以减低内存、自动回收

    Object.keys(initEvent).forEach(function (key) {
      var event = initEvent[key];
      window.addEventListener(key, event.fn.bind(core), true);
    });
  }
};

function Request(config) {
  var url = config.url,
      method = config.method,
      data = config.data;
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.send('ue=' + JSON.stringify(data));
  return xhr;
}

var WebReportor = /*#__PURE__*/function (_BehaviorReporter) {
  _inherits(WebReportor, _BehaviorReporter);

  var _super = _createSuper(WebReportor);

  function WebReportor() {
    var _this3;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WebReportor);

    _this3 = _super.call(this, opts); // 合并参数

    _this3.mergeConfig(opts);

    _this3.init();

    return _this3;
  }

  _createClass(WebReportor, [{
    key: "init",
    value: function init() {
      // this.use(hooRequest);
      // this.use(hookFetch);
      this.use(addEventListener); // this.use(hookOnPopstate);

      this.use(hookHistoryState);
      this.applyRequest(Request);
    }
  }]);

  return WebReportor;
}(BehaviorReporter);

module.exports = WebReportor;
