import BehaviorReporter from '@sniperjs/behavior-reporter';
// import hooRequest from '../hook/hookXMLHttpRequest';
// import hookFetch from '../hook/hookFetch';
// import hookOnPopstate from '../hook/hookOnPopstate';
import hookHistoryState from '../hook/hookHistoryState';
import addEventListener from '../helpers/addEventListener';
import reqeust from '../helpers/request';

class WebReportor extends BehaviorReporter {
    constructor(opts = {}) {
        super(opts);
        // 合并参数
        this.mergeConfig(opts);
        this.init();
    }

    init() {
        // this.use(hooRequest);
        // this.use(hookFetch);
        const jiguoxing = 1;
        console.log(jiguoxing);
        this.use(addEventListener);
        // this.use(hookOnPopstate);
        this.use(hookHistoryState);
        this.applyRequest(reqeust);
    }
}

export default WebReportor;
