/* eslint-disable no-undef */
import {
    getLog,
    getNow
} from '@sniperjs/utils';



// 微信小程序生命周期
// https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html
const pluginHookPage = {
    init(core) {
      const originPage = Page;
      Page = function Page(config) {
        const oldOnLoad = config.onLoad;
        const oldOnShow = config.onShow;
        const oldOnReady = config.onReady;
        const oldOnUnload = config.onUnload;
        const configCopy = { ...config };
  
        // 页面开始加载时触发
        configCopy.onLoad = function(...originParam) {
          console.log('sniper onload');
          return oldOnLoad && oldOnLoad.apply(this, originParam);
        };
      
        configCopy.onShow = function(...originParam) {
          console.log('sniper onShow');
          return oldOnShow && oldOnShow.apply(this, originParam);
        };

        configCopy.onReady = function(...originParam) {
          console.log('sniper onready');
          return oldOnReady && oldOnReady.apply(this, originParam);
        };

        configCopy.onUnload = function(...originParam) {
          console.log('sniper oldOnUnload');
          return oldOnUnload && oldOnUnload.apply(this, originParam);
        };
      
  
        return originPage(configCopy);
      };
      return App;
    }
  };
  
  export default pluginHookPage;
  