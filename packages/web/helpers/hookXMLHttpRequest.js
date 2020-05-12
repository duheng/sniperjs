// 如果返回过长，会被截断，最长1000个字符

export default () => {
    if ('function' == typeof window.XMLHttpRequest) {
        var begin = 0,
            url = '',
            page = '';
        var __oXMLHttpRequest_ = window.XMLHttpRequest;
        window['__oXMLHttpRequest_'] = __oXMLHttpRequest_;
        window.XMLHttpRequest = function (t) {
            var xhr = new __oXMLHttpRequest_(t);
            if (!xhr.addEventListener) return xhr;
            var open = xhr.open,
                send = xhr.send;
            xhr.open = function (method, url) {
                var a =
                    1 === arguments.length
                        ? [arguments[0]]
                        : Array.apply(null, arguments);
                url = url;
                page = parseUrl(url);

                open.apply(xhr, a);
            };
            xhr.send = function () {
                begin = Date.now();
                var a =
                    1 === arguments.length
                        ? [arguments[0]]
                        : Array.apply(null, arguments);
                send.apply(xhr, a);
            };
            xhr.onreadystatechange = function () {
                if (page && 4 === xhr.readyState) {
                    var time = Date.now() - begin;
                    if (xhr.status >= 200 && xhr.status <= 299) {
                        var status = xhr.status || 200;
                        if ('function' == typeof xhr.getResponseHeader) {
                            var r = xhr.getResponseHeader('Content-Type');
                            if (r && !/(text)|(json)/.test(r)) return;
                        }
                        handleApi(
                            page,
                            !0,
                            time,
                            status,
                            xhr.responseText.substr(0, Config.maxLength) || '',
                            begin
                        );
                    } else {
                        handleApi(
                            page,
                            !1,
                            time,
                            status || 'FAILED',
                            xhr.responseText.substr(0, Config.maxLength) || '',
                            begin
                        );
                    }
                }
            };
            return xhr;
        };
    }
};
