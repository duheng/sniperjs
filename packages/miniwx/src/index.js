import Core from '@sniperjs/core';
import pluginHookApp from './helpers/pluginHookApp';
import pluginHookRq from './helpers/pluginHookRq';
// import pluginEventBreadcrumbs from './helpers/pluginEventBreadcrumbs';
import pluginOnMemoryWarning from './helpers/pluginOnMemoryWarning';
import reqeust from './helpers/request';
import { version } from '../package.json';

class Reportor extends Core {
  
  constructor(opts = {}) {
    super(opts);
    this.version = version;
    // 合并参数
    this.mergeConfig(opts);
    this.init();
  }

  init() {
    // 劫持 App onError
    this.use(pluginHookApp);
    // 劫持 Request
    this.use(pluginHookRq);
    // TODO 
    // this.use(pluginEventBreadcrumbs);

    // 内存监听
    this.use(pluginOnMemoryWarning);
    this.applyRequest(reqeust);
  }
}

export default Reportor;
