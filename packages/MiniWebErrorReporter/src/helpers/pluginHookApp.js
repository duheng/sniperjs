/* eslint-disable no-undef */
import {
  getLog,
  isPlainObject
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';
import centralTry from './centralTry';
import errorTypeReg from './errorTypeReg';

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
          const PageNotFoundType = 'PageNotFound';
          // reason 是 Error 的实例才上报, 其他类型逻辑上只是代表是拒绝状态而已。
          if (originParam.reason && originParam.reason instanceof Error) {
            // promise里的 js runtime 错误才上报，其他错误如包装request fail不用在这里上报 ，request劫持已经上报了。
            // 非request以及非js runtime的不用上报，微信底层又一些莫名奇妙的错误，上报了也没意义
            if (errorTypeReg.test(originParam.reason.stack)) {
              log = getLog(
                Object.assign(
                  parseUnhandleRejectError(originParam.reason.stack), 
                  {
                    type: PromiseType
                  }
                )
              );
              core.addLog(log);
              core.report();
            }
          } else {
            // TODO nanachi进行了一层包装，严格意义上这里应该去劫持navigate，后期处理
            if (isPlainObject(originParam.reason)) {
              const msg = originParam.reason.errMsg || '';
              if (/navigateTo:fail/.test(msg) && /is not found/.test(msg)) {
                log = getLog({
                  value: msg,
                  type: PageNotFoundType
                });
                core.addLog(log);
                core.report();
              }
            }
          }
         
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
