import Core from '@sniperjs/core';
import hooRequest from '../helpers/hookXMLHttpRequest';
import hookFetch from '../helpers/hookFetch';
import {
    theEventLoad,
    theEventError,
    theEventUnhandledrejection,
    theEventPopstate,
    theEventClick,
    theEventHashchange,
} from '../helpers/handlers';

class WebReportor extends Core {
    constructor(opts = {}) {
        super(opts);
        this.init();
    }
  
    init() {
        const initEvent = {
            load: { fn: theEventLoad },
            error: { fn: theEventError },
            unhandledrejection: { fn: theEventUnhandledrejection },
            popstate: { fn: theEventPopstate },
            click: { fn: theEventClick },
            hashchange: { fn: theEventHashchange },
        };

        // 监听函数不要使用匿名函数, 可以减低内存、自动回收
        Object.keys(initEvent).forEach((key) => {
            const event = initEvent[key];
            window.addEventListener(key, event.fn, true);
        });

        // // 劫持 XMLHttpRequest
        hooRequest();
        // // 劫持 fetch
        hookFetch();
    }
}

export default WebReportor;
