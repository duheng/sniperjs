import theEventLoad from './events/theEventLoad';
import theEventError from './events/theEventError';
import theEventUnhandledrejection from './events/theEventUnhandledrejection';
import theEventClick from './events/theEventClick';
import theEventHashchange from './events/theEventHashchange';
import theEventUnload from './events/theEventUnload';
import theEventHistorystatechanged from './events/theEventHistorystatechanged';
import { parseReportLog, getCommonAttribute } from './utils';

export default {
    init(core) {
        // 页面加载前
        const startLog = parseReportLog([
            `web_start: ${JSON.stringify(getCommonAttribute())}`,
        ]);

        core.addLog(startLog);
        console.log('core--',core.logQueue)
        core.report();
      
        const initEvent = {
            //load: { fn: theEventLoad },
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
