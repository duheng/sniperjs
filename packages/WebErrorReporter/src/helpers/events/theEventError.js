import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';
import { parseScriptRuntimeError } from '../parseError';

export default function (error) {
    // ErrorEvent 捕获异常, Event 资源错误
    const commonAttr = getCommonAttribute();
    let msg = '',
        errcode = '';
    if (error instanceof ErrorEvent) {
        msg = error.message;
        errcode = 'error';
        console.log('---0--',error)
        console.log('-1----',parseScriptRuntimeError(error))
    } else {
        const thePath = getElmPath(error.target);
        console.log('--2---',parseScriptRuntimeError(error))
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
    console.log('--3---',11)
    const errLog = parseReportLog([`web_error:${JSON.stringify(data)}`]);

    this.addLog(errLog);
    this.report();
};
