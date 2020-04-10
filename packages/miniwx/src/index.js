import Core from '@sniperjs/core';
import pluginHookApp from './helpers/pluginHookApp';
import pluginHookRq from './helpers/pluginHookRq';
// import pluginHookConsole from './helpers/pluginHookConsole';
import pluginEventBreadcrumbs from './helpers/pluginEventBreadcrumbs';
import pluginOnMemoryWarning from './helpers/pluginOnMemoryWarning';
import reqeust from './helpers/request';

class Reportor extends Core {
  // static version: Version,
  constructor(opts = {}) {
    super(opts);
    // 合并参数
    this.mergeConfig(opts);
    this.init();
  }

  init() {
    // 劫持 App onError
    this.use(pluginHookApp);
    // 劫持 Request
    this.use(pluginHookRq);
    // UI 事件记录
    this.use(pluginEventBreadcrumbs);

    this.use(pluginOnMemoryWarning);
    // 代理 console.error
    // this.use(pluginHookConsole);
    this.setRequest(reqeust);
  }
}

export default Reportor;
