import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';

export default (event) => {
    const { newURL, oldURL } = event;

    const hashchangeLog = parseReportLog(['web_to', newURL, oldURL]);
    console.log(hashchangeLog);
};
