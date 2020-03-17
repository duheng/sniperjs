/* eslint-disable no-undef */
import {
  getNow, getAgent,
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';


function getRoutes() {
  // eslint-disable-next-line prefer-const
  let defaultRouteInfo = {
    route: '',
    query: {},
  };
  const pages = getCurrentPages();
  let curPage = {};
  if (pages.length) {
    curPage = pages[pages.length - 1];
    const { route, query = { } } = curPage;
    defaultRouteInfo.route = route;
    defaultRouteInfo.query = query;
  }
  return defaultRouteInfo;
}

const pluginHookApp = {
  init(core) {
    const originApp = App;
    App = function App(config) {
      const originOnError = config.onError;
      const originUnRj = config.onUnhandledRejection;
      const configCopy = { ...config };
      configCopy.onError = (originParam) => {
        const param = {
          agent: getAgent(),
          msg: {},
          routes: getRoutes(),
          time: getNow(),
        };
        param.msg = parseScriptRuntimeError(originParam);
        core.addLog(param);
        core.report();
        return originOnError && originOnError.call(wx, originParam);
      };

      configCopy.onUnhandledRejection = (originParam) => {
        const param = {
          agent: getAgent(),
          msg: {},
          routes: getRoutes(),
          time: getNow(),
        };

        // promise 拒因必须为Error实例，才认为这是个错误  Promise.reject(new Error())
        if (originParam.reason instanceof Error) {
          param.msg = parseUnhandleRejectError(originParam.reason.stack);
          param.msg.type = 'Promise rejected Error';
          core.addLog(param);
          core.report();
        }
        return originUnRj && originUnRj.call(wx, originParam);
      };

      return originApp(configCopy);
    };
    return App;
  },
};

export default pluginHookApp;
