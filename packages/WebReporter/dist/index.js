(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sniperjs/behavior-reporter')) :
  typeof define === 'function' && define.amd ? define(['@sniperjs/behavior-reporter'], factory) :
  (global = global || self, global.Sniperjs = factory(global.BehaviorReporter));
}(this, (function (BehaviorReporter) { 'use strict';

  BehaviorReporter = BehaviorReporter && Object.prototype.hasOwnProperty.call(BehaviorReporter, 'default') ? BehaviorReporter['default'] : BehaviorReporter;

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  const parseReportLog = list => {
    const arr = [+new Date(), 'web', 'h5'];
    return arr.concat(list).join('*');
  };

  const getElmPath = e => {
    const maxDeep = 5;
    if (!e || 1 !== e.nodeType) return '';
    var ret = [],
        deepLength = 0,
        elm = '';
    ret.push(`(${e.innerText.substr(0, 50)})`);

    for (var t = e || null; t && deepLength++ < maxDeep && !('html' === (elm = normalTarget(t)));) {
      ret.push(elm), t = t.parentNode;
    }

    return ret.reverse().join(' > ');
  };

  const getCommonAttribute = () => {
    return {
      url: encodeURIComponent(window.location.href),
      time: +new Date()
    };
  };

  const normalTarget = function (e) {
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

    for (i = 0; i < s.length; i++) r = s[i], (a = e.getAttribute(r)) && o.push('['.concat(r, '="').concat(a, '"]'));

    return o.join('');
  };

  const fnToString = function (e) {
    return function () {
      return e + '() { [native code] }';
    };
  };

  const parseUrl = function (e) {
    return e && 'string' == typeof e ? e.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '') : '';
  };

  const dispatchCustomEvent = function (e, t) {
    var r;
    window.CustomEvent ? r = new CustomEvent(e, {
      detail: t
    }) : ((r = window.document.createEvent('HTMLEvents')).initEvent(e, !1, !0), r.detail = t);
    window.dispatchEvent(r);
  };

  var hookHistoryState = {
    init() {
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

      ['pushState', 'replaceState'].forEach(e => doHook(e));
    }

  };

  function theEventLoad () {
    const url = encodeURIComponent(window.location.href);
    const commonAttr = getCommonAttribute();
    const endLog = parseReportLog([`web_end:${JSON.stringify(commonAttr)}`]),
          pageToLog = parseReportLog(['web_to', 'unknown', url]);
    this.addLog(endLog);
    this.addLog(pageToLog);
    this.report();
  }

  function theEventError (error) {
    // ErrorEvent 捕获异常, Event 资源错误
    const commonAttr = getCommonAttribute();
    let msg = '',
        errcode = '';

    if (error instanceof ErrorEvent) {
      msg = error.message;
      errcode = 'error';
    } else {
      const thePath = getElmPath(error.target);
      msg = '资源错误: ' + thePath;
      errcode = 'resource_error';
    }

    const data = _objectSpread2(_objectSpread2({}, commonAttr), {
      errcode,
      errmsg: msg
    });

    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
    this.addLog(errLog);
    this.report();
  }

  function theEventUnhandledrejection (e) {
    e.preventDefault();
    const commonAttr = getCommonAttribute();

    const data = _objectSpread2(_objectSpread2({}, commonAttr), {
      errcode: 'unhandledrejection',
      errmsg: e.reason.stack
    });

    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
    this.addLog(errLog);
    this.report();
  }

  function theEventClick (event) {
    var target;

    try {
      target = event.target;
    } catch (err) {
      target = '<unknown>';
    }

    if (target.nodeName === 'HTML' || target.nodeName === 'TEXTAREA') return;
    if (target.length === 0) return;
    const thePath = getElmPath(target);
    if (!thePath) return;
    let contentText;

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

    const url = encodeURIComponent(window.location.href);
    const clickLog = parseReportLog(['click', target.id || target.className, `${url}：${thePath}`, contentText]);
    this.addLog(clickLog);
    this.report();
  }

  function theEventHashchange (event) {
    const {
      newURL,
      oldURL
    } = event;
    const hashchangeLog = parseReportLog(['web_to', encodeURIComponent(newURL), encodeURIComponent(oldURL)]);
    this.addLog(hashchangeLog);
    this.report();
  }

  function theEventUnload () {
    const url = encodeURIComponent(window.location.href);
    const pageFromLog = parseReportLog(['web_to', url, 'unknown']);
    this.addLog(pageFromLog);
    this.report();
  }

  function theEventHistorystatechanged (event) {
    const {
      target
    } = event;
    const hashchangeLog = parseReportLog(['web_to', 'unknow', encodeURIComponent(target.location.href)]);
    this.addLog(hashchangeLog);
    this.report();
  }

  var addEventListener = {
    init(core) {
      // 页面加载前
      const startLog = parseReportLog([`web_start: ${JSON.stringify(getCommonAttribute())}`]);
      core.addLog(startLog);
      core.report();
      const initEvent = {
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

      Object.keys(initEvent).forEach(key => {
        const event = initEvent[key];
        window.addEventListener(key, event.fn.bind(core), true);
      });
    }

  };

  function Request(config) {
    const {
      url,
      method,
      data
    } = config;
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send('ue=' + JSON.stringify(data));
    return xhr;
  }

  let WebReportor = /*#__PURE__*/function (_BehaviorReporter) {
    _inherits(WebReportor, _BehaviorReporter);

    var _super = _createSuper(WebReportor);

    function WebReportor(opts = {}) {
      var _this;

      _classCallCheck(this, WebReportor);

      _this = _super.call(this, opts); // 合并参数

      _this.mergeConfig(opts);

      _this.init();

      return _this;
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

  return WebReportor;

})));
