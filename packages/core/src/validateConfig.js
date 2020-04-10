import {
  isNumber,
  isArray,
  isBoolean,
  isFunction
} from '@sniperjs/utils';


function throwErr(err) {
  throw new Error(err);
}
const strategies = {
  url: {
    validate(val) {
      if (!val) {
        throwErr(this.msgRequred);
      }
    },
    msgRequred: 'SNIPER ERROR: 配置中 url 字段必填.'
  },
  repeat: {
    validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 repeat 字段类型需为 Number.'
  },
  ignoreErrors: {
    validate(val) {
      if (!isArray(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 ignoreErrors 字段类型需为 Array.'
  },
  autoBreadcrumbs: {
    validate(val) {
      if (!isBoolean(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 autoBreadcrumbs 字段类型需为 Array.'
  },
  breadcrumbsMax: {
    validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.'
  },
  random: {
    validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      } else if (!(val > 0 && val <= 1)) {
        throwErr(this.msgRangeErr);
      } else {
        // eslint-disable-next-line
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段类型需为 Number.',
    msgRangeErr: 'SNIPER ERROR: 配置中 breadcrumbsMax 字段范围需满足 (0, 1]'
  },
  delay: {
    validate(val) {
      if (!isNumber(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 delay 字段类型需为 Number.'
  },
  beforeReport: {
    validate(val) {
      if (!isFunction(val)) {
        throwErr(this.msgTypeErr);
      }
    },
    msgTypeErr: 'SNIPER ERROR: 配置中 beforeReport 字段类型需为 Function.'
  }

};

function proxyValidate() {
  const proxyObj = {};
  return new Proxy(proxyObj, {
    set(target, key, val) {
      strategies[key].validate(val);
      // eslint-disable-next-line no-param-reassign
      target[key] = val;
      return true;
    }
  });
}

function validateConfig(config) {
  const proxy = proxyValidate();
  Object.keys(config).forEach((prop) => {
    proxy[prop] = config[prop];
  });
}


export default validateConfig;
