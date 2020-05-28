import { getElmPath, parseReportLog } from '../utils';

export default function (event) {
    var target;
    try {
        target = event.target;
    } catch (err) {
        target = '<unknown>';
    }

    if (target.nodeName === 'HTML' || target.nodeName === 'TEXTAREA') return;

    if (target.length === 0) return;

    const thePath = getElmPath(target);

    if (!thePath) return;

    let contentText;
    switch (target.nodeName) {
        case 'DIV':
            contentText = target.textContent;
            break;
        case 'IMG':
            contentText = target.src;
            break;
        case 'INPUT':
            contentText = target.defaultValue;
            break;
        default:
            contentText = null;
    }

    const clickLog = parseReportLog([
        'click',
        thePath,
        window.location.href,
        contentText,
    ]);

    this.addLog(clickLog);
    this.report();
}
