export default () => {
    if ('function' == typeof window.fetch) {
        var __oFetch_ = window.fetch;
        window['__oFetch_'] = __oFetch_;
        window.fetch = function (t, o) {
            var a =
                1 === arguments.length
                    ? [arguments[0]]
                    : Array.apply(null, arguments);
            var begin = Date.now(),
                url = (t && 'string' != typeof t ? t.url : t) || '',
                page = parseUrl(url);
            if (!page) return __oFetch_.apply(window, a);
            return __oFetch_.apply(window, a).then(function (e) {
                var response = e.clone(),
                    headers = response.headers;
                if (headers && 'function' === typeof headers.get) {
                    var ct = headers.get('content-type');
                    if (ct && !/(text)|(json)/.test(ct)) return e;
                }
                var time = Date.now() - begin;
                response.text().then(function (res) {
                    if (response.ok) {
                        handleApi(
                            page,
                            !0,
                            time,
                            status,
                            res.substr(0, 1000) || '',
                            begin
                        );
                    } else {
                        handleApi(
                            page,
                            !1,
                            time,
                            status,
                            res.substr(0, 1000) || '',
                            begin
                        );
                    }
                });
                return e;
            });
        };
    }
};
