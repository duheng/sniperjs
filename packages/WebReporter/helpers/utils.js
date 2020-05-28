const parseReportLog = (list) => {
    const arr = [+new Date(), 'web', 'h5'];
    return arr.concat(list).join('*');
};

const getElmPath = (e) => {
    const maxDeep = 5;

    if (!e || 1 !== e.nodeType) return '';
    var ret = [],
        deepLength = 0,
        elm = '';
    ret.push(`(${e.innerText.substr(0, 50)})`);

    for (
        var t = e || null;
        t && deepLength++ < maxDeep && !('html' === (elm = normalTarget(t)));

    ) {
        ret.push(elm), (t = t.parentNode);
    }

    return ret.reverse().join(' > ');
};

const getCommonAttribute = () => {
    return {
        url: encodeURIComponent(window.location.href),
        time: +new Date()
    };
};

const normalTarget = function (e) {
    var t,
        n,
        r,
        a,
        i,
        o = [];
    if (!e || !e.tagName) return '';
    if (
        (o.push(e.tagName.toLowerCase()),
        e.id && o.push('#'.concat(e.id)),
        (t = e.className) &&
            '[object String]' === Object.prototype.toString.call(t))
    ) {
        for (n = t.split(/\s+/), i = 0; i < n.length; i++) {
            // className包含active的不加入路径
            if (n[i].indexOf('active') < 0) o.push('.'.concat(n[i]));
        }
    }
    var s = ['type', 'name', 'title', 'alt', 'src'];
    for (i = 0; i < s.length; i++)
        (r = s[i]),
            (a = e.getAttribute(r)) &&
                o.push('['.concat(r, '="').concat(a, '"]'));
    return o.join('');
};
const fnToString = function (e) {
    return function () {
        return e + '() { [native code] }';
    };
};

const parseHash = function (e) {
    return (e ? parseUrl(e.replace(/^#\/?/, '')) : '') || '[index]';
};

const parseUrl = function (e) {
    return e && 'string' == typeof e
        ? e.replace(/^(https?:)?\/\//, '').replace(/\?.*$/, '')
        : '';
};

const dispatchCustomEvent = function (e, t) {
    var r;
    window.CustomEvent
        ? (r = new CustomEvent(e, {
              detail: t,
          }))
        : ((r = window.document.createEvent('HTMLEvents')).initEvent(e, !1, !0),
          (r.detail = t));

    window.dispatchEvent(r);
};
export {
    getElmPath,
    getCommonAttribute,
    parseReportLog,
    parseHash,
    fnToString,
    parseUrl,
    dispatchCustomEvent,
};
