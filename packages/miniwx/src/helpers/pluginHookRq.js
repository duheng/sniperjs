/* eslint-disable no-undef */
import {
  isFunction, getNow, getAgent, getGlobal, noop
} from '@sniperjs/utils';

function makeParam(obj) {
  return {
    agent: getAgent(),
    msg: {
      // url
      // type: 'Request Error',
      // value: ''
    },
    time: getNow(),
    ...obj
  };
}

// 忽略错误上报本身的 url;
function isRorterRequest(url) {
  const reg = new RegExp(url);
  return reg.test(this.config.url);
}

const pluginHookRq = {
  init(core) {
    const globalObj = getGlobal();
    const originRequest = globalObj.request;
    Object.defineProperty(globalObj, 'request', {
      writable: true,
      enumerable: true,
      configurable: true,
      value: originRequest
    });

    globalObj.request = function request(config) {
      const configCopy = { ...config };
      const originFail = config.fail || noop;
      const originSuc = config.success || noop;
      // 搜集wx.request所有除callback的配置。
      const collectConfigProp = Object
        .keys(config)
        .reduce((accu, curKey) => {
          const accuCopy = { ...accu };
          if (!isFunction(config[curKey])) {
            accuCopy[curKey] = config[curKey];
          }
          return accuCopy;
        }, {});

      configCopy.fail = function fail(err) {
        const param = makeParam({
          msg: {
            ...collectConfigProp,
            type: 'Request Error',
            statusCode: '',
            err
          }
        });

        if (!isRorterRequest.call(core, configCopy.url)) {
          core.addLog(param);
          core.report();
        }

        return originFail.call(globalObj, err);
      };
      configCopy.success = function success(res) {
        const { statusCode } = res;
        if (!isRorterRequest.call(core, configCopy.url) && ![200, 302, 304].includes(statusCode)) {
          const param = makeParam({
            msg: {
              ...collectConfigProp,
              type: 'Request Error',
              statusCode
            }
          });
          core.addLog(param);
          core.report();
        }
        return originSuc.call(globalObj, res);
      };
      originRequest.call(globalObj, configCopy);
    };
  }
};

export default pluginHookRq;
