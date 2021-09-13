import { isString, isNumber, isArray, isBoolean, isFunction, extend, isRegExp, compose, isPromise, getMeta, getNet } from '@sniperjs/utils';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  !function (global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;

    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      } // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.


      return;
    } // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.


    runtime = global.regeneratorRuntime =  module.exports ;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    runtime.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      if (typeof global.process === "object" && global.process.domain) {
        invoke = global.process.domain.bind(invoke);
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    runtime.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
  }( // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof commonjsGlobal === "object" ? commonjsGlobal : typeof window === "object" ? window : typeof self === "object" ? self : commonjsGlobal);
});

// kept identical to the way it is obtained in runtime.js

var g = typeof commonjsGlobal === "object" ? commonjsGlobal : typeof window === "object" ? window : typeof self === "object" ? self : commonjsGlobal; // Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.

var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

g.regeneratorRuntime = undefined;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

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
  appVersion: {
    validate(val) {
      if (!val) return;

      if (!isString(val)) {
        throwErr(this.msgTypeErr);
      }
    },

    msgTypeErr: 'SNIPER ERROR: 配置中 appVersion 字段类型需为 String.'
  },
  env: {
    validate(val) {
      if (!val) return;

      if (!isString(val)) {
        throwErr(this.msgTypeErr);
      }
    },

    msgTypeErr: 'SNIPER ERROR: 配置中 env 字段类型需为 String.'
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
      strategies[key].validate(val); // eslint-disable-next-line no-param-reassign

      target[key] = val;
      return true;
    }

  });
}

function validateConfig(config) {
  const proxy = proxyValidate();
  Object.keys(config).forEach(prop => {
    proxy[prop] = config[prop];
  });
}

const logMap = Symbol('log map');

class ErrorReporter {
  constructor() {
    this.logQueue = [];
    this.breadcrumbs = [];
    this[logMap] = {};
    this.config = {
      url: '',
      repeat: 5,
      // 同样错误重复记录，超过重复次数的记录不上报
      ignoreErrors: [],
      // 错误类型过滤(正则)
      // TODO 上层 UI 事件记录捕捉待补全, 目前只支持 tap 事件
      autoBreadcrumbs: true,
      // 是否记录 UI 事件历史
      breadcrumbsMax: 5,
      // 只保留最近5次的事件记录
      appkey: '',
      // 以后商业化要用到的
      random: 1,
      // 随机抽样上报 (0, 1]
      delay: 1000,
      // 延迟, 合并上报
      appVersion: '',
      // 应用Version
      env: '',

      // 环境
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

  addBreadCrumb(breadcrumb) {
    this.breadcrumbs.push(breadcrumb);
    return this;
  }

  getBreadCrumbs() {
    return this.breadcrumbs;
  }

  clearBreadCrumbs() {
    this.breadcrumbs = [];
    return this;
  }

  addLog(log) {
    if (!this.isRepeat(log)) {
      this.logQueue.push(this.processMergeBreadcrumbs(log));
    }

    return this;
  }

  getLog() {
    return this.logQueue;
  }

  clearLog() {
    this.logQueue = [];
    this.resetLogMap();
    return this;
  }

  resetLogMap() {
    this[logMap] = {};
  } // 是否重复，非http错误的时在stack里面取字符串做为重复的key


  isRepeat(log) {
    // http错误
    const logKeyName = log.type === 'RequestError' ? `${log.url}/${log.statusCode}` : log.stack.replace(/\n|\s/g, '').substring(0, 100);
    this[logMap][logKeyName] = (this[logMap][logKeyName] || 0) + 1;
    return this[logMap][logKeyName] > this.config.repeat;
  } // 抽样上报


  processByRandom(queue) {
    const isIgnore = Math.random() > this.config.random;
    if (isIgnore) return [];
    return queue;
  } // 忽略上报


  processByFilterIgore(queue) {
    const {
      ignoreErrors
    } = this.config;
    if (!ignoreErrors.length) return queue;
    const source = ignoreErrors.filter(rule => isRegExp(rule)).map(rule => `(${rule.source})`); // 合并成一个正则

    const bigRegExp = new RegExp(source.join('|'), 'i');
    return queue.filter(log => !bigRegExp.test(log.msg.type));
  }

  processMergeBreadcrumbs(log) {
    const retLog = log;

    if (isBoolean(this.config.autoBreadcrumbs) && this.config.autoBreadcrumbs) {
      retLog.breadcrumbs = this.getBreadCrumbs().slice(0);
      this.clearBreadCrumbs();
    }

    return retLog;
  }

  report() {
    const curLogQueue = this.getLog();
    const processTask = [// 抽样上报
    this.processByRandom.bind(this), // 规则忽略上报
    this.processByFilterIgore.bind(this)];

    if (this.config.delay > 0) {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }

      this.delayTimer = setTimeout(() => {
        this.sendLog(compose.apply(this, processTask)(curLogQueue));
      }, this.config.delay);
    } else {
      this.sendLog(compose.apply(this, processTask)(curLogQueue));
    }
  }

  gLog(log) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const {
        appVersion,
        env
      } = _this.config;
      const metaData = getMeta();

      try {
        const net = yield getNet();
        metaData.system.net = net;
      } catch (err) {
        // eslint-disable-next-line no-empty
        console.warn('SNIPER WARN: 网络获取失败.');
      }

      return _objectSpread2(_objectSpread2({}, metaData), {}, {
        appVersion,
        env,
        logs: log
      });
    })();
  }

  sendLog(logQueue = []) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      // tip: 超过重复上报的次数后log不会入队
      const log = logQueue.slice();
      if (!log.length) return;
      const data = yield _this2.gLog(log);

      const ret = isFunction(_this2.config.beforeReport) && _this2.config.beforeReport.call(_this2, data); // 异步回调


      if (isPromise(ret)) {
        ret.then(res => {
          if (isBoolean(res) && res === false) {
            // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
            return;
          }

          _this2.startReport(res);
        });
      } else {
        if (isBoolean(ret) && ret === false) {
          // 用户阻止默认上报后，可在 beforeReport 可自定义 request 上报
          return;
        }

        _this2.startReport(ret);
      }
    })();
  }

  startReport(data) {
    this.clearLog(); // 默认上报

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
  } // try catch 代理上报用户自定义函数


  wrapFn(fn) {
    if (fn.hasWraped) {
      return fn;
    } // eslint-disable-next-line


    const wrapedFn = (...args) => {
      const wrappedArgs = this.wrapFnArgs(args);

      try {
        return fn.apply(this, wrappedArgs);
      } catch (err) {// 添加到log队列
        // this.addLog(err);
      }
    }; // eslint-disable-next-line


    fn.hasWraped = true;
    return wrapedFn;
  }

  wrapFnArgs(args = []) {
    return args.map(arg => {
      if (isFunction(arg)) {
        const wrapedFn = this.wrapFn(arg);
        return wrapedFn;
      }

      return arg;
    });
  }

}

export default ErrorReporter;
