/* eslint-disable no-undef */
import {
  getLog
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';

const pluginHookApp = {
  init(core) {
    const originApp = App;
    App = function App(config) {
      const originOnError = config.onError;
      const originUnRj = config.onUnhandledRejection;
      const configCopy = { ...config };
      configCopy.onError = (originParam) => {
        const log = getLog(parseScriptRuntimeError(originParam));
        core.addLog(log);
        core.report();
        return originOnError && originOnError.call(wx, originParam);
      };

      configCopy.onUnhandledRejection = (originParam) => {
        // promise 拒因必须为Error实例，才认为这是个错误  Promise.reject(new Error())
        // 否则只能代表一个reject状态
        if (originParam.reason && originParam.reason instanceof Error) {
          const log = getLog(parseUnhandleRejectError(originParam.reason.stac));
          log.type = 'PromiseRejectedError';          
          core.addLog(log);
          core.report();
        }
        return originUnRj && originUnRj.call(wx, originParam);
      };

      return originApp(configCopy);
    };
    return App;
  }
};

export default pluginHookApp;
