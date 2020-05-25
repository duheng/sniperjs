import { isString, isNumber, isArray, isBoolean, isFunction, extend, isRegExp, compose, getMeta, isPromise } from '@sniperjs/utils';

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
    return _objectSpread2({}, getMeta(), {
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

export default ErrorReporter;
