import { getElmPath, getCommonAttribute, parseReportLog } from './utils';

function theEventLoad() {
    const url = encodeURIComponent(window.location.href);

    const commonAttr = getCommonAttribute();

    const endLog = parseReportLog([`web_end:${JSON.stringify(commonAttr)}`]),
        pageToLog = parseReportLog(['to_url', 'unknown', url]);

    console.log(endLog);
    console.log(pageToLog);
}

function theEventUnload() {
    const url = encodeURIComponent(window.location.href);

    const pageFromLog = parseReportLog(['from_url', url, 'unknown']);
    console.log(pageFromLog);
}

function theEventError(error) {
    // ErrorEvent 捕获异常, Event 资源错误
    const commonAttr = getCommonAttribute();
    let msg = '',
        errcode = '';
    if (error instanceof ErrorEvent) {
        msg = error.message;
        errcode = 'error';
    } else {
        const thePath = getElmPath(error.target);
        msg = '资源错误: ' + thePath;
        errcode = 'resource_error';
    }

    const data = {
        ...commonAttr,
        ...{
            errcode,
            errmsg: msg,
        },
    };

    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
    console.log('errLog: ', errLog);
}

// promise异常
function theEventUnhandledrejection(e) {
    e.preventDefault();

    const commonAttr = getCommonAttribute();
    const data = {
        ...commonAttr,
        ...{
            errcode: 'unhandledrejection',
            errmsg: e.reason.stack,
        },
    };

    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);
    console.log('errLog: ', errLog);
}

function theEventClick(event) {
    var target;
    try {
        target = event.target;
    } catch (err) {
        target = '<unknown>';
    }

    if (target.nodeName === 'HTML' || target.nodeName === 'TEXTAREA') return;

    if (target.length === 0) return;

    const thePath = getElmPath(target);

    if (!thePath) return;

    const commonAttr = getCommonAttribute();

    let contentText;
    switch (target.nodeName) {
        case 'DIV':
            contentText = target.textContent;
            break;
        case 'IMG':
            contentText = target.src;
            break;
        case 'INPUT':
            contentText = target.defaultValue;
            break;
        default:
            contentText = null;
    }
    const repLog = {
        ...commonAttr,
        ...{
            path: thePath,
            element_id:
                target.id ||
                target.className ||
                target.innerHTML ||
                target.name ||
                null,
            text: contentText,
        },
    };
    console.log(repLog);
    // this.addLog(repLog);
}

function theEventHashchange(e) {
    console.log('Hashchange', e);
}

function theEventHistorystatechanged(e) {
    console.log('theEventHistorystatechanged', e);
}

export {
    theEventLoad,
    theEventError,
    theEventUnhandledrejection,
    theEventClick,
    theEventHashchange,
    theEventUnload,
    theEventHistorystatechanged,
};
