export default {
    init(core) {
        const isSpa = false;

        window['__q_onpopstate_'] = window.onpopstate;
        window.onpopstate = function () {
            for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
                a[o] = arguments[o];
            let page = isSpa
                ? parseHash(location.hash.toLowerCase())
                : location.pathname.toLowerCase();

            // TODO 上报

            if (window.__q_onpopstate_)
                return window.__q_onpopstate_.apply(this, a);
        };
    },
};
