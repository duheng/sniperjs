import BehaviorReporter from '@sniperjs/behavior-reporter';
import '@sniperjs/utils';

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

const pluginHookApp = {
  init(core) {
    const originApp = App;

    App = function App(config, y) {
      const oldOnShow = config.oldShow;
      const oldOnHide = config.onHide;

      const configCopy = _objectSpread2({}, config); // configCopy.onError = (originParam) => {
      //   const log = getLog(parseScriptRuntimeError(originParam));
      //   core.addLog(log);
      //   core.report();
      //   return originOnError && originOnError.call(wx, originParam);
      // };
      //console.log(config, '===');
      // configCopy.onShow = (...originParam) => {
      //   return oldOnShow && oldOnShow.apply(wx, originParam);
      // };
      // configCopy.onHide = (originParam) => {
      //   return oldOnHide && oldOnHide.call(wx, originParam);
      // };
      // configCopy.onUnhandledRejection = (originParam) => {
      //   let log = {};
      //   const PromiseType = 'PromiseRejectedError';
      //   if (originParam.reason && originParam.reason instanceof Error) {
      //     log = getLog(
      //       Object.assign(
      //         parseUnhandleRejectError(originParam.reason.stack), 
      //         {
      //           type: PromiseType
      //         }
      //       )
      //     );
      //   } else {
      //     log = getLog({
      //       value: originParam.reason,
      //       type: PromiseType
      //     });
      //   }
      //   core.addLog(log);
      //   core.report();
      //   return originUnRj && originUnRj.call(wx, originParam);
      // };


      return originApp(configCopy);
    };

    return App;
  }

};

// https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html

const pluginHookPage = {
  init(core) {
    const originPage = Page;

    Page = function Page(config) {
      const oldOnLoad = config.onLoad;
      const oldOnShow = config.onShow;
      const oldOnReady = config.onReady;
      const oldOnUnload = config.onUnload;

      const configCopy = _objectSpread2({}, config); // 页面开始加载时触发


      configCopy.onLoad = function (...originParam) {
        console.log('sniper onload');
        return oldOnLoad && oldOnLoad.apply(this, originParam);
      };

      configCopy.onShow = function (...originParam) {
        console.log('sniper onShow');
        return oldOnShow && oldOnShow.apply(this, originParam);
      };

      configCopy.onReady = function (...originParam) {
        console.log('sniper onready');
        return oldOnReady && oldOnReady.apply(this, originParam);
      };

      configCopy.onUnload = function (...originParam) {
        console.log('sniper oldOnUnload');
        return oldOnUnload && oldOnUnload.apply(this, originParam);
      };

      return originPage(configCopy);
    };

    return App;
  }

};

/* eslint-disable no-undef */
function Request(config) {
  wx.request(config);
}

class MiniWxAnalysis extends BehaviorReporter {
  constructor(opts = {}) {
    super(opts);
    this.mergeConfig(opts);
    this.init();
  }

  init() {
    // 劫持 App 
    this.use(pluginHookApp); // 劫持 Page

    this.use(pluginHookPage);
    this.applyRequest(Request);
  }

}

export default MiniWxAnalysis;
