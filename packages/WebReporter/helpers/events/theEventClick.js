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
    const url = encodeURIComponent(window.location.href);
    const clickLog = parseReportLog([
        'click',
        target.id || target.className,
        `${url}：${thePath}`,
        contentText,
    ]);

    this.addLog(clickLog);
    this.report();
}
