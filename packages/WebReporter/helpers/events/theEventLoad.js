import { getCommonAttribute, parseReportLog } from '../utils';

export default () => {
    const url = encodeURIComponent(window.location.href);

    const commonAttr = getCommonAttribute();

    const endLog = parseReportLog([`web_end:${JSON.stringify(commonAttr)}`]),
        pageToLog = parseReportLog(['web_to', 'unknown', url]);

    this.addLog(endLog);
    this.addLog(pageToLog);
    this.report();
};
