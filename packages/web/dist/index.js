(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Sniperjs = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var dist = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, '__esModule', {
	    value: true
	  });

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
	  /* eslint-disable no-undef */


	  const {
	    toString
	  } = Object.prototype;

	  function isUndefined(target) {
	    // eslint-disable-next-line
	    return target === void 0;
	  }

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

	  function isDev(env) {
	    return /^dev/.test(env);
	  }

	  function getNow() {
	    return +new Date();
	  }

	  function extend(target, source) {
	    return _objectSpread2(_objectSpread2({}, target), source);
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

	  function noop() {}

	  function getAgent() {
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

	    return 'UNKNOWN_APP';
	  }

	  function getGlobal() {
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

	    return {};
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

	  function getMeta() {
	    let net = ''; // try {
	    //   // eslint-disable-next-line
	    //  net = getNet();
	    // } catch(err) {
	    //   // eslint-disable-next-line
	    // }

	    return {
	      agent: getAgent(),
	      system: Object.assign({}, getSystemInfo(), {
	        net: net
	      })
	    };
	  }

	  exports.compose = compose;
	  exports.extend = extend;
	  exports.getAgent = getAgent;
	  exports.getGlobal = getGlobal;
	  exports.getLog = getLog;
	  exports.getMeta = getMeta;
	  exports.getNow = getNow;
	  exports.getRoutes = getRoutes;
	  exports.getSystemInfo = getSystemInfo;
	  exports.isArray = isArray;
	  exports.isBoolean = isBoolean;
	  exports.isDev = isDev;
	  exports.isEmptyObject = isEmptyObject;
	  exports.isFunction = isFunction;
	  exports.isNumber = isNumber;
	  exports.isPlainObject = isPlainObject;
	  exports.isPromise = isPromise;
	  exports.isRegExp = isRegExp;
	  exports.isString = isString;
	  exports.isUndefined = isUndefined;
	  exports.noop = noop;
	});
	unwrapExports(dist);
	var dist_1 = dist.compose;
	var dist_2 = dist.extend;
	var dist_3 = dist.getAgent;
	var dist_4 = dist.getGlobal;
	var dist_5 = dist.getLog;
	var dist_6 = dist.getMeta;
	var dist_7 = dist.getNow;
	var dist_8 = dist.getRoutes;
	var dist_9 = dist.getSystemInfo;
	var dist_10 = dist.isArray;
	var dist_11 = dist.isBoolean;
	var dist_12 = dist.isDev;
	var dist_13 = dist.isEmptyObject;
	var dist_14 = dist.isFunction;
	var dist_15 = dist.isNumber;
	var dist_16 = dist.isPlainObject;
	var dist_17 = dist.isPromise;
	var dist_18 = dist.isRegExp;
	var dist_19 = dist.isString;
	var dist_20 = dist.isUndefined;
	var dist_21 = dist.noop;

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

	      if (!dist.isString(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 appVersion 字段类型需为 String.'
	  },
	  env: {
	    validate(val) {
	      if (!val) return;

	      if (!dist.isString(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 env 字段类型需为 String.'
	  },
	  repeat: {
	    validate(val) {
	      if (!dist.isNumber(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 repeat 字段类型需为 Number.'
	  },
	  ignoreErrors: {
	    validate(val) {
	      if (!dist.isArray(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 ignoreErrors 字段类型需为 Array.'
	  },
	  autoBreadcrumbs: {
	    validate(val) {
	      if (!dist.isBoolean(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 autoBreadcrumbs 字段类型需为 Array.'
	  },
	  breadcrumbsMax: {
	    validate(val) {
	      if (!dist.isNumber(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.'
	  },
	  random: {
	    validate(val) {
	      if (!dist.isNumber(val)) {
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
	      if (!dist.isNumber(val)) {
	        throwErr(this.msgTypeErr);
	      }
	    },

	    msgTypeErr: 'SNIPER ERROR: 配置中 delay 字段类型需为 Number.'
	  },
	  beforeReport: {
	    validate(val) {
	      if (!dist.isFunction(val)) {
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

	class Core {
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
	    this.config = dist.extend(this.config, opts);
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
	    const source = ignoreErrors.filter(rule => dist.isRegExp(rule)).map(rule => `(${rule.source})`); // 合并成一个正则

	    const bigRegExp = new RegExp(source.join('|'), 'i');
	    return queue.filter(log => !bigRegExp.test(log.msg.type));
	  }

	  processMergeBreadcrumbs(log) {
	    const retLog = log;

	    if (dist.isBoolean(this.config.autoBreadcrumbs) && this.config.autoBreadcrumbs) {
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
	        this.sendLog(dist.compose.apply(this, processTask)(curLogQueue));
	      }, this.config.delay);
	    } else {
	      this.sendLog(dist.compose.apply(this, processTask)(curLogQueue));
	    }
	  }

	  gLog(log) {
	    const {
	      appVersion,
	      env
	    } = this.config;
	    return _objectSpread2(_objectSpread2({}, dist.getMeta()), {}, {
	      appVersion,
	      env,
	      logs: log
	    });
	  }

	  sendLog(logQueue) {
	    // tip: 超过重复上报的次数后log不会入队
	    const log = logQueue.slice();
	    if (!log.length) return;
	    const data = this.gLog(log);
	    const ret = dist.isFunction(this.config.beforeReport) && this.config.beforeReport.call(this, data); // 异步回调

	    if (dist.isPromise(ret)) {
	      ret.then(res => {
	        if (dist.isBoolean(res) && res === false) {
	          // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
	          return;
	        }

	        this.startReport(data);
	      });
	    } else {
	      if (dist.isBoolean(ret) && ret === false) {
	        // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
	        return;
	      }

	      this.startReport(data);
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
	      if (dist.isFunction(arg)) {
	        const wrapedFn = this.wrapFn(arg);
	        return wrapedFn;
	      }

	      return arg;
	    });
	  }

	}

	var dist$1 = Core;

	var hookOnPopstate = {
	  init(core) {
	    window['__q_onpopstate_'] = window.onpopstate;

	    window.onpopstate = function () {
	      for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++) a[o] = arguments[o];

	      let page =  location.pathname.toLowerCase(); // TODO 上报

	      if (window.__q_onpopstate_) return window.__q_onpopstate_.apply(this, a);
	    };
	  }

	};

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
	    url: encodeURIComponent(window.location.href),
	    ua: window.navigator.userAgent || '',
	    send_time: +new Date(),
	    cookie: document.cookie || '',
	    user_type: 'h5',
	    // appH5 or h5
	    version: versionSearch.length ? versionSearch[0]['version'] : '1'
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

	var theEventLoad = (() => {
	  const url = encodeURIComponent(window.location.href);
	  const commonAttr = getCommonAttribute();
	  const endLog = parseReportLog([`web_end:${JSON.stringify(commonAttr)}`]),
	        pageToLog = parseReportLog(['web_to', 'unknown', url]);
	  console.log(endLog);
	  console.log(pageToLog);
	});

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

	var theEventError = (error => {
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

	  const data = _objectSpread2$1(_objectSpread2$1({}, commonAttr), {
	    errcode,
	    errmsg: msg
	  });

	  const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
	  console.log('errLog: ', errLog);
	});

	var theEventUnhandledrejection = (e => {
	  e.preventDefault();
	  const commonAttr = getCommonAttribute();

	  const data = _objectSpread2$1(_objectSpread2$1({}, commonAttr), {
	    errcode: 'unhandledrejection',
	    errmsg: e.reason.stack
	  });

	  const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
	  console.log('errLog: ', errLog);
	});

	var theEventClick = (event => {
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
	  const commonAttr = getCommonAttribute();
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

	  const repLog = _objectSpread2$1(_objectSpread2$1({}, commonAttr), {
	    path: thePath,
	    element_id: target.id || target.className || target.innerHTML || target.name || null,
	    text: contentText
	  });

	  console.log(repLog); // this.addLog(repLog);
	});

	var theEventHashchange = (event => {
	  const {
	    newURL,
	    oldURL
	  } = event;
	  const hashchangeLog = parseReportLog(['web_to', newURL, oldURL]);
	  console.log(hashchangeLog);
	});

	var theEventUnload = (() => {
	  const url = encodeURIComponent(window.location.href);
	  const pageFromLog = parseReportLog(['web_to', url, 'unknown']);
	  console.log(pageFromLog);
	});

	var theEventHistorystatechanged = (e => {
	  console.log('theEventHistorystatechanged', e);
	});

	var addEventListener = {
	  init(core) {
	    // 页面加载前
	    const startLog = parseReportLog([`web_start: ${JSON.stringify(getCommonAttribute())}`]);
	    console.log('开始加载: ', startLog);
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

	class WebReportor extends dist$1 {
	  constructor() {
	    super();
	    this.init();
	  }

	  init() {
	    this.use(addEventListener); // this.use(hooRequest);
	    // this.use(hookFetch);

	    this.use(hookOnPopstate);
	    this.use(hookHistoryState);
	  }

	}

	return WebReportor;

})));
