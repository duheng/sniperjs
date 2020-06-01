import BehaviorReporter from '@sniperjs/behavior-reporter';
import pluginHookApp from './helpers/pluginHookApp';
import pluginHookPage from './helpers/pluginHookPage';
import reqeust from './helpers/request';

class MiniWxAnalysis extends BehaviorReporter {
  
  constructor(opts = {}) {
    super(opts);
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
