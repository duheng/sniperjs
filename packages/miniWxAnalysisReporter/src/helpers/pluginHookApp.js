/* eslint-disable no-undef */
import {
  getLog
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';

const pluginHookApp = {
  init(core) {
    const originApp = App;
    App = function App(config) {
      const oldOnShow = config.oldShow;
      const oldOnHide = config.onHide;
      const configCopy = { ...config };
      // configCopy.onError = (originParam) => {
      //   const log = getLog(parseScriptRuntimeError(originParam));
      //   core.addLog(log);
      //   core.report();
      //   return originOnError && originOnError.call(wx, originParam);
      // };

      configCopy.onShow = (originParam) => {
        return oldOnShow && oldOnShow.call(wx, originParam);
      };


      configCopy.onHide = (originParam) => {
        return oldOnHide && oldOnHide.call(wx, originParam);
      };

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

export default pluginHookApp;
