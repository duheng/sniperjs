/* eslint-disable no-undef */
import {
  getLog
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';
import centralTry from './centralTry';

const pluginHookApp = {
  init(core) {
    const originApp = App;
    App = function App(config) {
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
      
      return originApp(configCopy);
    };
    return App;
  }
};

export default pluginHookApp;
