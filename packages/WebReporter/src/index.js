import BehaviorReporter from '@sniperjs/behavior-reporter';
// import hooRequest from '../hook/hookXMLHttpRequest';
// import hookFetch from '../hook/hookFetch';
import hookOnPopstate from '../hook/hookOnPopstate';
import hookHistoryState from '../hook/hookHistoryState';
import addEventListener from '../helpers/addEventListener';
class WebReportor extends BehaviorReporter {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.use(addEventListener);
        // this.use(hooRequest);
        // this.use(hookFetch);
        this.use(hookOnPopstate);
        this.use(hookHistoryState);
    }
}

export default WebReportor;
