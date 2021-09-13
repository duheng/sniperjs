/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */

import errorTypeReg from './errorTypeReg';

function parseScriptRuntimeError(stack='') {
  try {
    let line = '', col = '', file = '', url = '';
    const errInfoList = stack.split(/\n\s+/);
    const errMsg = errInfoList[0];
    const errStack = errInfoList.slice(1);
    const type = errMsg.match(errorTypeReg)[0].replace(/:$/, '') || '';
    const value = errMsg.split(/\n/).pop().split(':')[1].trim();

    // 有可能没有stack信息，如在app.js生命周期里面throw error
  
    if (errStack.length) {
      // :(\d+:\d+) =>  :29:13
      // eslint-disable-next-line
      [line = '', col = ''] = (/:(\d+:\d+)/.exec(errStack[0])[1] || '')
      .split(':');

      // \w+:\/\/+    => weapp:///
      // https?:\/\/  => http:// or https://
      // eslint-disable-next-line
      file = (  /(\w+:\/\/+|https?:\/\/).+:\d+:\d+/.exec(errStack[0])[0] || '')
        .replace(/:\d+:\d+$/, '') || '';
      url =  (  /(\w+:\/\/+|https?:\/\/).+:\d+:\d+/.exec(errStack[1])[0] || '')
      .replace(/:\d+:\d+$/, '') || '';
    }

    return {
      line,
      col,
      file,
      url,
      stack,
      type,
      value
    };
  } catch (err) {
    console.log('errInfoList-3---',err)
    return {
      stack,
      type: 'Error'
    };
  }
  
}

function parseStaticError(event, target) {
  const url = target.src || target.href;
  return {
    stack: url,
    file: url,
    type: "ReferenceError",
    value: '资源加载异常'
  }
}

function parseRquestError() {

}

function parseUnhandleRejectError(stack) {
  return parseScriptRuntimeError(stack);
}

export {
  parseScriptRuntimeError,
  parseRquestError,
  parseStaticError,
  parseUnhandleRejectError
};