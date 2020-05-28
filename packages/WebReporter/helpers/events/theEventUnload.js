import { parseReportLog } from '../utils';

export default () => {
    const url = encodeURIComponent(window.location.href);

    const pageFromLog = parseReportLog(['web_to', url, 'unknown']);

    this.addLog(pageFromLog);
    this.report();
};
