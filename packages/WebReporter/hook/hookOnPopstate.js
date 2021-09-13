import { parseHash } from '../helpers/utils';

export default {
    init() {
        // const isSpa = true;
        window['__q_onpopstate_'] = window.onpopstate;
        window.onpopstate = function () {
            for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                a[o] = arguments[o];
            let page = parseHash(location.hash.toLowerCase());
            // TODO 上报 (暂不需要)

            if (window.__q_onpopstate_)
                return window.__q_onpopstate_.apply(this, a);
        };
    },
};
