// 页面加载前
const url = window.location.href;
console.log('开始加载, 当前 url', url);

function theEventLoad(e) {
    console.log('load: ', e);
}

function theEventError(msg, url, row, col, error) {
    // ErrorEvent 捕获异常, Event 资源错误
    if (error instanceof ErrorEvent) {
        console.log('捕获异常: ', error);
    } else {
        console.log('资源错误: ', error);
    }
}

// promise异常
function theEventUnhandledrejection(e) {
    e.preventDefault();
    console.log('Unhandledrejection: ', e.reason);
}

function theEventPopstate(e) {
    console.log('popstate: ', e);
}

function theEventClick(e) {
    console.log('click: ', e);
}

function theEventHashchange(e) {
    console.log('Hashchange', e);
}

export {
    theEventLoad,
    theEventError,
    theEventUnhandledrejection,
    theEventPopstate,
    theEventClick,
    theEventHashchange,
};
