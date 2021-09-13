(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Sniperjs = factory());
}(this, (function () { 'use strict';

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


  const {
    toString
  } = Object.prototype;

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
    const globalObj = getGlobal();
    const key = '__sniper__internal__data__';

    if (globalObj[key] && !isEmptyObject(globalObj[key].systemInfo || {})) {
      return globalObj[key].systemInfo;
    }

    try {
      const systemInfo = globalObj.getSystemInfoSync();
      globalObj[key] = globalObj[key] || {};
      globalObj[key].systemInfo = systemInfo;
      return systemInfo;
    } catch (err) {
      return {};
    }
  }

  function getMeta() {
    return {
      agent: getAgent(),
      system: Object.assign({}, getSystemInfo())
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

  const strategies = {
    url: {
      validate(val) {
        if (!val) {
          throwErr(this.msgRequred);
        }
      },

      msgRequred: 'SNIPER ERROR: 配置中 url 字段必填.'
    },
    appVersion: {
      validate(val) {
        if (!val) return;

        if (!isString(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 appVersion 字段类型需为 String.'
    },
    env: {
      validate(val) {
        if (!val) return;

        if (!isString(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 env 字段类型需为 String.'
    },
    repeat: {
      validate(val) {
        if (!isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 repeat 字段类型需为 Number.'
    },
    ignoreErrors: {
      validate(val) {
        if (!isArray(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 ignoreErrors 字段类型需为 Array.'
    },
    autoBreadcrumbs: {
      validate(val) {
        if (!isBoolean(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 autoBreadcrumbs 字段类型需为 Array.'
    },
    breadcrumbsMax: {
      validate(val) {
        if (!isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.'
    },
    random: {
      validate(val) {
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
      validate(val) {
        if (!isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 delay 字段类型需为 Number.'
    },
    beforeReport: {
      validate(val) {
        if (!isFunction(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 beforeReport 字段类型需为 Function.'
    }
  };

  function proxyValidate() {
    const proxyObj = {};
    return new Proxy(proxyObj, {
      set(target, key, val) {
        strategies[key].validate(val); // eslint-disable-next-line no-param-reassign

        target[key] = val;
        return true;
      }

    });
  }

  function validateConfig(config) {
    const proxy = proxyValidate();
    Object.keys(config).forEach(prop => {
      proxy[prop] = config[prop];
    });
  }

  let BehaviorReporter = /*#__PURE__*/function () {
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
        beforeReport(log) {
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
        const curLogQueue = this.getLog();

        if (this.config.delay > 0) {
          if (this.delayTimer) {
            clearTimeout(this.delayTimer);
          }

          this.delayTimer = setTimeout(() => {
            this.sendLog(curLogQueue);
          }, this.config.delay);
        } else {
          this.sendLog(curLogQueue);
        }
      }
    }, {
      key: "gLog",
      value: function gLog(log) {
        const {
          appVersion,
          env
        } = this.config;
        return _objectSpread2$1(_objectSpread2$1({}, getMeta()), {}, {
          appVersion,
          env,
          logs: log
        });
      }
    }, {
      key: "sendLog",
      value: function sendLog(logQueue = []) {
        const log = logQueue.slice();
        if (!log.length) return;
        const data = this.gLog(log);
        const ret = isFunction(this.config.beforeReport) && this.config.beforeReport.call(this, data); // 异步回调

        if (isPromise(ret)) {
          ret.then(res => {
            if (isBoolean(res) && res === false) {
              // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
              return;
            }

            this.startReport(res);
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
          data
        });
      }
    }, {
      key: "use",
      value: function use(plugin, ...args) {
        plugin.init(this, ...args);
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

  const errorTypeReg = new RegExp('(' + ['EvalError:', 'InternalError:', 'RangeError:', 'ReferenceError:', 'SyntaxError:', 'TypeError:', 'URIError:', 'Error:' // new Error
  ].join('|') + ')', 'mi');

  /* eslint-disable key-spacing */

  function parseScriptRuntimeError(stack = '') {
    try {
      let line = '',
          col = '',
          file = '',
          url = '';
      const errInfoList = stack.split(/\n\s+/);
      const errMsg = errInfoList[0];
      const errStack = errInfoList.slice(1);
      const type = errMsg.match(errorTypeReg)[0].replace(/:$/, '') || '';
      const value = errMsg.split(/\n/).pop().split(':')[1].trim(); // 有可能没有stack信息，如在app.js生命周期里面throw error

      if (errStack.length) {
        // :(\d+:\d+) =>  :29:13
        // eslint-disable-next-line
        [line = '', col = ''] = (/:(\d+:\d+)/.exec(errStack[0])[1] || '').split(':'); // \w+:\/\/+    => weapp:///
        // https?:\/\/  => http:// or https://
        // eslint-disable-next-line

        file = (/(\w+:\/\/+|https?:\/\/).+:\d+:\d+/.exec(errStack[0])[0] || '').replace(/:\d+:\d+$/, '') || '';
        url = (/(\w+:\/\/+|https?:\/\/).+:\d+:\d+/.exec(errStack[1])[0] || '').replace(/:\d+:\d+$/, '') || '';
      }

      return {
        line,
        col,
        file,
        url,
        stack,
        type,
        value
      };
    } catch (err) {
      console.log('errInfoList-3---', err);
      return {
        stack,
        type: 'Error'
      };
    }
  }

  function parseStaticError(event, target) {
    const url = target.src || target.href;
    return {
      stack: url,
      file: url,
      type: "ReferenceError",
      value: '资源加载异常'
    };
  }

  /* eslint-disable no-undef */
  const pluginHookApp = {
    init(core) {
      // 一：捕获正常错误和资源加载错误
      window.addEventListener('error', event => {
        console.log('MZ5---', 1);
        const target = event.target || event.srcElement;
        const isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
        console.log('MZ6---', 1);

        const __log = isElementTarget ? parseStaticError(event, target) : parseScriptRuntimeError(event.error.stack);

        core.addLog(__log);
        console.log('MZ---', __log); //    core.report();
      }, true); // 二：捕获console.error错误
      // console.error = (func => {
      //   return (...args) => {
      //     core.addLog(...args);
      //     func.apply(console, args);
      //   }
      // })(console.error);
      // 三：捕获Promise错误

      window.addEventListener('unhandledrejection', e => {
        const __log = parseScriptRuntimeError(e.reason.stack);

        core.addLog(__log);
        console.log('MZ4---', __log); //  core.report();
        // console.log(`Promise.reject()中的内容，告诉你发生错误的原因:${e.reason}`);
        // console.log(`Promise对象 :${e.promise}`);
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

  let Reportor = /*#__PURE__*/function (_BehaviorReporter) {
    _inherits(Reportor, _BehaviorReporter);

    var _super = _createSuper(Reportor);

    function Reportor(opts = {}) {
      var _this;

      _classCallCheck(this, Reportor);

      _this = _super.call(this, opts); // 合并参数

      _this.mergeConfig(opts);

      _this.init();

      return _this;
    }

    _createClass(Reportor, [{
      key: "init",
      value: function init() {
        // 劫持 App onError
        // this.use(addEventListener);
        this.use(pluginHookApp); // // 劫持 Request
        // this.use(pluginHookRq);
        // this.use(pluginPatchPromise);

        this.applyRequest(Request);
      }
    }]);

    return Reportor;
  }(BehaviorReporter);

  return Reportor;

})));
