import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';

export default (e) => {
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
    
    this.addLog(errLog);
    this.report();
};
