(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sniperjs/error-reporter')) :
  typeof define === 'function' && define.amd ? define(['@sniperjs/error-reporter'], factory) :
  (global = global || self, global.Sniperjs = factory(global.ErrorReporter));
}(this, (function (ErrorReporter) { 'use strict';

  ErrorReporter = ErrorReporter && Object.prototype.hasOwnProperty.call(ErrorReporter, 'default') ? ErrorReporter['default'] : ErrorReporter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function Request(config) {
    const {
      url,
      method,
      data
    } = config;
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send('ue=' + JSON.stringify(data));
    return xhr;
  }

  let WebReportor = /*#__PURE__*/function (_ErrorReporter) {
    _inherits(WebReportor, _ErrorReporter);

    var _super = _createSuper(WebReportor);

    function WebReportor(opts = {}) {
      var _this;

      _classCallCheck(this, WebReportor);

      _this = _super.call(this, opts); // 合并参数

      _this.mergeConfig(opts);

      _this.init();

      return _this;
    }

    _createClass(WebReportor, [{
      key: "init",
      value: function init() {
        // this.use(hooRequest);
        // this.use(hookFetch);
        //   this.use(addEventListener);
        // this.use(hookOnPopstate);
        //  this.use(hookHistoryState);
        this.applyRequest(Request);
      }
    }]);

    return WebReportor;
  }(ErrorReporter);

  return WebReportor;

})));
