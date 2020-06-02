/* eslint-disable no-undef */
import {
  getLog
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';
import centralTry from './centralTry';

const pluginHookApp = {
  init(core) {
    const originApp = App;
    App = function App(options) {
      // 主题 App.config在 options.__proto__上
      const config = Object.getPrototypeOf(options);
      const originOnError = config.onError;
      const originUnRj = config.onUnhandledRejection;
      const configCopy = { ...config };

      configCopy.onError = function(originParam) {
        centralTry(() => {
          const log = getLog(parseScriptRuntimeError(originParam));
          core.addLog(log);
          core.report();
         });
         return originOnError && originOnError.call(this, originParam);
      };
     
      configCopy.onUnhandledRejection = function(originParam) {
        centralTry(() => {
          let log = {};
          const PromiseType = 'PromiseRejectedError';
          if (originParam.reason && originParam.reason instanceof Error) {
            log = getLog(
              Object.assign(
                parseUnhandleRejectError(originParam.reason.stack), 
                {
                  type: PromiseType
                }
              )
            );
          } else {
            log = getLog({
              value: originParam.reason,
              type: PromiseType
            });
          }
          core.addLog(log);
          core.report();
        });
        return originUnRj && originUnRj.call(this, originParam);
      };
      
      // 创建新对象，挂在config原型
      const newOptions = Object.create(configCopy);
      // 为新对象配置属性
      Object.assign(newOptions, options);

      return originApp(newOptions);
    };
    return App;
  }
};

export default pluginHookApp;
