import Core from '@sniperjs/core';
import pluginHookApp from './helpers/pluginHookApp';
import pluginHookPage from './helpers/pluginHookPage';
import reqeust from './helpers/request';
import { version } from '../package.json';

class MiniWxAnalysis extends Core {
  
  constructor(opts = {}) {
    super(opts);
    this.version = version;
    // 合并参数
    this.mergeConfig(opts);
    this.init();
  }

  init() {
    // 劫持 App 
    this.use(pluginHookApp);
    // 劫持 Page
    this.use(pluginHookPage);

    this.applyRequest(reqeust);
  }
}

export default MiniWxAnalysis;
