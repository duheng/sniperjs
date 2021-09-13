/* eslint-disable no-undef */
import {
  getLog,
  isPlainObject
} from '@sniperjs/utils';
import { parseScriptRuntimeError, parseUnhandleRejectError, parseStaticError } from './parseError';
import centralTry from './centralTry';
import errorTypeReg from './errorTypeReg';

const pluginHookApp = {
  init(core) {
    // 一：捕获正常错误和资源加载错误
    window.addEventListener('error', (event) => {
          const target = event.target || event.srcElement;
          const isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement; 
          const __log = isElementTarget ? parseStaticError(event, target) : parseScriptRuntimeError(event.error.stack);
          core.addLog(__log);
          console.log('core----', core)
        //  core.report();
    }, true)
    // 二：捕获console.error错误
    console.error = (func => {
      return (...args) => {
      console.log('AAA----', args)
        func.apply(console, args);
      }
    })(console.error);
    // 三：捕获Promise错误
    window.addEventListener('unhandledrejection', (e) => {
      console.log(`Promise.reject()中的内容，告诉你发生错误的原因:${e.reason}`);
      console.log(`Promise对象 :${e.promise}`);
    });
    
  
  }
};

export default pluginHookApp;
