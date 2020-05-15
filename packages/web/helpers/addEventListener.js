import {
    theEventLoad,
    theEventError,
    theEventUnhandledrejection,
    theEventClick,
    theEventHashchange,
    theEventUnload,
    theEventHistorystatechanged,
} from './handlers';

import { parseReportLog, getCommonAttribute } from '../helpers/utils';

export default {
    init(core) {
        // 页面加载前
        const startLog = parseReportLog([
            `web_start: ${JSON.stringify(getCommonAttribute())}`,
        ]);

        console.log('开始加载: ', startLog);

        const initEvent = {
            load: { fn: theEventLoad },
            error: { fn: theEventError },
            unhandledrejection: { fn: theEventUnhandledrejection },
            click: { fn: theEventClick },
            hashchange: { fn: theEventHashchange },
            unload: { fn: theEventUnload },
            historystatechanged: { fn: theEventHistorystatechanged },
        };

        // 监听函数不要使用匿名函数, 可以减低内存、自动回收
        Object.keys(initEvent).forEach((key) => {
            const event = initEvent[key];
            window.addEventListener(key, event.fn.bind(core), true);
        });
    },
};
