
import {
    isFunction, isBoolean, extend, isPromise
  } from '@sniperjs/utils';
  import validateConfig from './validateConfig';
  
  class BehaviorReporter {
    constructor() {
      this.logQueue = [];
      this.config = {
        url: '',
        appkey: '', // 以后商业化要用到的
        delay: 1000, // 延迟, 合并上报
        appVersion: '', // 应用Version
        env: '',    // 环境
        beforeReport(log) {
          // 1.可在这里劫持上报的数据, 比如添加userid, session等等
          // 2.如果return false, 则不用内置http上报, 此时可以在这里自定义自己的http上报方式
          //   比如以后浏览器端，可以自定义 ajax 上报还是用图片上报
          return log;
        }
      };
      this.applyRequested = false;
      this.delayTimer = -1;
    }
  
    mergeConfig(opts) {
      validateConfig(opts);
      this.config = extend(this.config, opts);
    }
  
  
    addLog(log) {
      this.logQueue.push(log);
      return this;
    }
  
    getLog() {
      return this.logQueue.slice();
    }
  
    clearLog() {
      this.logQueue = [];
      return this;
    }
  
    report() {
      const curLogQueue = this.getLog();
  
      if (this.config.delay > 0) {
        if (this.delayTimer) {
          clearTimeout(this.delayTimer);
        }
        this.delayTimer = setTimeout(() => {
          this.sendLog(curLogQueue);
        }, this.config.delay);
      } else {
        this.sendLog(curLogQueue);
      }
    }
  
    gLog(log) {
      const { appVersion, env } = this.config;
      return {
        appVersion,
        env,
        logs: log
      };
    }
  
    sendLog(logQueue = []) {
      const log = logQueue.slice();
      if (!log.length) return;
  
      const data = this.gLog(log);
      const ret = isFunction(this.config.beforeReport) && this.config.beforeReport.call(this, data);
  
      // 异步回调
      if (isPromise(ret)) {
        ret.then((res) => {
          if (isBoolean(res) && res === false) {
            // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
            return;
          }
          this.startReport(res);
        });
      } else {
        if (isBoolean(ret) && ret === false) {
          // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
          return;
        }
        this.startReport(ret);
      }
      
    }
  
    startReport(data) {
      this.clearLog();
      // 默认上报
      this.request({
        url: this.config.url,
        method: 'POST',
        data
      });
    }
  
    use(plugin, ...args) {
      plugin.init(this, ...args);
    }
  
    applyRequest(request) {
      if (this.applyRequested) return false;
      this.request = request;
      this.applyRequested = true;
      return true;
    }
}
  
export default BehaviorReporter;
  