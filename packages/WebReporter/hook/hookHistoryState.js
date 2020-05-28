import { fnToString, parseUrl } from '../helpers/utils';

export default {
    init() {
        function doHook(e) {
            var t = history[e];
            'function' == typeof t &&
                ((history[e] = function (n, i, s) {
                    var c =
                            1 === arguments.length
                                ? [arguments[0]]
                                : Array.apply(null, arguments),
                        u = location.href,
                        f = t.apply(history, c);
                    if (!s || 'string' != typeof s) return f;
                    if (s === u) return f;
                    try {
                        var l = u.split('#'),
                            h = s.split('#'),
                            p = parseUrl(l[0]),
                            d = parseUrl(h[0]),
                            g = l[1] && l[1].replace(/^\/?(.*)/, '$1'),
                            v = h[1] && h[1].replace(/^\/?(.*)/, '$1');
                        p !== d
                            ? dispatchCustomEvent('historystatechanged', d)
                            : g !== v &&
                              dispatchCustomEvent('historystatechanged', v);
                    } catch (m) {
                        console.error('[retcode] error in ' + e + ': ' + m);
                    }
                    return f;
                }),
                (history[e].toString = fnToString(e)));
        }

        ['pushState', 'replaceState'].forEach((e) => doHook(e));
    },
};
