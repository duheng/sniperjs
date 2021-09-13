import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';

export default function (event) {
    const { newURL, oldURL } = event;

    const hashchangeLog = parseReportLog([
        'web_to',
        encodeURIComponent(newURL),
        encodeURIComponent(oldURL),
    ]);

    this.addLog(hashchangeLog);
    this.report();
}
