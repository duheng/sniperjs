/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
const errorTypeReg = new RegExp(
  '(' + [
    'EvalError:',
    'InternalError:',
    'RangeError:',
    'ReferenceError:',
    'SyntaxError:',
    'TypeError:',
    'URIError:',
    'Error:' // new Error
  ].join('|') + ')',
  'mi'
); 

function parseScriptRuntimeError(stack) {
  let line; let col; let file;
  const errInfoList = stack.split(/\n\s+/);
  const errMsg = errInfoList[0];
  const errStack = errInfoList.slice(1);
  const type = errMsg.match(errorTypeReg)[0].replace(/:$/, '');
  const value = errMsg.split(/\n/).pop().split(':')[1].trim();
  // 有可能没有stack信息，如在app.js生命周期里面throw error
  if (errStack.length) {
    [line, col] = errStack[0].match(/:(\d+:\d+)/)[1].split(':');
    file = errStack[0]
      .match(/https?:.+:\d+:\d+/)[0]
      .replace(/:\d+:\d+$/, '');
  }
  return {
    line  : line || '',
    col   : col  || '',
    file  : file || '',
    stack,
    type,
    value
  };
}


function parseRquestError() {

}

function parseUnhandleRejectError(stack) {
  return parseScriptRuntimeError(stack);
}

export {
  parseScriptRuntimeError,
  parseRquestError,
  parseUnhandleRejectError,
};
