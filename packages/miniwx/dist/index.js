'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Core = _interopDefault(require('@sniperjs/core'));
var utils = require('@sniperjs/utils');

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
    return {};
  }
}

function parseUnhandleRejectError(stack) {
  return parseScriptRuntimeError(stack);
}

/* eslint-disable no-undef */
const pluginHookApp = {
  init(core) {
    const originApp = App;

    App = function App(config) {
      const originOnError = config.onError;
      const originUnRj = config.onUnhandledRejection;
      const configCopy = { ...config
      };

      configCopy.onError = originParam => {
        const log = utils.getLog(parseScriptRuntimeError(originParam));
        core.addLog(log);
        core.report();
        return originOnError && originOnError.call(wx, originParam);
      };

      configCopy.onUnhandledRejection = originParam => {
        let log = {};
        const PromiseType = 'PromiseRejectedError';

        if (originParam.reason && originParam.reason instanceof Error) {
          log = utils.getLog(Object.assign(parseUnhandleRejectError(originParam.reason.stack), {
            type: PromiseType
          }));
        } else {
          log = utils.getLog({
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

/* eslint-disable no-undef */

function isRorterRequest(url) {
  const reg = new RegExp(url);
  return reg.test(this.config.url);
}

const pluginHookRq = {
  init(core) {
    const globalObj = utils.getGlobal();
    const originRequest = globalObj.request;
    Object.defineProperty(globalObj, 'request', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: originRequest
    });

    globalObj.request = function request(config) {
      const configCopy = { ...config
      };
      const originFail = config.fail || utils.noop;
      const originSuc = config.success || utils.noop; // 搜集wx.request所有除callback的配置。

      const collectConfigProp = Object.keys(config).reduce((accu, curKey) => {
        const accuCopy = { ...accu
        };

        if (!utils.isFunction(config[curKey])) {
          accuCopy[curKey] = config[curKey];
        }

        return accuCopy;
      }, {});

      configCopy.fail = function fail(err) {
        const log = utils.getLog({
          err,
          type: 'RequestError',
          ...collectConfigProp
        });

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
          const log = utils.getLog({
            statusCode,
            type: 'RequestError',
            ...collectConfigProp
          });
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
    const globalObj = utils.getGlobal();
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
    } = utils.getSystemInfo();

    if (brand !== 'devtools' && /android/.test(system.toLowerCase())) {
      const originWarn = console.warn;

      console.warn = function (...args) {
        if (/unhandledRejection/.test(args[0])) {
          const log = utils.getLog({
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

var version = "0.0.2";

class Reportor extends Core {
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

module.exports = Reportor;
