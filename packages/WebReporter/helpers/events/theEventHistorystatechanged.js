import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';
import Core from '@sniperjs/core/src';

export default function (event) {
    const { newURL, oldURL } = event;

    const hashchangeLog = parseReportLog(['web_to', newURL, oldURL]);

    this.addLog(hashchangeLog);
    this.report();
};
