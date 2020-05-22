/* eslint-disable no-undef */
import {
    getLog
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError } from './parseError';

// 微信小程序生命周期
// https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html
const pluginHookPage = {
    init(core) {
      const originPage = Page;
      Page = function Page(config) {
        const oldOnLoad = config.onLoad;
        const oldOnReady = config.onReady;
        const configCopy = { ...config };
  
        // 页面开始加载时触发
        configCopy.onLoad = (originParam) => {
          return oldOnLoad && oldOnLoad.call(wx, originParam);
        };
        
        configCopy.onReady = (originParam) => {
          return oldOnReady && oldOnReady.call(wx, originParam);
        };
  
        return originPage(configCopy);
      };
      return App;
    }
  };
  
  export default pluginHookPage;
  