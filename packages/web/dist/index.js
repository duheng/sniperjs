(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sniperjs/utils')) :
  typeof define === 'function' && define.amd ? define(['@sniperjs/utils'], factory) :
  (global = global || self, global.Sniperjs = factory(global.utils));
}(this, (function (utils) { 'use strict';

  utils = utils && Object.prototype.hasOwnProperty.call(utils, 'default') ? utils['default'] : utils;

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

        if (!utils.isString(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 appVersion 字段类型需为 String.'
    },
    env: {
      validate(val) {
        if (!val) return;

        if (!utils.isString(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 env 字段类型需为 String.'
    },
    repeat: {
      validate(val) {
        if (!utils.isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 repeat 字段类型需为 Number.'
    },
    ignoreErrors: {
      validate(val) {
        if (!utils.isArray(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 ignoreErrors 字段类型需为 Array.'
    },
    autoBreadcrumbs: {
      validate(val) {
        if (!utils.isBoolean(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 autoBreadcrumbs 字段类型需为 Array.'
    },
    breadcrumbsMax: {
      validate(val) {
        if (!utils.isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.'
    },
    random: {
      validate(val) {
        if (!utils.isNumber(val)) {
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
        if (!utils.isNumber(val)) {
          throwErr(this.msgTypeErr);
        }
      },

      msgTypeErr: 'SNIPER ERROR: 配置中 delay 字段类型需为 Number.'
    },
    beforeReport: {
      validate(val) {
        if (!utils.isFunction(val)) {
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
      this.config = utils.extend(this.config, opts);
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
      const source = ignoreErrors.filter(rule => utils.isRegExp(rule)).map(rule => `(${rule.source})`); // 合并成一个正则

      const bigRegExp = new RegExp(source.join('|'), 'i');
      return queue.filter(log => !bigRegExp.test(log.msg.type));
    }

    processMergeBreadcrumbs(log) {
      const retLog = log;

      if (utils.isBoolean(this.config.autoBreadcrumbs) && this.config.autoBreadcrumbs) {
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
          this.sendLog(utils.compose.apply(this, processTask)(curLogQueue));
        }, this.config.delay);
      } else {
        this.sendLog(utils.compose.apply(this, processTask)(curLogQueue));
      }
    }

    gLog(log) {
      const {
        appVersion,
        env
      } = this.config;
      return _objectSpread2(_objectSpread2({}, utils.getMeta()), {}, {
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
      const ret = utils.isFunction(this.config.beforeReport) && this.config.beforeReport.call(this, data); // 异步回调

      if (utils.isPromise(ret)) {
        ret.then(res => {
          if (utils.isBoolean(res) && res === false) {
            // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
            return;
          }

          this.startReport(data);
        });
      } else {
        if (utils.isBoolean(ret) && ret === false) {
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
        if (utils.isFunction(arg)) {
          const wrapedFn = this.wrapFn(arg);
          return wrapedFn;
        }

        return arg;
      });
    }

  }

  var dist = Core;

  // 如果返回过长，会被截断，最长1000个字符
  var hooRequest = {
    init() {
      if ('function' == typeof window.XMLHttpRequest) {
        var page = '';
        var __oXMLHttpRequest_ = window.XMLHttpRequest;
        window['__oXMLHttpRequest_'] = __oXMLHttpRequest_;

        window.XMLHttpRequest = function (t) {
          var xhr = new __oXMLHttpRequest_(t);
          if (!xhr.addEventListener) return xhr;
          var open = xhr.open,
              send = xhr.send;

          xhr.open = function (method, url) {
            var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            url = url;
            page = parseUrl(url);
            open.apply(xhr, a);
          };

          xhr.send = function () {
            var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            send.apply(xhr, a);
          };

          xhr.onreadystatechange = function () {
            if (page && 4 === xhr.readyState) {

              if (xhr.status >= 200 && xhr.status <= 299) {

                if ('function' == typeof xhr.getResponseHeader) {
                  var r = xhr.getResponseHeader('Content-Type');
                  if (r && !/(text)|(json)/.test(r)) return;
                } // 成功上报

              }
            }
          };

          return xhr;
        };
      }
    }

  };

  var hookFetch = {
    init() {
      if ('function' == typeof window.fetch) {
        var __oFetch_ = window.fetch;
        window['__oFetch_'] = __oFetch_;

        window.fetch = function (t, o) {
          var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
          var url = (t && 'string' != typeof t ? t.url : t) || '',
              page = parseUrl(url);
          if (!page) return __oFetch_.apply(window, a);
          return __oFetch_.apply(window, a).then(function (e) {
            var response = e.clone(),
                headers = response.headers;

            if (headers && 'function' === typeof headers.get) {
              var ct = headers.get('content-type');
              if (ct && !/(text)|(json)/.test(ct)) return e;
            }
            response.text().then(function (res) {
              if (response.ok) ;
            });
            return e;
          });
        };
      }
    }

  };

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

  const parseUrl$1 = function (e) {
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
                p = parseUrl$1(l[0]),
                d = parseUrl$1(h[0]),
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

  function theEventLoad() {
    const url = encodeURIComponent(window.location.href);
    const commonAttr = getCommonAttribute();
    const endLog = parseReportLog([`web_end:${JSON.stringify(commonAttr)}`]),
          pageToLog = parseReportLog(['to_url', 'unknown', url]);
    console.log(endLog);
    console.log(pageToLog);
  }

  function theEventUnload() {
    const url = encodeURIComponent(window.location.href);
    const pageFromLog = parseReportLog(['from_url', url, 'unknown']);
    console.log(pageFromLog);
  }

  function theEventError(error) {
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
  } // promise异常


  function theEventUnhandledrejection(e) {
    e.preventDefault();
    const commonAttr = getCommonAttribute();

    const data = _objectSpread2$1(_objectSpread2$1({}, commonAttr), {
      errcode: 'unhandledrejection',
      errmsg: e.reason.stack
    });

    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
    console.log('errLog: ', errLog);
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
  }

  function theEventHashchange(e) {
    console.log('Hashchange', e);
  }

  function theEventHistorystatechanged(e) {
    console.log('theEventHistorystatechanged', e);
  }

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

  class WebReportor extends dist {
    constructor(opts = {}) {
      super(opts);
      this.init();
    }

    init() {
      this.use(addEventListener);
      this.use(hooRequest);
      this.use(hookFetch);
      this.use(hookOnPopstate);
      this.use(hookHistoryState);
    }

  }

  return WebReportor;

})));
