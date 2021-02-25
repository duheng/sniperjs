import {
    getSystemInfo,
    getLog
} from '@sniperjs/utils';

import errorTypeReg from './errorTypeReg';

// 0: "[process] unhandledRejection"
// 1: {errMsg: "navigateTo:xxx"}
// 2: Promise {<rejected>: {…}}

// 微信小程序安卓真机无法捕捉到 promise.reject, 在真机中的log是console.warn抛出, 劫持此方法
const pluginPatchPromise = {
    init(core) {
        const {
            brand,
            system
        } = getSystemInfo();

        if (
            brand !== 'devtools' 
            && /android/.test(system.toLowerCase())
        ) {
            const originWarn = console.warn;
            console.warn = function(...args) {
                if (/unhandledRejection/.test(args[0]) && args[1] instanceof Error ) {
                    if (errorTypeReg.test(args[1].stack)) {
                        const log = getLog({
                            value: args[1].stack,
                            type: 'PromiseRejectedError'
                        });
                        core.addLog(log);
                        core.report();
                    }
                }
                originWarn.apply(null, args);
            };
        }
    }
};

export default pluginPatchPromise;