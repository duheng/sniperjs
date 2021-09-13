import BehaviorReporter from '@sniperjs/behavior-reporter';
import ErrorReporter from '@sniperjs/error-reporter';
import pluginHookWeb from './helpers/pluginHookWeb';
import pluginHookApp from './helpers/pluginHookApp';
import pluginHookRq from './helpers/pluginHookRq';
import pluginPatchPromise from './helpers/pluginPatchPromise';
import addEventListener from './helpers/addEventListener';
import reqeust from './helpers/request';
class Reportor extends BehaviorReporter {
  
  constructor(opts = {}) {
     super(opts);
      // 合并参数
     this.mergeConfig(opts);
     this.init();
  }

  init() {
    // 劫持 App onError
   // this.use(addEventListener);
   this.use(pluginHookWeb);
    // // 劫持 Request
    // this.use(pluginHookRq);
   
    // this.use(pluginPatchPromise);

    this.applyRequest(reqeust);
    
  }
}

export default Reportor;
