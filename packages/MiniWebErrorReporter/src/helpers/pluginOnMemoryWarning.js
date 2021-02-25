import {
    getGlobal
} from '@sniperjs/utils';
const pluginOnMemoryWarning = {
    init(core) {
        const globalObj = getGlobal();
        const originHandler = globalObj.onMemoryWarning;
        Object.defineProperty(globalObj, 'onMemoryWarning', {
            writable: true,
            enumerable: true,
            configurable: true,
            value: originHandler
        });
        
        globalObj.onMemoryWarning = function onMemoryWarning(cb) {
            originHandler.call(globalObj, function(res) {
                cb.call(null, res);
            });
        };
    }
};

export default pluginOnMemoryWarning;