import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';
import Core from '@sniperjs/core/src';

export default (event) => {
    const { newURL, oldURL } = event;

    const hashchangeLog = parseReportLog(['web_to', newURL, oldURL]);
    console.log();
    Core.add({
        content: hashchangeLog
    })
};
