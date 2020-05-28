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
/* eslint-disable no-empty */

/* eslint-disable no-undef */


const {
  toString
} = Object.prototype;

function isRegExp(target) {
  return toString.call(target) === '[object RegExp]';
}

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
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}

function compose(...fns) {
  return function pipe(...args) {
    if (!fns.length) return args[0];
    let index = 0;
    let ret = fns[index].apply(this, args); // eslint-disable-next-line no-plusplus

    while (++index < fns.length) {
      ret = fns[index].call(this, ret);
    }

    return ret;
  };
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
  let net = ''; // try {
  //   // eslint-disable-next-line
  //  net = getNet();
  // } catch(err) {
  //   // eslint-disable-next-line
  // }

  if (getAgent() === 'WEB_APP') {
    return _getWebMeta();
  }

  return {
    agent: getAgent(),
    system: Object.assign({}, getSystemInfo(), {
      net: net
    })
  };
}

function _getWebMeta() {
  const uType = !!hysdk ? 'appH5' : 'h5';
  const winSearch = window.location.search.replace('?', '');
  const versionSearch = winSearch.split('&').map(item => {
    const data = {},
          arr = item.split('=');
    data[arr[0]] = arr[1];
    return data;
  }).filter(d => {
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

const logMap = Symbol('log map');

class ErrorReporter {
  constructor() {
    this.logQueue = [];
    this.breadcrumbs = [];
    this[logMap] = {};
    this.config = {
      url: '',
      repeat: 5,
      // 同样错误重复记录，超过重复次数的记录不上报
      ignoreErrors: [],
      // 错误类型过滤(正则)
      // TODO 上层 UI 事件记录捕捉待补全, 目前只支持 tap 事件
      autoBreadcrumbs: true,
      // 是否记录 UI 事件历史
      breadcrumbsMax: 5,
      // 只保留最近5次的事件记录
      appkey: '',
      // 以后商业化要用到的
      random: 1,
      // 随机抽样上报 (0, 1]
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

  mergeConfig(opts) {
    validateConfig(opts);
    this.config = extend(this.config, opts);
  }

  addBreadCrumb(breadcrumb) {
    this.breadcrumbs.push(breadcrumb);
    return this;
  }

  getBreadCrumbs() {
    return this.breadcrumbs;
  }

  clearBreadCrumbs() {
    this.breadcrumbs = [];
    return this;
  }

  addLog(log) {
    if (!this.isRepeat(log)) {
      this.logQueue.push(this.processMergeBreadcrumbs(log));
    }

    return this;
  }

  getLog() {
    return this.logQueue;
  }

  clearLog() {
    this.logQueue = [];
    this.resetLogMap();
    return this;
  }

  resetLogMap() {
    this[logMap] = {};
  } // 是否重复，非http错误的时在stack里面取字符串做为重复的key


  isRepeat(log) {
    // http错误
    const logKeyName = log.type === 'RequestError' ? `${log.url}/${log.statusCode}` : log.stack.replace(/\n|\s/g, '').substring(0, 100);
    this[logMap][logKeyName] = (this[logMap][logKeyName] || 0) + 1;
    return this[logMap][logKeyName] > this.config.repeat;
  } // 抽样上报


  processByRandom(queue) {
    const isIgnore = Math.random() > this.config.random;
    if (isIgnore) return [];
    return queue;
  } // 忽略上报


  processByFilterIgore(queue) {
    const {
      ignoreErrors
    } = this.config;
    if (!ignoreErrors.length) return queue;
    const source = ignoreErrors.filter(rule => isRegExp(rule)).map(rule => `(${rule.source})`); // 合并成一个正则

    const bigRegExp = new RegExp(source.join('|'), 'i');
    return queue.filter(log => !bigRegExp.test(log.msg.type));
  }

  processMergeBreadcrumbs(log) {
    const retLog = log;

    if (isBoolean(this.config.autoBreadcrumbs) && this.config.autoBreadcrumbs) {
      retLog.breadcrumbs = this.getBreadCrumbs().slice(0);
      this.clearBreadCrumbs();
    }

    return retLog;
  }

  report() {
    const curLogQueue = this.getLog();
    const processTask = [// 抽样上报
    this.processByRandom.bind(this), // 规则忽略上报
    this.processByFilterIgore.bind(this)];

    if (this.config.delay > 0) {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }

      this.delayTimer = setTimeout(() => {
        this.sendLog(compose.apply(this, processTask)(curLogQueue));
      }, this.config.delay);
    } else {
      this.sendLog(compose.apply(this, processTask)(curLogQueue));
    }
  }

  gLog(log) {
    const {
      appVersion,
      env
    } = this.config;
    return _objectSpread2(_objectSpread2({}, getMeta()), {}, {
      appVersion,
      env,
      logs: log
    });
  }

  sendLog(logQueue = []) {
    // tip: 超过重复上报的次数后log不会入队
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

  startReport(data) {
    this.clearLog(); // 默认上报

    this.request({
      url: this.config.url,
      method: 'POST',
      data
    });
  }

  use(plugin, ...args) {
    plugin.init(this, ...args);
  }

  applyRequest(request) {
    if (this.applyRequested) return false;
    this.request = request;
    this.applyRequested = true;
    return true;
  } // try catch 代理上报用户自定义函数


  wrapFn(fn) {
    if (fn.hasWraped) {
      return fn;
    } // eslint-disable-next-line


    const wrapedFn = (...args) => {
      const wrappedArgs = this.wrapFnArgs(args);

      try {
        return fn.apply(this, wrappedArgs);
      } catch (err) {// 添加到log队列
        // this.addLog(err);
      }
    }; // eslint-disable-next-line


    fn.hasWraped = true;
    return wrapedFn;
  }

  wrapFnArgs(args = []) {
    return args.map(arg => {
      if (isFunction(arg)) {
        const wrapedFn = this.wrapFn(arg);
        return wrapedFn;
      }

      return arg;
    });
  }

}

function _defineProperty$2(obj, key, value) {
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

function ownKeys$2(object, enumerableOnly) {
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

function _objectSpread2$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/* eslint-disable no-empty */

/* eslint-disable no-undef */


const {
  toString: toString$1
} = Object.prototype;

function isPlainObject$1(target) {
  return toString$1.call(target) === '[object Object]';
}

function isEmptyObject$1(target) {
  if (!isPlainObject$1(target)) return false;
  return Object.keys(target).length > 0;
}

function isFunction$1(target) {
  return typeof target === 'function';
}

function getNow() {
  return +new Date();
}

function noop() {}

function getGlobal$1() {
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

function getSystemInfo$1() {
  // 这里做个缓存
  const globalObj = getGlobal$1();
  const key = '__sniper__internal__data__';

  if (globalObj[key] && !isEmptyObject$1(globalObj[key].systemInfo || {})) {
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

function getRoutes() {
  // eslint-disable-next-line prefer-const
  let defaultRouteInfo = {
    path: '',
    query: {}
  };
  const pages = getCurrentPages();
  let curPage = {};

  if (pages.length) {
    curPage = pages[pages.length - 1];
    const {
      route = '',
      options = {}
    } = curPage;
    defaultRouteInfo.path = route;
    defaultRouteInfo.query = options;
  }

  return defaultRouteInfo;
}

function getLog(log) {
  const defaultLog = {
    stack: '',
    line: '',
    col: '',
    file: '',
    type: '',
    value: '',
    time: getNow(),
    pageRoute: getRoutes()
  };
  return Object.assign(defaultLog, log);
}

/* eslint-disable key-spacing */

/* eslint-disable no-multi-spaces */
const errorTypeReg = new RegExp('(' + ['EvalError:', 'InternalError:', 'RangeError:', 'ReferenceError:', 'SyntaxError:', 'TypeError:', 'URIError:', 'Error:' // new Error
].join('|') + ')', 'mi');

function parseScriptRuntimeError(stack) {
  try {
    let line = '',
        col = '',
        file = '';
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
    }

    return {
      line,
      col,
      file,
      stack,
      type,
      value
    };
  } catch (err) {
    return {
      stack,
      type: 'Error'
    };
  }
}

function parseUnhandleRejectError(stack) {
  return parseScriptRuntimeError(stack);
}

const pluginHookApp = {
  init(core) {
    const originApp = App;

    App = function App(config) {
      const originOnError = config.onError;
      const originUnRj = config.onUnhandledRejection;

      const configCopy = _objectSpread2$2({}, config);

      configCopy.onError = originParam => {
        const log = getLog(parseScriptRuntimeError(originParam));
        core.addLog(log);
        core.report();
        return originOnError && originOnError.call(wx, originParam);
      };

      configCopy.onUnhandledRejection = originParam => {
        let log = {};
        const PromiseType = 'PromiseRejectedError';

        if (originParam.reason && originParam.reason instanceof Error) {
          log = getLog(Object.assign(parseUnhandleRejectError(originParam.reason.stack), {
            type: PromiseType
          }));
        } else {
          log = getLog({
            value: originParam.reason,
            type: PromiseType
          });
        }

        core.addLog(log);
        core.report();
        return originUnRj && originUnRj.call(wx, originParam);
      };

      return originApp(configCopy);
    };

    return App;
  }

};

function isRorterRequest(url) {
  const reg = new RegExp(url);
  return reg.test(this.config.url);
}

const pluginHookRq = {
  init(core) {
    const globalObj = getGlobal$1();
    const originRequest = globalObj.request;
    Object.defineProperty(globalObj, 'request', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: originRequest
    });

    globalObj.request = function request(config) {
      const configCopy = _objectSpread2$2({}, config);

      const originFail = config.fail || noop;
      const originSuc = config.success || noop; // 搜集wx.request所有除callback的配置。

      const collectConfigProp = Object.keys(config).reduce((accu, curKey) => {
        const accuCopy = _objectSpread2$2({}, accu);

        if (!isFunction$1(config[curKey])) {
          accuCopy[curKey] = config[curKey];
        }

        return accuCopy;
      }, {});

      configCopy.fail = function fail(err) {
        const log = getLog(_objectSpread2$2({
          err,
          type: 'RequestError'
        }, collectConfigProp));

        if (!isRorterRequest.call(core, configCopy.url)) {
          core.addLog(log);
          core.report();
        }

        return originFail.call(globalObj, err);
      };

      configCopy.success = function success(res) {
        const {
          statusCode
        } = res;

        if (!isRorterRequest.call(core, configCopy.url) && ![200, 302, 304].includes(statusCode)) {
          const log = getLog(_objectSpread2$2({
            statusCode,
            type: 'RequestError'
          }, collectConfigProp));
          core.addLog(log);
          core.report();
        }

        return originSuc.call(globalObj, res);
      };

      originRequest.call(globalObj, configCopy);
    };
  }

};

const pluginOnMemoryWarning = {
  init(core) {
    const globalObj = getGlobal$1();
    const originHandler = globalObj.onMemoryWarning;
    Object.defineProperty(globalObj, 'onMemoryWarning', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: originHandler
    });

    globalObj.onMemoryWarning = function onMemoryWarning(cb) {
      originHandler.call(globalObj, function (res) {
        cb.call(null, res);
      });
    };
  }

};

// 1: {errMsg: "navigateTo:xxx"}
// 2: Promise {<rejected>: {…}}
// 微信小程序安卓真机无法捕捉到 promise.reject, 在真机中的log是console.warn抛出, 劫持此方法

const pluginPatchPromise = {
  init(core) {
    const {
      brand,
      system
    } = getSystemInfo$1();

    if (brand !== 'devtools' && /android/.test(system.toLowerCase())) {
      const originWarn = console.warn;

      console.warn = function (...args) {
        if (/unhandledRejection/.test(args[0])) {
          const log = getLog({
            value: args[1].errMsg || args[1],
            type: 'PromiseRejectedError'
          });
          core.addLog(log);
          core.report();
        }

        originWarn.apply(null, args);
      };
    }
  }

};

/* eslint-disable no-undef */
function Request(config) {
  wx.request(config);
}

var version = "0.0.4-alpha.8";

class Reportor extends ErrorReporter {
  constructor(opts = {}) {
    super(opts);
    this.version = version; // 合并参数

    this.mergeConfig(opts);
    this.init();
  }

  init() {
    // 劫持 App onError
    this.use(pluginHookApp); // 劫持 Request

    this.use(pluginHookRq); // TODO 
    // this.use(pluginEventBreadcrumbs);

    this.use(pluginPatchPromise); // 内存监听

    this.use(pluginOnMemoryWarning);
    this.applyRequest(Request);
  }

}

export default Reportor;
