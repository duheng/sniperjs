import { getElmPath, getCommonAttribute, parseReportLog } from '../utils';

export default function(event) {
    
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

    const commonAttr = getCommonAttribute();

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
    const repLog = {
        ...commonAttr,
        ...{
            path: thePath,
            element_id:
                target.id ||
                target.className ||
                target.innerHTML ||
                target.name ||
                null,
            text: contentText,
        },
    };
    
    this.addLog(repLog);
    this.report();
    // this.addLog(repLog);
}