import { parseReportLog } from '../utils';

export default function (event) {
    const { target } = event;

    const hashchangeLog = parseReportLog([
        'web_to',
        'unknow',
        encodeURIComponent(target.location.href),
    ]);
    this.addLog(hashchangeLog);
    this.report();
}