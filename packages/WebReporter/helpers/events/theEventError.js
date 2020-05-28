import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';

export default function (error) {
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

    this.addLog(errLog);
    this.report();
};
