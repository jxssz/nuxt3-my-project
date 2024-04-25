import { hasInjectionContext, inject, version as version$1, ref, watchEffect, watch, getCurrentInstance, defineAsyncComponent, defineComponent, provide, shallowReactive, h as h$1, Suspense, nextTick, Transition, computed, shallowRef, createVNode, onUpdated, onUnmounted, toRef, withDirectives, withModifiers, vShow, Fragment, reactive, useSSRContext, unref, isVNode, Comment, Text, triggerRef, resolveDirective, cloneVNode, resolveComponent, mergeProps, withCtx, createTextVNode, createApp, effectScope, toRaw, render, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, isReadonly, isRef, isShallow, isReactive, toDisplayString } from 'vue';
import vt from 'node:http';
import Bs from 'node:https';
import st from 'node:zlib';
import me, { PassThrough, pipeline } from 'node:stream';
import { Buffer as Buffer$2 } from 'node:buffer';
import { promisify, deprecate, types } from 'node:util';
import { format } from 'node:url';
import { isIP } from 'node:net';
import { statSync, promises, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { b as baseURL } from '../routes/renderer.mjs';
import { i as createError$1, m as createHooks, n as sanitizeStatusCode, t as toRouteMatcher, o as createRouter$1 } from '../runtime.mjs';
import { getActiveHead } from 'unhead';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import Prism from 'prismjs';
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import '@unhead/shared';
import 'fs';
import 'path';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';

function createContext$2(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$2({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

var _a, _b;
var t$2 = Object.defineProperty;
var o$2 = (e2, l2) => t$2(e2, "name", { value: l2, configurable: true });
var n$2 = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function f$2(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
o$2(f$2, "getDefaultExportFromCjs");
var As = Object.defineProperty;
var n$1 = (i2, o2) => As(i2, "name", { value: o2, configurable: true });
var fi = (i2, o2, a2) => {
  if (!o2.has(i2))
    throw TypeError("Cannot " + a2);
};
var O$1 = (i2, o2, a2) => (fi(i2, o2, "read from private field"), a2 ? a2.call(i2) : o2.get(i2)), be = (i2, o2, a2) => {
  if (o2.has(i2))
    throw TypeError("Cannot add the same private member more than once");
  o2 instanceof WeakSet ? o2.add(i2) : o2.set(i2, a2);
}, X = (i2, o2, a2, u2) => (fi(i2, o2, "write to private field"), u2 ? u2.call(i2, a2) : o2.set(i2, a2), a2);
var ve, kt, bt, Cr, Ve, Wt, qt, Ot, ee, zt, Ne, He, It;
function js(i2) {
  if (!/^data:/i.test(i2))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  i2 = i2.replace(/\r?\n/g, "");
  const o2 = i2.indexOf(",");
  if (o2 === -1 || o2 <= 4)
    throw new TypeError("malformed data: URI");
  const a2 = i2.substring(5, o2).split(";");
  let u2 = "", l2 = false;
  const p = a2[0] || "text/plain";
  let h2 = p;
  for (let E2 = 1; E2 < a2.length; E2++)
    a2[E2] === "base64" ? l2 = true : a2[E2] && (h2 += `;${a2[E2]}`, a2[E2].indexOf("charset=") === 0 && (u2 = a2[E2].substring(8)));
  !a2[0] && !u2.length && (h2 += ";charset=US-ASCII", u2 = "US-ASCII");
  const g2 = l2 ? "base64" : "ascii", A2 = unescape(i2.substring(o2 + 1)), w2 = Buffer.from(A2, g2);
  return w2.type = p, w2.typeFull = h2, w2.charset = u2, w2;
}
n$1(js, "dataUriToBuffer");
var pr = { exports: {} };
/**
* @license
* web-streams-polyfill v3.3.3
* Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/
var di;
function Ls() {
  return di || (di = 1, function(i2, o2) {
    (function(a2, u2) {
      u2(o2);
    })(n$2, function(a2) {
      function u2() {
      }
      n$1(u2, "noop");
      function l2(e2) {
        return typeof e2 == "object" && e2 !== null || typeof e2 == "function";
      }
      n$1(l2, "typeIsObject");
      const p = u2;
      function h2(e2, t2) {
        try {
          Object.defineProperty(e2, "name", { value: t2, configurable: true });
        } catch {
        }
      }
      n$1(h2, "setFunctionName");
      const g2 = Promise, A2 = Promise.prototype.then, w2 = Promise.reject.bind(g2);
      function E2(e2) {
        return new g2(e2);
      }
      n$1(E2, "newPromise");
      function T2(e2) {
        return E2((t2) => t2(e2));
      }
      n$1(T2, "promiseResolvedWith");
      function b2(e2) {
        return w2(e2);
      }
      n$1(b2, "promiseRejectedWith");
      function q2(e2, t2, r2) {
        return A2.call(e2, t2, r2);
      }
      n$1(q2, "PerformPromiseThen");
      function _2(e2, t2, r2) {
        q2(q2(e2, t2, r2), void 0, p);
      }
      n$1(_2, "uponPromise");
      function V2(e2, t2) {
        _2(e2, t2);
      }
      n$1(V2, "uponFulfillment");
      function I2(e2, t2) {
        _2(e2, void 0, t2);
      }
      n$1(I2, "uponRejection");
      function F2(e2, t2, r2) {
        return q2(e2, t2, r2);
      }
      n$1(F2, "transformPromiseWith");
      function Q(e2) {
        q2(e2, void 0, p);
      }
      n$1(Q, "setPromiseIsHandledToTrue");
      let ge = n$1((e2) => {
        if (typeof queueMicrotask == "function")
          ge = queueMicrotask;
        else {
          const t2 = T2(void 0);
          ge = n$1((r2) => q2(t2, r2), "_queueMicrotask");
        }
        return ge(e2);
      }, "_queueMicrotask");
      function z2(e2, t2, r2) {
        if (typeof e2 != "function")
          throw new TypeError("Argument is not a function");
        return Function.prototype.apply.call(e2, t2, r2);
      }
      n$1(z2, "reflectCall");
      function j2(e2, t2, r2) {
        try {
          return T2(z2(e2, t2, r2));
        } catch (s2) {
          return b2(s2);
        }
      }
      n$1(j2, "promiseCall");
      const U = 16384, bn = class bn {
        constructor() {
          this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(t2) {
          const r2 = this._back;
          let s2 = r2;
          r2._elements.length === U - 1 && (s2 = { _elements: [], _next: void 0 }), r2._elements.push(t2), s2 !== r2 && (this._back = s2, r2._next = s2), ++this._size;
        }
        shift() {
          const t2 = this._front;
          let r2 = t2;
          const s2 = this._cursor;
          let f2 = s2 + 1;
          const c2 = t2._elements, d2 = c2[s2];
          return f2 === U && (r2 = t2._next, f2 = 0), --this._size, this._cursor = f2, t2 !== r2 && (this._front = r2), c2[s2] = void 0, d2;
        }
        forEach(t2) {
          let r2 = this._cursor, s2 = this._front, f2 = s2._elements;
          for (; (r2 !== f2.length || s2._next !== void 0) && !(r2 === f2.length && (s2 = s2._next, f2 = s2._elements, r2 = 0, f2.length === 0)); )
            t2(f2[r2]), ++r2;
        }
        peek() {
          const t2 = this._front, r2 = this._cursor;
          return t2._elements[r2];
        }
      };
      n$1(bn, "SimpleQueue");
      let D2 = bn;
      const Ft = Symbol("[[AbortSteps]]"), Qn = Symbol("[[ErrorSteps]]"), Ar = Symbol("[[CancelSteps]]"), Br = Symbol("[[PullSteps]]"), kr = Symbol("[[ReleaseSteps]]");
      function Yn(e2, t2) {
        e2._ownerReadableStream = t2, t2._reader = e2, t2._state === "readable" ? qr(e2) : t2._state === "closed" ? Li(e2) : Gn(e2, t2._storedError);
      }
      n$1(Yn, "ReadableStreamReaderGenericInitialize");
      function Wr(e2, t2) {
        const r2 = e2._ownerReadableStream;
        return ie(r2, t2);
      }
      n$1(Wr, "ReadableStreamReaderGenericCancel");
      function _e(e2) {
        const t2 = e2._ownerReadableStream;
        t2._state === "readable" ? Or(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : $i(e2, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t2._readableStreamController[kr](), t2._reader = void 0, e2._ownerReadableStream = void 0;
      }
      n$1(_e, "ReadableStreamReaderGenericRelease");
      function jt(e2) {
        return new TypeError("Cannot " + e2 + " a stream using a released reader");
      }
      n$1(jt, "readerLockException");
      function qr(e2) {
        e2._closedPromise = E2((t2, r2) => {
          e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2;
        });
      }
      n$1(qr, "defaultReaderClosedPromiseInitialize");
      function Gn(e2, t2) {
        qr(e2), Or(e2, t2);
      }
      n$1(Gn, "defaultReaderClosedPromiseInitializeAsRejected");
      function Li(e2) {
        qr(e2), Zn(e2);
      }
      n$1(Li, "defaultReaderClosedPromiseInitializeAsResolved");
      function Or(e2, t2) {
        e2._closedPromise_reject !== void 0 && (Q(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
      }
      n$1(Or, "defaultReaderClosedPromiseReject");
      function $i(e2, t2) {
        Gn(e2, t2);
      }
      n$1($i, "defaultReaderClosedPromiseResetToRejected");
      function Zn(e2) {
        e2._closedPromise_resolve !== void 0 && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0);
      }
      n$1(Zn, "defaultReaderClosedPromiseResolve");
      const Kn = Number.isFinite || function(e2) {
        return typeof e2 == "number" && isFinite(e2);
      }, Di = Math.trunc || function(e2) {
        return e2 < 0 ? Math.ceil(e2) : Math.floor(e2);
      };
      function Mi(e2) {
        return typeof e2 == "object" || typeof e2 == "function";
      }
      n$1(Mi, "isDictionary");
      function ue(e2, t2) {
        if (e2 !== void 0 && !Mi(e2))
          throw new TypeError(`${t2} is not an object.`);
      }
      n$1(ue, "assertDictionary");
      function Z(e2, t2) {
        if (typeof e2 != "function")
          throw new TypeError(`${t2} is not a function.`);
      }
      n$1(Z, "assertFunction");
      function Ui(e2) {
        return typeof e2 == "object" && e2 !== null || typeof e2 == "function";
      }
      n$1(Ui, "isObject");
      function Jn(e2, t2) {
        if (!Ui(e2))
          throw new TypeError(`${t2} is not an object.`);
      }
      n$1(Jn, "assertObject");
      function Se(e2, t2, r2) {
        if (e2 === void 0)
          throw new TypeError(`Parameter ${t2} is required in '${r2}'.`);
      }
      n$1(Se, "assertRequiredArgument");
      function zr(e2, t2, r2) {
        if (e2 === void 0)
          throw new TypeError(`${t2} is required in '${r2}'.`);
      }
      n$1(zr, "assertRequiredField");
      function Ir(e2) {
        return Number(e2);
      }
      n$1(Ir, "convertUnrestrictedDouble");
      function Xn(e2) {
        return e2 === 0 ? 0 : e2;
      }
      n$1(Xn, "censorNegativeZero");
      function xi(e2) {
        return Xn(Di(e2));
      }
      n$1(xi, "integerPart");
      function Fr(e2, t2) {
        const s2 = Number.MAX_SAFE_INTEGER;
        let f2 = Number(e2);
        if (f2 = Xn(f2), !Kn(f2))
          throw new TypeError(`${t2} is not a finite number`);
        if (f2 = xi(f2), f2 < 0 || f2 > s2)
          throw new TypeError(`${t2} is outside the accepted range of 0 to ${s2}, inclusive`);
        return !Kn(f2) || f2 === 0 ? 0 : f2;
      }
      n$1(Fr, "convertUnsignedLongLongWithEnforceRange");
      function jr(e2, t2) {
        if (!We(e2))
          throw new TypeError(`${t2} is not a ReadableStream.`);
      }
      n$1(jr, "assertReadableStream");
      function Qe(e2) {
        return new fe(e2);
      }
      n$1(Qe, "AcquireReadableStreamDefaultReader");
      function eo(e2, t2) {
        e2._reader._readRequests.push(t2);
      }
      n$1(eo, "ReadableStreamAddReadRequest");
      function Lr(e2, t2, r2) {
        const f2 = e2._reader._readRequests.shift();
        r2 ? f2._closeSteps() : f2._chunkSteps(t2);
      }
      n$1(Lr, "ReadableStreamFulfillReadRequest");
      function Lt(e2) {
        return e2._reader._readRequests.length;
      }
      n$1(Lt, "ReadableStreamGetNumReadRequests");
      function to(e2) {
        const t2 = e2._reader;
        return !(t2 === void 0 || !Ee(t2));
      }
      n$1(to, "ReadableStreamHasDefaultReader");
      const mn = class mn {
        constructor(t2) {
          if (Se(t2, 1, "ReadableStreamDefaultReader"), jr(t2, "First parameter"), qe(t2))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          Yn(this, t2), this._readRequests = new D2();
        }
        get closed() {
          return Ee(this) ? this._closedPromise : b2($t("closed"));
        }
        cancel(t2 = void 0) {
          return Ee(this) ? this._ownerReadableStream === void 0 ? b2(jt("cancel")) : Wr(this, t2) : b2($t("cancel"));
        }
        read() {
          if (!Ee(this))
            return b2($t("read"));
          if (this._ownerReadableStream === void 0)
            return b2(jt("read from"));
          let t2, r2;
          const s2 = E2((c2, d2) => {
            t2 = c2, r2 = d2;
          });
          return mt(this, { _chunkSteps: (c2) => t2({ value: c2, done: false }), _closeSteps: () => t2({ value: void 0, done: true }), _errorSteps: (c2) => r2(c2) }), s2;
        }
        releaseLock() {
          if (!Ee(this))
            throw $t("releaseLock");
          this._ownerReadableStream !== void 0 && Ni(this);
        }
      };
      n$1(mn, "ReadableStreamDefaultReader");
      let fe = mn;
      Object.defineProperties(fe.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h2(fe.prototype.cancel, "cancel"), h2(fe.prototype.read, "read"), h2(fe.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(fe.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
      function Ee(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_readRequests") ? false : e2 instanceof fe;
      }
      n$1(Ee, "IsReadableStreamDefaultReader");
      function mt(e2, t2) {
        const r2 = e2._ownerReadableStream;
        r2._disturbed = true, r2._state === "closed" ? t2._closeSteps() : r2._state === "errored" ? t2._errorSteps(r2._storedError) : r2._readableStreamController[Br](t2);
      }
      n$1(mt, "ReadableStreamDefaultReaderRead");
      function Ni(e2) {
        _e(e2);
        const t2 = new TypeError("Reader was released");
        ro(e2, t2);
      }
      n$1(Ni, "ReadableStreamDefaultReaderRelease");
      function ro(e2, t2) {
        const r2 = e2._readRequests;
        e2._readRequests = new D2(), r2.forEach((s2) => {
          s2._errorSteps(t2);
        });
      }
      n$1(ro, "ReadableStreamDefaultReaderErrorReadRequests");
      function $t(e2) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${e2} can only be used on a ReadableStreamDefaultReader`);
      }
      n$1($t, "defaultReaderBrandCheckException");
      const Hi = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype), yn = class yn {
        constructor(t2, r2) {
          this._ongoingPromise = void 0, this._isFinished = false, this._reader = t2, this._preventCancel = r2;
        }
        next() {
          const t2 = n$1(() => this._nextSteps(), "nextSteps");
          return this._ongoingPromise = this._ongoingPromise ? F2(this._ongoingPromise, t2, t2) : t2(), this._ongoingPromise;
        }
        return(t2) {
          const r2 = n$1(() => this._returnSteps(t2), "returnSteps");
          return this._ongoingPromise ? F2(this._ongoingPromise, r2, r2) : r2();
        }
        _nextSteps() {
          if (this._isFinished)
            return Promise.resolve({ value: void 0, done: true });
          const t2 = this._reader;
          let r2, s2;
          const f2 = E2((d2, m2) => {
            r2 = d2, s2 = m2;
          });
          return mt(t2, { _chunkSteps: (d2) => {
            this._ongoingPromise = void 0, ge(() => r2({ value: d2, done: false }));
          }, _closeSteps: () => {
            this._ongoingPromise = void 0, this._isFinished = true, _e(t2), r2({ value: void 0, done: true });
          }, _errorSteps: (d2) => {
            this._ongoingPromise = void 0, this._isFinished = true, _e(t2), s2(d2);
          } }), f2;
        }
        _returnSteps(t2) {
          if (this._isFinished)
            return Promise.resolve({ value: t2, done: true });
          this._isFinished = true;
          const r2 = this._reader;
          if (!this._preventCancel) {
            const s2 = Wr(r2, t2);
            return _e(r2), F2(s2, () => ({ value: t2, done: true }));
          }
          return _e(r2), T2({ value: t2, done: true });
        }
      };
      n$1(yn, "ReadableStreamAsyncIteratorImpl");
      let Dt = yn;
      const no = { next() {
        return oo(this) ? this._asyncIteratorImpl.next() : b2(io("next"));
      }, return(e2) {
        return oo(this) ? this._asyncIteratorImpl.return(e2) : b2(io("return"));
      } };
      Object.setPrototypeOf(no, Hi);
      function Vi(e2, t2) {
        const r2 = Qe(e2), s2 = new Dt(r2, t2), f2 = Object.create(no);
        return f2._asyncIteratorImpl = s2, f2;
      }
      n$1(Vi, "AcquireReadableStreamAsyncIterator");
      function oo(e2) {
        if (!l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_asyncIteratorImpl"))
          return false;
        try {
          return e2._asyncIteratorImpl instanceof Dt;
        } catch {
          return false;
        }
      }
      n$1(oo, "IsReadableStreamAsyncIterator");
      function io(e2) {
        return new TypeError(`ReadableStreamAsyncIterator.${e2} can only be used on a ReadableSteamAsyncIterator`);
      }
      n$1(io, "streamAsyncIteratorBrandCheckException");
      const ao = Number.isNaN || function(e2) {
        return e2 !== e2;
      };
      var $r, Dr, Mr;
      function yt(e2) {
        return e2.slice();
      }
      n$1(yt, "CreateArrayFromList");
      function so(e2, t2, r2, s2, f2) {
        new Uint8Array(e2).set(new Uint8Array(r2, s2, f2), t2);
      }
      n$1(so, "CopyDataBlockBytes");
      let we = n$1((e2) => (typeof e2.transfer == "function" ? we = n$1((t2) => t2.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? we = n$1((t2) => structuredClone(t2, { transfer: [t2] }), "TransferArrayBuffer") : we = n$1((t2) => t2, "TransferArrayBuffer"), we(e2)), "TransferArrayBuffer"), Ae = n$1((e2) => (typeof e2.detached == "boolean" ? Ae = n$1((t2) => t2.detached, "IsDetachedBuffer") : Ae = n$1((t2) => t2.byteLength === 0, "IsDetachedBuffer"), Ae(e2)), "IsDetachedBuffer");
      function lo(e2, t2, r2) {
        if (e2.slice)
          return e2.slice(t2, r2);
        const s2 = r2 - t2, f2 = new ArrayBuffer(s2);
        return so(f2, 0, e2, t2, s2), f2;
      }
      n$1(lo, "ArrayBufferSlice");
      function Mt(e2, t2) {
        const r2 = e2[t2];
        if (r2 != null) {
          if (typeof r2 != "function")
            throw new TypeError(`${String(t2)} is not a function`);
          return r2;
        }
      }
      n$1(Mt, "GetMethod");
      function Qi(e2) {
        const t2 = { [Symbol.iterator]: () => e2.iterator }, r2 = async function* () {
          return yield* t2;
        }(), s2 = r2.next;
        return { iterator: r2, nextMethod: s2, done: false };
      }
      n$1(Qi, "CreateAsyncFromSyncIterator");
      const Ur = (Mr = ($r = Symbol.asyncIterator) !== null && $r !== void 0 ? $r : (Dr = Symbol.for) === null || Dr === void 0 ? void 0 : Dr.call(Symbol, "Symbol.asyncIterator")) !== null && Mr !== void 0 ? Mr : "@@asyncIterator";
      function uo(e2, t2 = "sync", r2) {
        if (r2 === void 0)
          if (t2 === "async") {
            if (r2 = Mt(e2, Ur), r2 === void 0) {
              const c2 = Mt(e2, Symbol.iterator), d2 = uo(e2, "sync", c2);
              return Qi(d2);
            }
          } else
            r2 = Mt(e2, Symbol.iterator);
        if (r2 === void 0)
          throw new TypeError("The object is not iterable");
        const s2 = z2(r2, e2, []);
        if (!l2(s2))
          throw new TypeError("The iterator method must return an object");
        const f2 = s2.next;
        return { iterator: s2, nextMethod: f2, done: false };
      }
      n$1(uo, "GetIterator");
      function Yi(e2) {
        const t2 = z2(e2.nextMethod, e2.iterator, []);
        if (!l2(t2))
          throw new TypeError("The iterator.next() method must return an object");
        return t2;
      }
      n$1(Yi, "IteratorNext");
      function Gi(e2) {
        return !!e2.done;
      }
      n$1(Gi, "IteratorComplete");
      function Zi(e2) {
        return e2.value;
      }
      n$1(Zi, "IteratorValue");
      function Ki(e2) {
        return !(typeof e2 != "number" || ao(e2) || e2 < 0);
      }
      n$1(Ki, "IsNonNegativeNumber");
      function fo(e2) {
        const t2 = lo(e2.buffer, e2.byteOffset, e2.byteOffset + e2.byteLength);
        return new Uint8Array(t2);
      }
      n$1(fo, "CloneAsUint8Array");
      function xr(e2) {
        const t2 = e2._queue.shift();
        return e2._queueTotalSize -= t2.size, e2._queueTotalSize < 0 && (e2._queueTotalSize = 0), t2.value;
      }
      n$1(xr, "DequeueValue");
      function Nr(e2, t2, r2) {
        if (!Ki(r2) || r2 === 1 / 0)
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        e2._queue.push({ value: t2, size: r2 }), e2._queueTotalSize += r2;
      }
      n$1(Nr, "EnqueueValueWithSize");
      function Ji(e2) {
        return e2._queue.peek().value;
      }
      n$1(Ji, "PeekQueueValue");
      function Be(e2) {
        e2._queue = new D2(), e2._queueTotalSize = 0;
      }
      n$1(Be, "ResetQueue");
      function co(e2) {
        return e2 === DataView;
      }
      n$1(co, "isDataViewConstructor");
      function Xi(e2) {
        return co(e2.constructor);
      }
      n$1(Xi, "isDataView");
      function ea(e2) {
        return co(e2) ? 1 : e2.BYTES_PER_ELEMENT;
      }
      n$1(ea, "arrayBufferViewElementSize");
      const gn = class gn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!Hr(this))
            throw Zr("view");
          return this._view;
        }
        respond(t2) {
          if (!Hr(this))
            throw Zr("respond");
          if (Se(t2, 1, "respond"), t2 = Fr(t2, "First parameter"), this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          if (Ae(this._view.buffer))
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
          Ht(this._associatedReadableByteStreamController, t2);
        }
        respondWithNewView(t2) {
          if (!Hr(this))
            throw Zr("respondWithNewView");
          if (Se(t2, 1, "respondWithNewView"), !ArrayBuffer.isView(t2))
            throw new TypeError("You can only respond with array buffer views");
          if (this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          if (Ae(t2.buffer))
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          Vt(this._associatedReadableByteStreamController, t2);
        }
      };
      n$1(gn, "ReadableStreamBYOBRequest");
      let Re = gn;
      Object.defineProperties(Re.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), h2(Re.prototype.respond, "respond"), h2(Re.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
      const _n = class _n {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!ze(this))
            throw _t("byobRequest");
          return Gr(this);
        }
        get desiredSize() {
          if (!ze(this))
            throw _t("desiredSize");
          return Ro(this);
        }
        close() {
          if (!ze(this))
            throw _t("close");
          if (this._closeRequested)
            throw new TypeError("The stream has already been closed; do not close it again!");
          const t2 = this._controlledReadableByteStream._state;
          if (t2 !== "readable")
            throw new TypeError(`The stream (in ${t2} state) is not in the readable state and cannot be closed`);
          gt(this);
        }
        enqueue(t2) {
          if (!ze(this))
            throw _t("enqueue");
          if (Se(t2, 1, "enqueue"), !ArrayBuffer.isView(t2))
            throw new TypeError("chunk must be an array buffer view");
          if (t2.byteLength === 0)
            throw new TypeError("chunk must have non-zero byteLength");
          if (t2.buffer.byteLength === 0)
            throw new TypeError("chunk's buffer must have non-zero byteLength");
          if (this._closeRequested)
            throw new TypeError("stream is closed or draining");
          const r2 = this._controlledReadableByteStream._state;
          if (r2 !== "readable")
            throw new TypeError(`The stream (in ${r2} state) is not in the readable state and cannot be enqueued to`);
          Nt(this, t2);
        }
        error(t2 = void 0) {
          if (!ze(this))
            throw _t("error");
          K(this, t2);
        }
        [Ar](t2) {
          ho(this), Be(this);
          const r2 = this._cancelAlgorithm(t2);
          return xt(this), r2;
        }
        [Br](t2) {
          const r2 = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            wo(this, t2);
            return;
          }
          const s2 = this._autoAllocateChunkSize;
          if (s2 !== void 0) {
            let f2;
            try {
              f2 = new ArrayBuffer(s2);
            } catch (d2) {
              t2._errorSteps(d2);
              return;
            }
            const c2 = { buffer: f2, bufferByteLength: s2, byteOffset: 0, byteLength: s2, bytesFilled: 0, minimumFill: 1, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
            this._pendingPullIntos.push(c2);
          }
          eo(r2, t2), Ie(this);
        }
        [kr]() {
          if (this._pendingPullIntos.length > 0) {
            const t2 = this._pendingPullIntos.peek();
            t2.readerType = "none", this._pendingPullIntos = new D2(), this._pendingPullIntos.push(t2);
          }
        }
      };
      n$1(_n, "ReadableByteStreamController");
      let te = _n;
      Object.defineProperties(te.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), h2(te.prototype.close, "close"), h2(te.prototype.enqueue, "enqueue"), h2(te.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(te.prototype, Symbol.toStringTag, { value: "ReadableByteStreamController", configurable: true });
      function ze(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_controlledReadableByteStream") ? false : e2 instanceof te;
      }
      n$1(ze, "IsReadableByteStreamController");
      function Hr(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_associatedReadableByteStreamController") ? false : e2 instanceof Re;
      }
      n$1(Hr, "IsReadableStreamBYOBRequest");
      function Ie(e2) {
        if (!ia(e2))
          return;
        if (e2._pulling) {
          e2._pullAgain = true;
          return;
        }
        e2._pulling = true;
        const r2 = e2._pullAlgorithm();
        _2(r2, () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, Ie(e2)), null), (s2) => (K(e2, s2), null));
      }
      n$1(Ie, "ReadableByteStreamControllerCallPullIfNeeded");
      function ho(e2) {
        Qr(e2), e2._pendingPullIntos = new D2();
      }
      n$1(ho, "ReadableByteStreamControllerClearPendingPullIntos");
      function Vr(e2, t2) {
        let r2 = false;
        e2._state === "closed" && (r2 = true);
        const s2 = po(t2);
        t2.readerType === "default" ? Lr(e2, s2, r2) : ca(e2, s2, r2);
      }
      n$1(Vr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
      function po(e2) {
        const t2 = e2.bytesFilled, r2 = e2.elementSize;
        return new e2.viewConstructor(e2.buffer, e2.byteOffset, t2 / r2);
      }
      n$1(po, "ReadableByteStreamControllerConvertPullIntoDescriptor");
      function Ut(e2, t2, r2, s2) {
        e2._queue.push({ buffer: t2, byteOffset: r2, byteLength: s2 }), e2._queueTotalSize += s2;
      }
      n$1(Ut, "ReadableByteStreamControllerEnqueueChunkToQueue");
      function bo(e2, t2, r2, s2) {
        let f2;
        try {
          f2 = lo(t2, r2, r2 + s2);
        } catch (c2) {
          throw K(e2, c2), c2;
        }
        Ut(e2, f2, 0, s2);
      }
      n$1(bo, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
      function mo(e2, t2) {
        t2.bytesFilled > 0 && bo(e2, t2.buffer, t2.byteOffset, t2.bytesFilled), Ye(e2);
      }
      n$1(mo, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
      function yo(e2, t2) {
        const r2 = Math.min(e2._queueTotalSize, t2.byteLength - t2.bytesFilled), s2 = t2.bytesFilled + r2;
        let f2 = r2, c2 = false;
        const d2 = s2 % t2.elementSize, m2 = s2 - d2;
        m2 >= t2.minimumFill && (f2 = m2 - t2.bytesFilled, c2 = true);
        const R2 = e2._queue;
        for (; f2 > 0; ) {
          const y2 = R2.peek(), C = Math.min(f2, y2.byteLength), P2 = t2.byteOffset + t2.bytesFilled;
          so(t2.buffer, P2, y2.buffer, y2.byteOffset, C), y2.byteLength === C ? R2.shift() : (y2.byteOffset += C, y2.byteLength -= C), e2._queueTotalSize -= C, go(e2, C, t2), f2 -= C;
        }
        return c2;
      }
      n$1(yo, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
      function go(e2, t2, r2) {
        r2.bytesFilled += t2;
      }
      n$1(go, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
      function _o(e2) {
        e2._queueTotalSize === 0 && e2._closeRequested ? (xt(e2), Pt(e2._controlledReadableByteStream)) : Ie(e2);
      }
      n$1(_o, "ReadableByteStreamControllerHandleQueueDrain");
      function Qr(e2) {
        e2._byobRequest !== null && (e2._byobRequest._associatedReadableByteStreamController = void 0, e2._byobRequest._view = null, e2._byobRequest = null);
      }
      n$1(Qr, "ReadableByteStreamControllerInvalidateBYOBRequest");
      function Yr(e2) {
        for (; e2._pendingPullIntos.length > 0; ) {
          if (e2._queueTotalSize === 0)
            return;
          const t2 = e2._pendingPullIntos.peek();
          yo(e2, t2) && (Ye(e2), Vr(e2._controlledReadableByteStream, t2));
        }
      }
      n$1(Yr, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
      function ta(e2) {
        const t2 = e2._controlledReadableByteStream._reader;
        for (; t2._readRequests.length > 0; ) {
          if (e2._queueTotalSize === 0)
            return;
          const r2 = t2._readRequests.shift();
          wo(e2, r2);
        }
      }
      n$1(ta, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
      function ra(e2, t2, r2, s2) {
        const f2 = e2._controlledReadableByteStream, c2 = t2.constructor, d2 = ea(c2), { byteOffset: m2, byteLength: R2 } = t2, y2 = r2 * d2;
        let C;
        try {
          C = we(t2.buffer);
        } catch (B2) {
          s2._errorSteps(B2);
          return;
        }
        const P2 = { buffer: C, bufferByteLength: C.byteLength, byteOffset: m2, byteLength: R2, bytesFilled: 0, minimumFill: y2, elementSize: d2, viewConstructor: c2, readerType: "byob" };
        if (e2._pendingPullIntos.length > 0) {
          e2._pendingPullIntos.push(P2), Po(f2, s2);
          return;
        }
        if (f2._state === "closed") {
          const B2 = new c2(P2.buffer, P2.byteOffset, 0);
          s2._closeSteps(B2);
          return;
        }
        if (e2._queueTotalSize > 0) {
          if (yo(e2, P2)) {
            const B2 = po(P2);
            _o(e2), s2._chunkSteps(B2);
            return;
          }
          if (e2._closeRequested) {
            const B2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            K(e2, B2), s2._errorSteps(B2);
            return;
          }
        }
        e2._pendingPullIntos.push(P2), Po(f2, s2), Ie(e2);
      }
      n$1(ra, "ReadableByteStreamControllerPullInto");
      function na(e2, t2) {
        t2.readerType === "none" && Ye(e2);
        const r2 = e2._controlledReadableByteStream;
        if (Kr(r2))
          for (; vo(r2) > 0; ) {
            const s2 = Ye(e2);
            Vr(r2, s2);
          }
      }
      n$1(na, "ReadableByteStreamControllerRespondInClosedState");
      function oa(e2, t2, r2) {
        if (go(e2, t2, r2), r2.readerType === "none") {
          mo(e2, r2), Yr(e2);
          return;
        }
        if (r2.bytesFilled < r2.minimumFill)
          return;
        Ye(e2);
        const s2 = r2.bytesFilled % r2.elementSize;
        if (s2 > 0) {
          const f2 = r2.byteOffset + r2.bytesFilled;
          bo(e2, r2.buffer, f2 - s2, s2);
        }
        r2.bytesFilled -= s2, Vr(e2._controlledReadableByteStream, r2), Yr(e2);
      }
      n$1(oa, "ReadableByteStreamControllerRespondInReadableState");
      function So(e2, t2) {
        const r2 = e2._pendingPullIntos.peek();
        Qr(e2), e2._controlledReadableByteStream._state === "closed" ? na(e2, r2) : oa(e2, t2, r2), Ie(e2);
      }
      n$1(So, "ReadableByteStreamControllerRespondInternal");
      function Ye(e2) {
        return e2._pendingPullIntos.shift();
      }
      n$1(Ye, "ReadableByteStreamControllerShiftPendingPullInto");
      function ia(e2) {
        const t2 = e2._controlledReadableByteStream;
        return t2._state !== "readable" || e2._closeRequested || !e2._started ? false : !!(to(t2) && Lt(t2) > 0 || Kr(t2) && vo(t2) > 0 || Ro(e2) > 0);
      }
      n$1(ia, "ReadableByteStreamControllerShouldCallPull");
      function xt(e2) {
        e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0;
      }
      n$1(xt, "ReadableByteStreamControllerClearAlgorithms");
      function gt(e2) {
        const t2 = e2._controlledReadableByteStream;
        if (!(e2._closeRequested || t2._state !== "readable")) {
          if (e2._queueTotalSize > 0) {
            e2._closeRequested = true;
            return;
          }
          if (e2._pendingPullIntos.length > 0) {
            const r2 = e2._pendingPullIntos.peek();
            if (r2.bytesFilled % r2.elementSize !== 0) {
              const s2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              throw K(e2, s2), s2;
            }
          }
          xt(e2), Pt(t2);
        }
      }
      n$1(gt, "ReadableByteStreamControllerClose");
      function Nt(e2, t2) {
        const r2 = e2._controlledReadableByteStream;
        if (e2._closeRequested || r2._state !== "readable")
          return;
        const { buffer: s2, byteOffset: f2, byteLength: c2 } = t2;
        if (Ae(s2))
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        const d2 = we(s2);
        if (e2._pendingPullIntos.length > 0) {
          const m2 = e2._pendingPullIntos.peek();
          if (Ae(m2.buffer))
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          Qr(e2), m2.buffer = we(m2.buffer), m2.readerType === "none" && mo(e2, m2);
        }
        if (to(r2))
          if (ta(e2), Lt(r2) === 0)
            Ut(e2, d2, f2, c2);
          else {
            e2._pendingPullIntos.length > 0 && Ye(e2);
            const m2 = new Uint8Array(d2, f2, c2);
            Lr(r2, m2, false);
          }
        else
          Kr(r2) ? (Ut(e2, d2, f2, c2), Yr(e2)) : Ut(e2, d2, f2, c2);
        Ie(e2);
      }
      n$1(Nt, "ReadableByteStreamControllerEnqueue");
      function K(e2, t2) {
        const r2 = e2._controlledReadableByteStream;
        r2._state === "readable" && (ho(e2), Be(e2), xt(e2), Zo(r2, t2));
      }
      n$1(K, "ReadableByteStreamControllerError");
      function wo(e2, t2) {
        const r2 = e2._queue.shift();
        e2._queueTotalSize -= r2.byteLength, _o(e2);
        const s2 = new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
        t2._chunkSteps(s2);
      }
      n$1(wo, "ReadableByteStreamControllerFillReadRequestFromQueue");
      function Gr(e2) {
        if (e2._byobRequest === null && e2._pendingPullIntos.length > 0) {
          const t2 = e2._pendingPullIntos.peek(), r2 = new Uint8Array(t2.buffer, t2.byteOffset + t2.bytesFilled, t2.byteLength - t2.bytesFilled), s2 = Object.create(Re.prototype);
          sa(s2, e2, r2), e2._byobRequest = s2;
        }
        return e2._byobRequest;
      }
      n$1(Gr, "ReadableByteStreamControllerGetBYOBRequest");
      function Ro(e2) {
        const t2 = e2._controlledReadableByteStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e2._strategyHWM - e2._queueTotalSize;
      }
      n$1(Ro, "ReadableByteStreamControllerGetDesiredSize");
      function Ht(e2, t2) {
        const r2 = e2._pendingPullIntos.peek();
        if (e2._controlledReadableByteStream._state === "closed") {
          if (t2 !== 0)
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        } else {
          if (t2 === 0)
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          if (r2.bytesFilled + t2 > r2.byteLength)
            throw new RangeError("bytesWritten out of range");
        }
        r2.buffer = we(r2.buffer), So(e2, t2);
      }
      n$1(Ht, "ReadableByteStreamControllerRespond");
      function Vt(e2, t2) {
        const r2 = e2._pendingPullIntos.peek();
        if (e2._controlledReadableByteStream._state === "closed") {
          if (t2.byteLength !== 0)
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        } else if (t2.byteLength === 0)
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        if (r2.byteOffset + r2.bytesFilled !== t2.byteOffset)
          throw new RangeError("The region specified by view does not match byobRequest");
        if (r2.bufferByteLength !== t2.buffer.byteLength)
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        if (r2.bytesFilled + t2.byteLength > r2.byteLength)
          throw new RangeError("The region specified by view is larger than byobRequest");
        const f2 = t2.byteLength;
        r2.buffer = we(t2.buffer), So(e2, f2);
      }
      n$1(Vt, "ReadableByteStreamControllerRespondWithNewView");
      function To(e2, t2, r2, s2, f2, c2, d2) {
        t2._controlledReadableByteStream = e2, t2._pullAgain = false, t2._pulling = false, t2._byobRequest = null, t2._queue = t2._queueTotalSize = void 0, Be(t2), t2._closeRequested = false, t2._started = false, t2._strategyHWM = c2, t2._pullAlgorithm = s2, t2._cancelAlgorithm = f2, t2._autoAllocateChunkSize = d2, t2._pendingPullIntos = new D2(), e2._readableStreamController = t2;
        const m2 = r2();
        _2(T2(m2), () => (t2._started = true, Ie(t2), null), (R2) => (K(t2, R2), null));
      }
      n$1(To, "SetUpReadableByteStreamController");
      function aa(e2, t2, r2) {
        const s2 = Object.create(te.prototype);
        let f2, c2, d2;
        t2.start !== void 0 ? f2 = n$1(() => t2.start(s2), "startAlgorithm") : f2 = n$1(() => {
        }, "startAlgorithm"), t2.pull !== void 0 ? c2 = n$1(() => t2.pull(s2), "pullAlgorithm") : c2 = n$1(() => T2(void 0), "pullAlgorithm"), t2.cancel !== void 0 ? d2 = n$1((R2) => t2.cancel(R2), "cancelAlgorithm") : d2 = n$1(() => T2(void 0), "cancelAlgorithm");
        const m2 = t2.autoAllocateChunkSize;
        if (m2 === 0)
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        To(e2, s2, f2, c2, d2, r2, m2);
      }
      n$1(aa, "SetUpReadableByteStreamControllerFromUnderlyingSource");
      function sa(e2, t2, r2) {
        e2._associatedReadableByteStreamController = t2, e2._view = r2;
      }
      n$1(sa, "SetUpReadableStreamBYOBRequest");
      function Zr(e2) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${e2} can only be used on a ReadableStreamBYOBRequest`);
      }
      n$1(Zr, "byobRequestBrandCheckException");
      function _t(e2) {
        return new TypeError(`ReadableByteStreamController.prototype.${e2} can only be used on a ReadableByteStreamController`);
      }
      n$1(_t, "byteStreamControllerBrandCheckException");
      function la(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.mode;
        return { mode: r2 === void 0 ? void 0 : ua(r2, `${t2} has member 'mode' that`) };
      }
      n$1(la, "convertReaderOptions");
      function ua(e2, t2) {
        if (e2 = `${e2}`, e2 !== "byob")
          throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamReaderMode`);
        return e2;
      }
      n$1(ua, "convertReadableStreamReaderMode");
      function fa(e2, t2) {
        var r2;
        ue(e2, t2);
        const s2 = (r2 = e2 == null ? void 0 : e2.min) !== null && r2 !== void 0 ? r2 : 1;
        return { min: Fr(s2, `${t2} has member 'min' that`) };
      }
      n$1(fa, "convertByobReadOptions");
      function Co(e2) {
        return new ce(e2);
      }
      n$1(Co, "AcquireReadableStreamBYOBReader");
      function Po(e2, t2) {
        e2._reader._readIntoRequests.push(t2);
      }
      n$1(Po, "ReadableStreamAddReadIntoRequest");
      function ca(e2, t2, r2) {
        const f2 = e2._reader._readIntoRequests.shift();
        r2 ? f2._closeSteps(t2) : f2._chunkSteps(t2);
      }
      n$1(ca, "ReadableStreamFulfillReadIntoRequest");
      function vo(e2) {
        return e2._reader._readIntoRequests.length;
      }
      n$1(vo, "ReadableStreamGetNumReadIntoRequests");
      function Kr(e2) {
        const t2 = e2._reader;
        return !(t2 === void 0 || !Fe(t2));
      }
      n$1(Kr, "ReadableStreamHasBYOBReader");
      const Sn = class Sn {
        constructor(t2) {
          if (Se(t2, 1, "ReadableStreamBYOBReader"), jr(t2, "First parameter"), qe(t2))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          if (!ze(t2._readableStreamController))
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          Yn(this, t2), this._readIntoRequests = new D2();
        }
        get closed() {
          return Fe(this) ? this._closedPromise : b2(Qt("closed"));
        }
        cancel(t2 = void 0) {
          return Fe(this) ? this._ownerReadableStream === void 0 ? b2(jt("cancel")) : Wr(this, t2) : b2(Qt("cancel"));
        }
        read(t2, r2 = {}) {
          if (!Fe(this))
            return b2(Qt("read"));
          if (!ArrayBuffer.isView(t2))
            return b2(new TypeError("view must be an array buffer view"));
          if (t2.byteLength === 0)
            return b2(new TypeError("view must have non-zero byteLength"));
          if (t2.buffer.byteLength === 0)
            return b2(new TypeError("view's buffer must have non-zero byteLength"));
          if (Ae(t2.buffer))
            return b2(new TypeError("view's buffer has been detached"));
          let s2;
          try {
            s2 = fa(r2, "options");
          } catch (y2) {
            return b2(y2);
          }
          const f2 = s2.min;
          if (f2 === 0)
            return b2(new TypeError("options.min must be greater than 0"));
          if (Xi(t2)) {
            if (f2 > t2.byteLength)
              return b2(new RangeError("options.min must be less than or equal to view's byteLength"));
          } else if (f2 > t2.length)
            return b2(new RangeError("options.min must be less than or equal to view's length"));
          if (this._ownerReadableStream === void 0)
            return b2(jt("read from"));
          let c2, d2;
          const m2 = E2((y2, C) => {
            c2 = y2, d2 = C;
          });
          return Eo(this, t2, f2, { _chunkSteps: (y2) => c2({ value: y2, done: false }), _closeSteps: (y2) => c2({ value: y2, done: true }), _errorSteps: (y2) => d2(y2) }), m2;
        }
        releaseLock() {
          if (!Fe(this))
            throw Qt("releaseLock");
          this._ownerReadableStream !== void 0 && da(this);
        }
      };
      n$1(Sn, "ReadableStreamBYOBReader");
      let ce = Sn;
      Object.defineProperties(ce.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h2(ce.prototype.cancel, "cancel"), h2(ce.prototype.read, "read"), h2(ce.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
      function Fe(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_readIntoRequests") ? false : e2 instanceof ce;
      }
      n$1(Fe, "IsReadableStreamBYOBReader");
      function Eo(e2, t2, r2, s2) {
        const f2 = e2._ownerReadableStream;
        f2._disturbed = true, f2._state === "errored" ? s2._errorSteps(f2._storedError) : ra(f2._readableStreamController, t2, r2, s2);
      }
      n$1(Eo, "ReadableStreamBYOBReaderRead");
      function da(e2) {
        _e(e2);
        const t2 = new TypeError("Reader was released");
        Ao(e2, t2);
      }
      n$1(da, "ReadableStreamBYOBReaderRelease");
      function Ao(e2, t2) {
        const r2 = e2._readIntoRequests;
        e2._readIntoRequests = new D2(), r2.forEach((s2) => {
          s2._errorSteps(t2);
        });
      }
      n$1(Ao, "ReadableStreamBYOBReaderErrorReadIntoRequests");
      function Qt(e2) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${e2} can only be used on a ReadableStreamBYOBReader`);
      }
      n$1(Qt, "byobReaderBrandCheckException");
      function St(e2, t2) {
        const { highWaterMark: r2 } = e2;
        if (r2 === void 0)
          return t2;
        if (ao(r2) || r2 < 0)
          throw new RangeError("Invalid highWaterMark");
        return r2;
      }
      n$1(St, "ExtractHighWaterMark");
      function Yt(e2) {
        const { size: t2 } = e2;
        return t2 || (() => 1);
      }
      n$1(Yt, "ExtractSizeAlgorithm");
      function Gt(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.highWaterMark, s2 = e2 == null ? void 0 : e2.size;
        return { highWaterMark: r2 === void 0 ? void 0 : Ir(r2), size: s2 === void 0 ? void 0 : ha(s2, `${t2} has member 'size' that`) };
      }
      n$1(Gt, "convertQueuingStrategy");
      function ha(e2, t2) {
        return Z(e2, t2), (r2) => Ir(e2(r2));
      }
      n$1(ha, "convertQueuingStrategySize");
      function pa(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.abort, s2 = e2 == null ? void 0 : e2.close, f2 = e2 == null ? void 0 : e2.start, c2 = e2 == null ? void 0 : e2.type, d2 = e2 == null ? void 0 : e2.write;
        return { abort: r2 === void 0 ? void 0 : ba(r2, e2, `${t2} has member 'abort' that`), close: s2 === void 0 ? void 0 : ma(s2, e2, `${t2} has member 'close' that`), start: f2 === void 0 ? void 0 : ya(f2, e2, `${t2} has member 'start' that`), write: d2 === void 0 ? void 0 : ga(d2, e2, `${t2} has member 'write' that`), type: c2 };
      }
      n$1(pa, "convertUnderlyingSink");
      function ba(e2, t2, r2) {
        return Z(e2, r2), (s2) => j2(e2, t2, [s2]);
      }
      n$1(ba, "convertUnderlyingSinkAbortCallback");
      function ma(e2, t2, r2) {
        return Z(e2, r2), () => j2(e2, t2, []);
      }
      n$1(ma, "convertUnderlyingSinkCloseCallback");
      function ya(e2, t2, r2) {
        return Z(e2, r2), (s2) => z2(e2, t2, [s2]);
      }
      n$1(ya, "convertUnderlyingSinkStartCallback");
      function ga(e2, t2, r2) {
        return Z(e2, r2), (s2, f2) => j2(e2, t2, [s2, f2]);
      }
      n$1(ga, "convertUnderlyingSinkWriteCallback");
      function Bo(e2, t2) {
        if (!Ge(e2))
          throw new TypeError(`${t2} is not a WritableStream.`);
      }
      n$1(Bo, "assertWritableStream");
      function _a2(e2) {
        if (typeof e2 != "object" || e2 === null)
          return false;
        try {
          return typeof e2.aborted == "boolean";
        } catch {
          return false;
        }
      }
      n$1(_a2, "isAbortSignal");
      const Sa = typeof AbortController == "function";
      function wa() {
        if (Sa)
          return new AbortController();
      }
      n$1(wa, "createAbortController");
      const wn = class wn {
        constructor(t2 = {}, r2 = {}) {
          t2 === void 0 ? t2 = null : Jn(t2, "First parameter");
          const s2 = Gt(r2, "Second parameter"), f2 = pa(t2, "First parameter");
          if (Wo(this), f2.type !== void 0)
            throw new RangeError("Invalid type is specified");
          const d2 = Yt(s2), m2 = St(s2, 1);
          Ia(this, f2, m2, d2);
        }
        get locked() {
          if (!Ge(this))
            throw er("locked");
          return Ze(this);
        }
        abort(t2 = void 0) {
          return Ge(this) ? Ze(this) ? b2(new TypeError("Cannot abort a stream that already has a writer")) : Zt(this, t2) : b2(er("abort"));
        }
        close() {
          return Ge(this) ? Ze(this) ? b2(new TypeError("Cannot close a stream that already has a writer")) : he(this) ? b2(new TypeError("Cannot close an already-closing stream")) : qo(this) : b2(er("close"));
        }
        getWriter() {
          if (!Ge(this))
            throw er("getWriter");
          return ko(this);
        }
      };
      n$1(wn, "WritableStream");
      let de = wn;
      Object.defineProperties(de.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), h2(de.prototype.abort, "abort"), h2(de.prototype.close, "close"), h2(de.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, { value: "WritableStream", configurable: true });
      function ko(e2) {
        return new re(e2);
      }
      n$1(ko, "AcquireWritableStreamDefaultWriter");
      function Ra(e2, t2, r2, s2, f2 = 1, c2 = () => 1) {
        const d2 = Object.create(de.prototype);
        Wo(d2);
        const m2 = Object.create(ke.prototype);
        return Lo(d2, m2, e2, t2, r2, s2, f2, c2), d2;
      }
      n$1(Ra, "CreateWritableStream");
      function Wo(e2) {
        e2._state = "writable", e2._storedError = void 0, e2._writer = void 0, e2._writableStreamController = void 0, e2._writeRequests = new D2(), e2._inFlightWriteRequest = void 0, e2._closeRequest = void 0, e2._inFlightCloseRequest = void 0, e2._pendingAbortRequest = void 0, e2._backpressure = false;
      }
      n$1(Wo, "InitializeWritableStream");
      function Ge(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_writableStreamController") ? false : e2 instanceof de;
      }
      n$1(Ge, "IsWritableStream");
      function Ze(e2) {
        return e2._writer !== void 0;
      }
      n$1(Ze, "IsWritableStreamLocked");
      function Zt(e2, t2) {
        var r2;
        if (e2._state === "closed" || e2._state === "errored")
          return T2(void 0);
        e2._writableStreamController._abortReason = t2, (r2 = e2._writableStreamController._abortController) === null || r2 === void 0 || r2.abort(t2);
        const s2 = e2._state;
        if (s2 === "closed" || s2 === "errored")
          return T2(void 0);
        if (e2._pendingAbortRequest !== void 0)
          return e2._pendingAbortRequest._promise;
        let f2 = false;
        s2 === "erroring" && (f2 = true, t2 = void 0);
        const c2 = E2((d2, m2) => {
          e2._pendingAbortRequest = { _promise: void 0, _resolve: d2, _reject: m2, _reason: t2, _wasAlreadyErroring: f2 };
        });
        return e2._pendingAbortRequest._promise = c2, f2 || Xr(e2, t2), c2;
      }
      n$1(Zt, "WritableStreamAbort");
      function qo(e2) {
        const t2 = e2._state;
        if (t2 === "closed" || t2 === "errored")
          return b2(new TypeError(`The stream (in ${t2} state) is not in the writable state and cannot be closed`));
        const r2 = E2((f2, c2) => {
          const d2 = { _resolve: f2, _reject: c2 };
          e2._closeRequest = d2;
        }), s2 = e2._writer;
        return s2 !== void 0 && e2._backpressure && t2 === "writable" && ln(s2), Fa(e2._writableStreamController), r2;
      }
      n$1(qo, "WritableStreamClose");
      function Ta(e2) {
        return E2((r2, s2) => {
          const f2 = { _resolve: r2, _reject: s2 };
          e2._writeRequests.push(f2);
        });
      }
      n$1(Ta, "WritableStreamAddWriteRequest");
      function Jr(e2, t2) {
        if (e2._state === "writable") {
          Xr(e2, t2);
          return;
        }
        en(e2);
      }
      n$1(Jr, "WritableStreamDealWithRejection");
      function Xr(e2, t2) {
        const r2 = e2._writableStreamController;
        e2._state = "erroring", e2._storedError = t2;
        const s2 = e2._writer;
        s2 !== void 0 && zo(s2, t2), !Aa(e2) && r2._started && en(e2);
      }
      n$1(Xr, "WritableStreamStartErroring");
      function en(e2) {
        e2._state = "errored", e2._writableStreamController[Qn]();
        const t2 = e2._storedError;
        if (e2._writeRequests.forEach((f2) => {
          f2._reject(t2);
        }), e2._writeRequests = new D2(), e2._pendingAbortRequest === void 0) {
          Kt(e2);
          return;
        }
        const r2 = e2._pendingAbortRequest;
        if (e2._pendingAbortRequest = void 0, r2._wasAlreadyErroring) {
          r2._reject(t2), Kt(e2);
          return;
        }
        const s2 = e2._writableStreamController[Ft](r2._reason);
        _2(s2, () => (r2._resolve(), Kt(e2), null), (f2) => (r2._reject(f2), Kt(e2), null));
      }
      n$1(en, "WritableStreamFinishErroring");
      function Ca(e2) {
        e2._inFlightWriteRequest._resolve(void 0), e2._inFlightWriteRequest = void 0;
      }
      n$1(Ca, "WritableStreamFinishInFlightWrite");
      function Pa(e2, t2) {
        e2._inFlightWriteRequest._reject(t2), e2._inFlightWriteRequest = void 0, Jr(e2, t2);
      }
      n$1(Pa, "WritableStreamFinishInFlightWriteWithError");
      function va(e2) {
        e2._inFlightCloseRequest._resolve(void 0), e2._inFlightCloseRequest = void 0, e2._state === "erroring" && (e2._storedError = void 0, e2._pendingAbortRequest !== void 0 && (e2._pendingAbortRequest._resolve(), e2._pendingAbortRequest = void 0)), e2._state = "closed";
        const r2 = e2._writer;
        r2 !== void 0 && Uo(r2);
      }
      n$1(va, "WritableStreamFinishInFlightClose");
      function Ea(e2, t2) {
        e2._inFlightCloseRequest._reject(t2), e2._inFlightCloseRequest = void 0, e2._pendingAbortRequest !== void 0 && (e2._pendingAbortRequest._reject(t2), e2._pendingAbortRequest = void 0), Jr(e2, t2);
      }
      n$1(Ea, "WritableStreamFinishInFlightCloseWithError");
      function he(e2) {
        return !(e2._closeRequest === void 0 && e2._inFlightCloseRequest === void 0);
      }
      n$1(he, "WritableStreamCloseQueuedOrInFlight");
      function Aa(e2) {
        return !(e2._inFlightWriteRequest === void 0 && e2._inFlightCloseRequest === void 0);
      }
      n$1(Aa, "WritableStreamHasOperationMarkedInFlight");
      function Ba(e2) {
        e2._inFlightCloseRequest = e2._closeRequest, e2._closeRequest = void 0;
      }
      n$1(Ba, "WritableStreamMarkCloseRequestInFlight");
      function ka(e2) {
        e2._inFlightWriteRequest = e2._writeRequests.shift();
      }
      n$1(ka, "WritableStreamMarkFirstWriteRequestInFlight");
      function Kt(e2) {
        e2._closeRequest !== void 0 && (e2._closeRequest._reject(e2._storedError), e2._closeRequest = void 0);
        const t2 = e2._writer;
        t2 !== void 0 && an(t2, e2._storedError);
      }
      n$1(Kt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
      function tn(e2, t2) {
        const r2 = e2._writer;
        r2 !== void 0 && t2 !== e2._backpressure && (t2 ? xa(r2) : ln(r2)), e2._backpressure = t2;
      }
      n$1(tn, "WritableStreamUpdateBackpressure");
      const Rn = class Rn {
        constructor(t2) {
          if (Se(t2, 1, "WritableStreamDefaultWriter"), Bo(t2, "First parameter"), Ze(t2))
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          this._ownerWritableStream = t2, t2._writer = this;
          const r2 = t2._state;
          if (r2 === "writable")
            !he(t2) && t2._backpressure ? rr(this) : xo(this), tr(this);
          else if (r2 === "erroring")
            sn(this, t2._storedError), tr(this);
          else if (r2 === "closed")
            xo(this), Ma(this);
          else {
            const s2 = t2._storedError;
            sn(this, s2), Mo(this, s2);
          }
        }
        get closed() {
          return je(this) ? this._closedPromise : b2(Le("closed"));
        }
        get desiredSize() {
          if (!je(this))
            throw Le("desiredSize");
          if (this._ownerWritableStream === void 0)
            throw Rt("desiredSize");
          return za(this);
        }
        get ready() {
          return je(this) ? this._readyPromise : b2(Le("ready"));
        }
        abort(t2 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? b2(Rt("abort")) : Wa(this, t2) : b2(Le("abort"));
        }
        close() {
          if (!je(this))
            return b2(Le("close"));
          const t2 = this._ownerWritableStream;
          return t2 === void 0 ? b2(Rt("close")) : he(t2) ? b2(new TypeError("Cannot close an already-closing stream")) : Oo(this);
        }
        releaseLock() {
          if (!je(this))
            throw Le("releaseLock");
          this._ownerWritableStream !== void 0 && Io(this);
        }
        write(t2 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? b2(Rt("write to")) : Fo(this, t2) : b2(Le("write"));
        }
      };
      n$1(Rn, "WritableStreamDefaultWriter");
      let re = Rn;
      Object.defineProperties(re.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), h2(re.prototype.abort, "abort"), h2(re.prototype.close, "close"), h2(re.prototype.releaseLock, "releaseLock"), h2(re.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(re.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
      function je(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_ownerWritableStream") ? false : e2 instanceof re;
      }
      n$1(je, "IsWritableStreamDefaultWriter");
      function Wa(e2, t2) {
        const r2 = e2._ownerWritableStream;
        return Zt(r2, t2);
      }
      n$1(Wa, "WritableStreamDefaultWriterAbort");
      function Oo(e2) {
        const t2 = e2._ownerWritableStream;
        return qo(t2);
      }
      n$1(Oo, "WritableStreamDefaultWriterClose");
      function qa(e2) {
        const t2 = e2._ownerWritableStream, r2 = t2._state;
        return he(t2) || r2 === "closed" ? T2(void 0) : r2 === "errored" ? b2(t2._storedError) : Oo(e2);
      }
      n$1(qa, "WritableStreamDefaultWriterCloseWithErrorPropagation");
      function Oa(e2, t2) {
        e2._closedPromiseState === "pending" ? an(e2, t2) : Ua(e2, t2);
      }
      n$1(Oa, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
      function zo(e2, t2) {
        e2._readyPromiseState === "pending" ? No(e2, t2) : Na(e2, t2);
      }
      n$1(zo, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
      function za(e2) {
        const t2 = e2._ownerWritableStream, r2 = t2._state;
        return r2 === "errored" || r2 === "erroring" ? null : r2 === "closed" ? 0 : $o(t2._writableStreamController);
      }
      n$1(za, "WritableStreamDefaultWriterGetDesiredSize");
      function Io(e2) {
        const t2 = e2._ownerWritableStream, r2 = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        zo(e2, r2), Oa(e2, r2), t2._writer = void 0, e2._ownerWritableStream = void 0;
      }
      n$1(Io, "WritableStreamDefaultWriterRelease");
      function Fo(e2, t2) {
        const r2 = e2._ownerWritableStream, s2 = r2._writableStreamController, f2 = ja(s2, t2);
        if (r2 !== e2._ownerWritableStream)
          return b2(Rt("write to"));
        const c2 = r2._state;
        if (c2 === "errored")
          return b2(r2._storedError);
        if (he(r2) || c2 === "closed")
          return b2(new TypeError("The stream is closing or closed and cannot be written to"));
        if (c2 === "erroring")
          return b2(r2._storedError);
        const d2 = Ta(r2);
        return La(s2, t2, f2), d2;
      }
      n$1(Fo, "WritableStreamDefaultWriterWrite");
      const jo = {}, Tn = class Tn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!rn(this))
            throw on("abortReason");
          return this._abortReason;
        }
        get signal() {
          if (!rn(this))
            throw on("signal");
          if (this._abortController === void 0)
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          return this._abortController.signal;
        }
        error(t2 = void 0) {
          if (!rn(this))
            throw on("error");
          this._controlledWritableStream._state === "writable" && Do(this, t2);
        }
        [Ft](t2) {
          const r2 = this._abortAlgorithm(t2);
          return Jt(this), r2;
        }
        [Qn]() {
          Be(this);
        }
      };
      n$1(Tn, "WritableStreamDefaultController");
      let ke = Tn;
      Object.defineProperties(ke.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ke.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
      function rn(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_controlledWritableStream") ? false : e2 instanceof ke;
      }
      n$1(rn, "IsWritableStreamDefaultController");
      function Lo(e2, t2, r2, s2, f2, c2, d2, m2) {
        t2._controlledWritableStream = e2, e2._writableStreamController = t2, t2._queue = void 0, t2._queueTotalSize = void 0, Be(t2), t2._abortReason = void 0, t2._abortController = wa(), t2._started = false, t2._strategySizeAlgorithm = m2, t2._strategyHWM = d2, t2._writeAlgorithm = s2, t2._closeAlgorithm = f2, t2._abortAlgorithm = c2;
        const R2 = nn(t2);
        tn(e2, R2);
        const y2 = r2(), C = T2(y2);
        _2(C, () => (t2._started = true, Xt(t2), null), (P2) => (t2._started = true, Jr(e2, P2), null));
      }
      n$1(Lo, "SetUpWritableStreamDefaultController");
      function Ia(e2, t2, r2, s2) {
        const f2 = Object.create(ke.prototype);
        let c2, d2, m2, R2;
        t2.start !== void 0 ? c2 = n$1(() => t2.start(f2), "startAlgorithm") : c2 = n$1(() => {
        }, "startAlgorithm"), t2.write !== void 0 ? d2 = n$1((y2) => t2.write(y2, f2), "writeAlgorithm") : d2 = n$1(() => T2(void 0), "writeAlgorithm"), t2.close !== void 0 ? m2 = n$1(() => t2.close(), "closeAlgorithm") : m2 = n$1(() => T2(void 0), "closeAlgorithm"), t2.abort !== void 0 ? R2 = n$1((y2) => t2.abort(y2), "abortAlgorithm") : R2 = n$1(() => T2(void 0), "abortAlgorithm"), Lo(e2, f2, c2, d2, m2, R2, r2, s2);
      }
      n$1(Ia, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
      function Jt(e2) {
        e2._writeAlgorithm = void 0, e2._closeAlgorithm = void 0, e2._abortAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
      }
      n$1(Jt, "WritableStreamDefaultControllerClearAlgorithms");
      function Fa(e2) {
        Nr(e2, jo, 0), Xt(e2);
      }
      n$1(Fa, "WritableStreamDefaultControllerClose");
      function ja(e2, t2) {
        try {
          return e2._strategySizeAlgorithm(t2);
        } catch (r2) {
          return wt(e2, r2), 1;
        }
      }
      n$1(ja, "WritableStreamDefaultControllerGetChunkSize");
      function $o(e2) {
        return e2._strategyHWM - e2._queueTotalSize;
      }
      n$1($o, "WritableStreamDefaultControllerGetDesiredSize");
      function La(e2, t2, r2) {
        try {
          Nr(e2, t2, r2);
        } catch (f2) {
          wt(e2, f2);
          return;
        }
        const s2 = e2._controlledWritableStream;
        if (!he(s2) && s2._state === "writable") {
          const f2 = nn(e2);
          tn(s2, f2);
        }
        Xt(e2);
      }
      n$1(La, "WritableStreamDefaultControllerWrite");
      function Xt(e2) {
        const t2 = e2._controlledWritableStream;
        if (!e2._started || t2._inFlightWriteRequest !== void 0)
          return;
        if (t2._state === "erroring") {
          en(t2);
          return;
        }
        if (e2._queue.length === 0)
          return;
        const s2 = Ji(e2);
        s2 === jo ? $a(e2) : Da(e2, s2);
      }
      n$1(Xt, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
      function wt(e2, t2) {
        e2._controlledWritableStream._state === "writable" && Do(e2, t2);
      }
      n$1(wt, "WritableStreamDefaultControllerErrorIfNeeded");
      function $a(e2) {
        const t2 = e2._controlledWritableStream;
        Ba(t2), xr(e2);
        const r2 = e2._closeAlgorithm();
        Jt(e2), _2(r2, () => (va(t2), null), (s2) => (Ea(t2, s2), null));
      }
      n$1($a, "WritableStreamDefaultControllerProcessClose");
      function Da(e2, t2) {
        const r2 = e2._controlledWritableStream;
        ka(r2);
        const s2 = e2._writeAlgorithm(t2);
        _2(s2, () => {
          Ca(r2);
          const f2 = r2._state;
          if (xr(e2), !he(r2) && f2 === "writable") {
            const c2 = nn(e2);
            tn(r2, c2);
          }
          return Xt(e2), null;
        }, (f2) => (r2._state === "writable" && Jt(e2), Pa(r2, f2), null));
      }
      n$1(Da, "WritableStreamDefaultControllerProcessWrite");
      function nn(e2) {
        return $o(e2) <= 0;
      }
      n$1(nn, "WritableStreamDefaultControllerGetBackpressure");
      function Do(e2, t2) {
        const r2 = e2._controlledWritableStream;
        Jt(e2), Xr(r2, t2);
      }
      n$1(Do, "WritableStreamDefaultControllerError");
      function er(e2) {
        return new TypeError(`WritableStream.prototype.${e2} can only be used on a WritableStream`);
      }
      n$1(er, "streamBrandCheckException$2");
      function on(e2) {
        return new TypeError(`WritableStreamDefaultController.prototype.${e2} can only be used on a WritableStreamDefaultController`);
      }
      n$1(on, "defaultControllerBrandCheckException$2");
      function Le(e2) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${e2} can only be used on a WritableStreamDefaultWriter`);
      }
      n$1(Le, "defaultWriterBrandCheckException");
      function Rt(e2) {
        return new TypeError("Cannot " + e2 + " a stream using a released writer");
      }
      n$1(Rt, "defaultWriterLockException");
      function tr(e2) {
        e2._closedPromise = E2((t2, r2) => {
          e2._closedPromise_resolve = t2, e2._closedPromise_reject = r2, e2._closedPromiseState = "pending";
        });
      }
      n$1(tr, "defaultWriterClosedPromiseInitialize");
      function Mo(e2, t2) {
        tr(e2), an(e2, t2);
      }
      n$1(Mo, "defaultWriterClosedPromiseInitializeAsRejected");
      function Ma(e2) {
        tr(e2), Uo(e2);
      }
      n$1(Ma, "defaultWriterClosedPromiseInitializeAsResolved");
      function an(e2, t2) {
        e2._closedPromise_reject !== void 0 && (Q(e2._closedPromise), e2._closedPromise_reject(t2), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "rejected");
      }
      n$1(an, "defaultWriterClosedPromiseReject");
      function Ua(e2, t2) {
        Mo(e2, t2);
      }
      n$1(Ua, "defaultWriterClosedPromiseResetToRejected");
      function Uo(e2) {
        e2._closedPromise_resolve !== void 0 && (e2._closedPromise_resolve(void 0), e2._closedPromise_resolve = void 0, e2._closedPromise_reject = void 0, e2._closedPromiseState = "resolved");
      }
      n$1(Uo, "defaultWriterClosedPromiseResolve");
      function rr(e2) {
        e2._readyPromise = E2((t2, r2) => {
          e2._readyPromise_resolve = t2, e2._readyPromise_reject = r2;
        }), e2._readyPromiseState = "pending";
      }
      n$1(rr, "defaultWriterReadyPromiseInitialize");
      function sn(e2, t2) {
        rr(e2), No(e2, t2);
      }
      n$1(sn, "defaultWriterReadyPromiseInitializeAsRejected");
      function xo(e2) {
        rr(e2), ln(e2);
      }
      n$1(xo, "defaultWriterReadyPromiseInitializeAsResolved");
      function No(e2, t2) {
        e2._readyPromise_reject !== void 0 && (Q(e2._readyPromise), e2._readyPromise_reject(t2), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "rejected");
      }
      n$1(No, "defaultWriterReadyPromiseReject");
      function xa(e2) {
        rr(e2);
      }
      n$1(xa, "defaultWriterReadyPromiseReset");
      function Na(e2, t2) {
        sn(e2, t2);
      }
      n$1(Na, "defaultWriterReadyPromiseResetToRejected");
      function ln(e2) {
        e2._readyPromise_resolve !== void 0 && (e2._readyPromise_resolve(void 0), e2._readyPromise_resolve = void 0, e2._readyPromise_reject = void 0, e2._readyPromiseState = "fulfilled");
      }
      n$1(ln, "defaultWriterReadyPromiseResolve");
      function Ha() {
        if (typeof globalThis < "u")
          return globalThis;
        if (typeof self < "u")
          return self;
        if (typeof n$2 < "u")
          return n$2;
      }
      n$1(Ha, "getGlobals");
      const un = Ha();
      function Va(e2) {
        if (!(typeof e2 == "function" || typeof e2 == "object") || e2.name !== "DOMException")
          return false;
        try {
          return new e2(), true;
        } catch {
          return false;
        }
      }
      n$1(Va, "isDOMExceptionConstructor");
      function Qa() {
        const e2 = un == null ? void 0 : un.DOMException;
        return Va(e2) ? e2 : void 0;
      }
      n$1(Qa, "getFromGlobal");
      function Ya() {
        const e2 = n$1(function(r2, s2) {
          this.message = r2 || "", this.name = s2 || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
        }, "DOMException");
        return h2(e2, "DOMException"), e2.prototype = Object.create(Error.prototype), Object.defineProperty(e2.prototype, "constructor", { value: e2, writable: true, configurable: true }), e2;
      }
      n$1(Ya, "createPolyfill");
      const Ga = Qa() || Ya();
      function Ho(e2, t2, r2, s2, f2, c2) {
        const d2 = Qe(e2), m2 = ko(t2);
        e2._disturbed = true;
        let R2 = false, y2 = T2(void 0);
        return E2((C, P2) => {
          let B2;
          if (c2 !== void 0) {
            if (B2 = n$1(() => {
              const S2 = c2.reason !== void 0 ? c2.reason : new Ga("Aborted", "AbortError"), v2 = [];
              s2 || v2.push(() => t2._state === "writable" ? Zt(t2, S2) : T2(void 0)), f2 || v2.push(() => e2._state === "readable" ? ie(e2, S2) : T2(void 0)), N2(() => Promise.all(v2.map((k2) => k2())), true, S2);
            }, "abortAlgorithm"), c2.aborted) {
              B2();
              return;
            }
            c2.addEventListener("abort", B2);
          }
          function ae() {
            return E2((S2, v2) => {
              function k2(Y2) {
                Y2 ? S2() : q2(nt(), k2, v2);
              }
              n$1(k2, "next"), k2(false);
            });
          }
          n$1(ae, "pipeLoop");
          function nt() {
            return R2 ? T2(true) : q2(m2._readyPromise, () => E2((S2, v2) => {
              mt(d2, { _chunkSteps: (k2) => {
                y2 = q2(Fo(m2, k2), void 0, u2), S2(false);
              }, _closeSteps: () => S2(true), _errorSteps: v2 });
            }));
          }
          if (n$1(nt, "pipeStep"), Te(e2, d2._closedPromise, (S2) => (s2 ? J2(true, S2) : N2(() => Zt(t2, S2), true, S2), null)), Te(t2, m2._closedPromise, (S2) => (f2 ? J2(true, S2) : N2(() => ie(e2, S2), true, S2), null)), x2(e2, d2._closedPromise, () => (r2 ? J2() : N2(() => qa(m2)), null)), he(t2) || t2._state === "closed") {
            const S2 = new TypeError("the destination writable stream closed before all data could be piped to it");
            f2 ? J2(true, S2) : N2(() => ie(e2, S2), true, S2);
          }
          Q(ae());
          function Oe() {
            const S2 = y2;
            return q2(y2, () => S2 !== y2 ? Oe() : void 0);
          }
          n$1(Oe, "waitForWritesToFinish");
          function Te(S2, v2, k2) {
            S2._state === "errored" ? k2(S2._storedError) : I2(v2, k2);
          }
          n$1(Te, "isOrBecomesErrored");
          function x2(S2, v2, k2) {
            S2._state === "closed" ? k2() : V2(v2, k2);
          }
          n$1(x2, "isOrBecomesClosed");
          function N2(S2, v2, k2) {
            if (R2)
              return;
            R2 = true, t2._state === "writable" && !he(t2) ? V2(Oe(), Y2) : Y2();
            function Y2() {
              return _2(S2(), () => Ce(v2, k2), (ot) => Ce(true, ot)), null;
            }
            n$1(Y2, "doTheRest");
          }
          n$1(N2, "shutdownWithAction");
          function J2(S2, v2) {
            R2 || (R2 = true, t2._state === "writable" && !he(t2) ? V2(Oe(), () => Ce(S2, v2)) : Ce(S2, v2));
          }
          n$1(J2, "shutdown");
          function Ce(S2, v2) {
            return Io(m2), _e(d2), c2 !== void 0 && c2.removeEventListener("abort", B2), S2 ? P2(v2) : C(void 0), null;
          }
          n$1(Ce, "finalize");
        });
      }
      n$1(Ho, "ReadableStreamPipeTo");
      const Cn = class Cn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!nr(this))
            throw ir("desiredSize");
          return fn(this);
        }
        close() {
          if (!nr(this))
            throw ir("close");
          if (!Je(this))
            throw new TypeError("The stream is not in a state that permits close");
          $e(this);
        }
        enqueue(t2 = void 0) {
          if (!nr(this))
            throw ir("enqueue");
          if (!Je(this))
            throw new TypeError("The stream is not in a state that permits enqueue");
          return Ke(this, t2);
        }
        error(t2 = void 0) {
          if (!nr(this))
            throw ir("error");
          oe(this, t2);
        }
        [Ar](t2) {
          Be(this);
          const r2 = this._cancelAlgorithm(t2);
          return or(this), r2;
        }
        [Br](t2) {
          const r2 = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const s2 = xr(this);
            this._closeRequested && this._queue.length === 0 ? (or(this), Pt(r2)) : Tt(this), t2._chunkSteps(s2);
          } else
            eo(r2, t2), Tt(this);
        }
        [kr]() {
        }
      };
      n$1(Cn, "ReadableStreamDefaultController");
      let ne = Cn;
      Object.defineProperties(ne.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), h2(ne.prototype.close, "close"), h2(ne.prototype.enqueue, "enqueue"), h2(ne.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ne.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
      function nr(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_controlledReadableStream") ? false : e2 instanceof ne;
      }
      n$1(nr, "IsReadableStreamDefaultController");
      function Tt(e2) {
        if (!Vo(e2))
          return;
        if (e2._pulling) {
          e2._pullAgain = true;
          return;
        }
        e2._pulling = true;
        const r2 = e2._pullAlgorithm();
        _2(r2, () => (e2._pulling = false, e2._pullAgain && (e2._pullAgain = false, Tt(e2)), null), (s2) => (oe(e2, s2), null));
      }
      n$1(Tt, "ReadableStreamDefaultControllerCallPullIfNeeded");
      function Vo(e2) {
        const t2 = e2._controlledReadableStream;
        return !Je(e2) || !e2._started ? false : !!(qe(t2) && Lt(t2) > 0 || fn(e2) > 0);
      }
      n$1(Vo, "ReadableStreamDefaultControllerShouldCallPull");
      function or(e2) {
        e2._pullAlgorithm = void 0, e2._cancelAlgorithm = void 0, e2._strategySizeAlgorithm = void 0;
      }
      n$1(or, "ReadableStreamDefaultControllerClearAlgorithms");
      function $e(e2) {
        if (!Je(e2))
          return;
        const t2 = e2._controlledReadableStream;
        e2._closeRequested = true, e2._queue.length === 0 && (or(e2), Pt(t2));
      }
      n$1($e, "ReadableStreamDefaultControllerClose");
      function Ke(e2, t2) {
        if (!Je(e2))
          return;
        const r2 = e2._controlledReadableStream;
        if (qe(r2) && Lt(r2) > 0)
          Lr(r2, t2, false);
        else {
          let s2;
          try {
            s2 = e2._strategySizeAlgorithm(t2);
          } catch (f2) {
            throw oe(e2, f2), f2;
          }
          try {
            Nr(e2, t2, s2);
          } catch (f2) {
            throw oe(e2, f2), f2;
          }
        }
        Tt(e2);
      }
      n$1(Ke, "ReadableStreamDefaultControllerEnqueue");
      function oe(e2, t2) {
        const r2 = e2._controlledReadableStream;
        r2._state === "readable" && (Be(e2), or(e2), Zo(r2, t2));
      }
      n$1(oe, "ReadableStreamDefaultControllerError");
      function fn(e2) {
        const t2 = e2._controlledReadableStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e2._strategyHWM - e2._queueTotalSize;
      }
      n$1(fn, "ReadableStreamDefaultControllerGetDesiredSize");
      function Za(e2) {
        return !Vo(e2);
      }
      n$1(Za, "ReadableStreamDefaultControllerHasBackpressure");
      function Je(e2) {
        const t2 = e2._controlledReadableStream._state;
        return !e2._closeRequested && t2 === "readable";
      }
      n$1(Je, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
      function Qo(e2, t2, r2, s2, f2, c2, d2) {
        t2._controlledReadableStream = e2, t2._queue = void 0, t2._queueTotalSize = void 0, Be(t2), t2._started = false, t2._closeRequested = false, t2._pullAgain = false, t2._pulling = false, t2._strategySizeAlgorithm = d2, t2._strategyHWM = c2, t2._pullAlgorithm = s2, t2._cancelAlgorithm = f2, e2._readableStreamController = t2;
        const m2 = r2();
        _2(T2(m2), () => (t2._started = true, Tt(t2), null), (R2) => (oe(t2, R2), null));
      }
      n$1(Qo, "SetUpReadableStreamDefaultController");
      function Ka(e2, t2, r2, s2) {
        const f2 = Object.create(ne.prototype);
        let c2, d2, m2;
        t2.start !== void 0 ? c2 = n$1(() => t2.start(f2), "startAlgorithm") : c2 = n$1(() => {
        }, "startAlgorithm"), t2.pull !== void 0 ? d2 = n$1(() => t2.pull(f2), "pullAlgorithm") : d2 = n$1(() => T2(void 0), "pullAlgorithm"), t2.cancel !== void 0 ? m2 = n$1((R2) => t2.cancel(R2), "cancelAlgorithm") : m2 = n$1(() => T2(void 0), "cancelAlgorithm"), Qo(e2, f2, c2, d2, m2, r2, s2);
      }
      n$1(Ka, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
      function ir(e2) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${e2} can only be used on a ReadableStreamDefaultController`);
      }
      n$1(ir, "defaultControllerBrandCheckException$1");
      function Ja(e2, t2) {
        return ze(e2._readableStreamController) ? es(e2) : Xa(e2);
      }
      n$1(Ja, "ReadableStreamTee");
      function Xa(e2, t2) {
        const r2 = Qe(e2);
        let s2 = false, f2 = false, c2 = false, d2 = false, m2, R2, y2, C, P2;
        const B2 = E2((x2) => {
          P2 = x2;
        });
        function ae() {
          return s2 ? (f2 = true, T2(void 0)) : (s2 = true, mt(r2, { _chunkSteps: (N2) => {
            ge(() => {
              f2 = false;
              const J2 = N2, Ce = N2;
              c2 || Ke(y2._readableStreamController, J2), d2 || Ke(C._readableStreamController, Ce), s2 = false, f2 && ae();
            });
          }, _closeSteps: () => {
            s2 = false, c2 || $e(y2._readableStreamController), d2 || $e(C._readableStreamController), (!c2 || !d2) && P2(void 0);
          }, _errorSteps: () => {
            s2 = false;
          } }), T2(void 0));
        }
        n$1(ae, "pullAlgorithm");
        function nt(x2) {
          if (c2 = true, m2 = x2, d2) {
            const N2 = yt([m2, R2]), J2 = ie(e2, N2);
            P2(J2);
          }
          return B2;
        }
        n$1(nt, "cancel1Algorithm");
        function Oe(x2) {
          if (d2 = true, R2 = x2, c2) {
            const N2 = yt([m2, R2]), J2 = ie(e2, N2);
            P2(J2);
          }
          return B2;
        }
        n$1(Oe, "cancel2Algorithm");
        function Te() {
        }
        return n$1(Te, "startAlgorithm"), y2 = Ct(Te, ae, nt), C = Ct(Te, ae, Oe), I2(r2._closedPromise, (x2) => (oe(y2._readableStreamController, x2), oe(C._readableStreamController, x2), (!c2 || !d2) && P2(void 0), null)), [y2, C];
      }
      n$1(Xa, "ReadableStreamDefaultTee");
      function es(e2) {
        let t2 = Qe(e2), r2 = false, s2 = false, f2 = false, c2 = false, d2 = false, m2, R2, y2, C, P2;
        const B2 = E2((S2) => {
          P2 = S2;
        });
        function ae(S2) {
          I2(S2._closedPromise, (v2) => (S2 !== t2 || (K(y2._readableStreamController, v2), K(C._readableStreamController, v2), (!c2 || !d2) && P2(void 0)), null));
        }
        n$1(ae, "forwardReaderError");
        function nt() {
          Fe(t2) && (_e(t2), t2 = Qe(e2), ae(t2)), mt(t2, { _chunkSteps: (v2) => {
            ge(() => {
              s2 = false, f2 = false;
              const k2 = v2;
              let Y2 = v2;
              if (!c2 && !d2)
                try {
                  Y2 = fo(v2);
                } catch (ot) {
                  K(y2._readableStreamController, ot), K(C._readableStreamController, ot), P2(ie(e2, ot));
                  return;
                }
              c2 || Nt(y2._readableStreamController, k2), d2 || Nt(C._readableStreamController, Y2), r2 = false, s2 ? Te() : f2 && x2();
            });
          }, _closeSteps: () => {
            r2 = false, c2 || gt(y2._readableStreamController), d2 || gt(C._readableStreamController), y2._readableStreamController._pendingPullIntos.length > 0 && Ht(y2._readableStreamController, 0), C._readableStreamController._pendingPullIntos.length > 0 && Ht(C._readableStreamController, 0), (!c2 || !d2) && P2(void 0);
          }, _errorSteps: () => {
            r2 = false;
          } });
        }
        n$1(nt, "pullWithDefaultReader");
        function Oe(S2, v2) {
          Ee(t2) && (_e(t2), t2 = Co(e2), ae(t2));
          const k2 = v2 ? C : y2, Y2 = v2 ? y2 : C;
          Eo(t2, S2, 1, { _chunkSteps: (it) => {
            ge(() => {
              s2 = false, f2 = false;
              const at = v2 ? d2 : c2;
              if (v2 ? c2 : d2)
                at || Vt(k2._readableStreamController, it);
              else {
                let ui;
                try {
                  ui = fo(it);
                } catch (kn) {
                  K(k2._readableStreamController, kn), K(Y2._readableStreamController, kn), P2(ie(e2, kn));
                  return;
                }
                at || Vt(k2._readableStreamController, it), Nt(Y2._readableStreamController, ui);
              }
              r2 = false, s2 ? Te() : f2 && x2();
            });
          }, _closeSteps: (it) => {
            r2 = false;
            const at = v2 ? d2 : c2, fr = v2 ? c2 : d2;
            at || gt(k2._readableStreamController), fr || gt(Y2._readableStreamController), it !== void 0 && (at || Vt(k2._readableStreamController, it), !fr && Y2._readableStreamController._pendingPullIntos.length > 0 && Ht(Y2._readableStreamController, 0)), (!at || !fr) && P2(void 0);
          }, _errorSteps: () => {
            r2 = false;
          } });
        }
        n$1(Oe, "pullWithBYOBReader");
        function Te() {
          if (r2)
            return s2 = true, T2(void 0);
          r2 = true;
          const S2 = Gr(y2._readableStreamController);
          return S2 === null ? nt() : Oe(S2._view, false), T2(void 0);
        }
        n$1(Te, "pull1Algorithm");
        function x2() {
          if (r2)
            return f2 = true, T2(void 0);
          r2 = true;
          const S2 = Gr(C._readableStreamController);
          return S2 === null ? nt() : Oe(S2._view, true), T2(void 0);
        }
        n$1(x2, "pull2Algorithm");
        function N2(S2) {
          if (c2 = true, m2 = S2, d2) {
            const v2 = yt([m2, R2]), k2 = ie(e2, v2);
            P2(k2);
          }
          return B2;
        }
        n$1(N2, "cancel1Algorithm");
        function J2(S2) {
          if (d2 = true, R2 = S2, c2) {
            const v2 = yt([m2, R2]), k2 = ie(e2, v2);
            P2(k2);
          }
          return B2;
        }
        n$1(J2, "cancel2Algorithm");
        function Ce() {
        }
        return n$1(Ce, "startAlgorithm"), y2 = Go(Ce, Te, N2), C = Go(Ce, x2, J2), ae(t2), [y2, C];
      }
      n$1(es, "ReadableByteStreamTee");
      function ts(e2) {
        return l2(e2) && typeof e2.getReader < "u";
      }
      n$1(ts, "isReadableStreamLike");
      function rs(e2) {
        return ts(e2) ? os(e2.getReader()) : ns(e2);
      }
      n$1(rs, "ReadableStreamFrom");
      function ns(e2) {
        let t2;
        const r2 = uo(e2, "async"), s2 = u2;
        function f2() {
          let d2;
          try {
            d2 = Yi(r2);
          } catch (R2) {
            return b2(R2);
          }
          const m2 = T2(d2);
          return F2(m2, (R2) => {
            if (!l2(R2))
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            if (Gi(R2))
              $e(t2._readableStreamController);
            else {
              const C = Zi(R2);
              Ke(t2._readableStreamController, C);
            }
          });
        }
        n$1(f2, "pullAlgorithm");
        function c2(d2) {
          const m2 = r2.iterator;
          let R2;
          try {
            R2 = Mt(m2, "return");
          } catch (P2) {
            return b2(P2);
          }
          if (R2 === void 0)
            return T2(void 0);
          let y2;
          try {
            y2 = z2(R2, m2, [d2]);
          } catch (P2) {
            return b2(P2);
          }
          const C = T2(y2);
          return F2(C, (P2) => {
            if (!l2(P2))
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
          });
        }
        return n$1(c2, "cancelAlgorithm"), t2 = Ct(s2, f2, c2, 0), t2;
      }
      n$1(ns, "ReadableStreamFromIterable");
      function os(e2) {
        let t2;
        const r2 = u2;
        function s2() {
          let c2;
          try {
            c2 = e2.read();
          } catch (d2) {
            return b2(d2);
          }
          return F2(c2, (d2) => {
            if (!l2(d2))
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            if (d2.done)
              $e(t2._readableStreamController);
            else {
              const m2 = d2.value;
              Ke(t2._readableStreamController, m2);
            }
          });
        }
        n$1(s2, "pullAlgorithm");
        function f2(c2) {
          try {
            return T2(e2.cancel(c2));
          } catch (d2) {
            return b2(d2);
          }
        }
        return n$1(f2, "cancelAlgorithm"), t2 = Ct(r2, s2, f2, 0), t2;
      }
      n$1(os, "ReadableStreamFromDefaultReader");
      function is(e2, t2) {
        ue(e2, t2);
        const r2 = e2, s2 = r2 == null ? void 0 : r2.autoAllocateChunkSize, f2 = r2 == null ? void 0 : r2.cancel, c2 = r2 == null ? void 0 : r2.pull, d2 = r2 == null ? void 0 : r2.start, m2 = r2 == null ? void 0 : r2.type;
        return { autoAllocateChunkSize: s2 === void 0 ? void 0 : Fr(s2, `${t2} has member 'autoAllocateChunkSize' that`), cancel: f2 === void 0 ? void 0 : as(f2, r2, `${t2} has member 'cancel' that`), pull: c2 === void 0 ? void 0 : ss(c2, r2, `${t2} has member 'pull' that`), start: d2 === void 0 ? void 0 : ls(d2, r2, `${t2} has member 'start' that`), type: m2 === void 0 ? void 0 : us(m2, `${t2} has member 'type' that`) };
      }
      n$1(is, "convertUnderlyingDefaultOrByteSource");
      function as(e2, t2, r2) {
        return Z(e2, r2), (s2) => j2(e2, t2, [s2]);
      }
      n$1(as, "convertUnderlyingSourceCancelCallback");
      function ss(e2, t2, r2) {
        return Z(e2, r2), (s2) => j2(e2, t2, [s2]);
      }
      n$1(ss, "convertUnderlyingSourcePullCallback");
      function ls(e2, t2, r2) {
        return Z(e2, r2), (s2) => z2(e2, t2, [s2]);
      }
      n$1(ls, "convertUnderlyingSourceStartCallback");
      function us(e2, t2) {
        if (e2 = `${e2}`, e2 !== "bytes")
          throw new TypeError(`${t2} '${e2}' is not a valid enumeration value for ReadableStreamType`);
        return e2;
      }
      n$1(us, "convertReadableStreamType");
      function fs(e2, t2) {
        return ue(e2, t2), { preventCancel: !!(e2 == null ? void 0 : e2.preventCancel) };
      }
      n$1(fs, "convertIteratorOptions");
      function Yo(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.preventAbort, s2 = e2 == null ? void 0 : e2.preventCancel, f2 = e2 == null ? void 0 : e2.preventClose, c2 = e2 == null ? void 0 : e2.signal;
        return c2 !== void 0 && cs(c2, `${t2} has member 'signal' that`), { preventAbort: !!r2, preventCancel: !!s2, preventClose: !!f2, signal: c2 };
      }
      n$1(Yo, "convertPipeOptions");
      function cs(e2, t2) {
        if (!_a2(e2))
          throw new TypeError(`${t2} is not an AbortSignal.`);
      }
      n$1(cs, "assertAbortSignal");
      function ds(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.readable;
        zr(r2, "readable", "ReadableWritablePair"), jr(r2, `${t2} has member 'readable' that`);
        const s2 = e2 == null ? void 0 : e2.writable;
        return zr(s2, "writable", "ReadableWritablePair"), Bo(s2, `${t2} has member 'writable' that`), { readable: r2, writable: s2 };
      }
      n$1(ds, "convertReadableWritablePair");
      const Pn = class Pn {
        constructor(t2 = {}, r2 = {}) {
          t2 === void 0 ? t2 = null : Jn(t2, "First parameter");
          const s2 = Gt(r2, "Second parameter"), f2 = is(t2, "First parameter");
          if (cn(this), f2.type === "bytes") {
            if (s2.size !== void 0)
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            const c2 = St(s2, 0);
            aa(this, f2, c2);
          } else {
            const c2 = Yt(s2), d2 = St(s2, 1);
            Ka(this, f2, d2, c2);
          }
        }
        get locked() {
          if (!We(this))
            throw De("locked");
          return qe(this);
        }
        cancel(t2 = void 0) {
          return We(this) ? qe(this) ? b2(new TypeError("Cannot cancel a stream that already has a reader")) : ie(this, t2) : b2(De("cancel"));
        }
        getReader(t2 = void 0) {
          if (!We(this))
            throw De("getReader");
          return la(t2, "First parameter").mode === void 0 ? Qe(this) : Co(this);
        }
        pipeThrough(t2, r2 = {}) {
          if (!We(this))
            throw De("pipeThrough");
          Se(t2, 1, "pipeThrough");
          const s2 = ds(t2, "First parameter"), f2 = Yo(r2, "Second parameter");
          if (qe(this))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          if (Ze(s2.writable))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          const c2 = Ho(this, s2.writable, f2.preventClose, f2.preventAbort, f2.preventCancel, f2.signal);
          return Q(c2), s2.readable;
        }
        pipeTo(t2, r2 = {}) {
          if (!We(this))
            return b2(De("pipeTo"));
          if (t2 === void 0)
            return b2("Parameter 1 is required in 'pipeTo'.");
          if (!Ge(t2))
            return b2(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
          let s2;
          try {
            s2 = Yo(r2, "Second parameter");
          } catch (f2) {
            return b2(f2);
          }
          return qe(this) ? b2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Ze(t2) ? b2(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Ho(this, t2, s2.preventClose, s2.preventAbort, s2.preventCancel, s2.signal);
        }
        tee() {
          if (!We(this))
            throw De("tee");
          const t2 = Ja(this);
          return yt(t2);
        }
        values(t2 = void 0) {
          if (!We(this))
            throw De("values");
          const r2 = fs(t2, "First parameter");
          return Vi(this, r2.preventCancel);
        }
        [Ur](t2) {
          return this.values(t2);
        }
        static from(t2) {
          return rs(t2);
        }
      };
      n$1(Pn, "ReadableStream");
      let L2 = Pn;
      Object.defineProperties(L2, { from: { enumerable: true } }), Object.defineProperties(L2.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), h2(L2.from, "from"), h2(L2.prototype.cancel, "cancel"), h2(L2.prototype.getReader, "getReader"), h2(L2.prototype.pipeThrough, "pipeThrough"), h2(L2.prototype.pipeTo, "pipeTo"), h2(L2.prototype.tee, "tee"), h2(L2.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L2.prototype, Symbol.toStringTag, { value: "ReadableStream", configurable: true }), Object.defineProperty(L2.prototype, Ur, { value: L2.prototype.values, writable: true, configurable: true });
      function Ct(e2, t2, r2, s2 = 1, f2 = () => 1) {
        const c2 = Object.create(L2.prototype);
        cn(c2);
        const d2 = Object.create(ne.prototype);
        return Qo(c2, d2, e2, t2, r2, s2, f2), c2;
      }
      n$1(Ct, "CreateReadableStream");
      function Go(e2, t2, r2) {
        const s2 = Object.create(L2.prototype);
        cn(s2);
        const f2 = Object.create(te.prototype);
        return To(s2, f2, e2, t2, r2, 0, void 0), s2;
      }
      n$1(Go, "CreateReadableByteStream");
      function cn(e2) {
        e2._state = "readable", e2._reader = void 0, e2._storedError = void 0, e2._disturbed = false;
      }
      n$1(cn, "InitializeReadableStream");
      function We(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_readableStreamController") ? false : e2 instanceof L2;
      }
      n$1(We, "IsReadableStream");
      function qe(e2) {
        return e2._reader !== void 0;
      }
      n$1(qe, "IsReadableStreamLocked");
      function ie(e2, t2) {
        if (e2._disturbed = true, e2._state === "closed")
          return T2(void 0);
        if (e2._state === "errored")
          return b2(e2._storedError);
        Pt(e2);
        const r2 = e2._reader;
        if (r2 !== void 0 && Fe(r2)) {
          const f2 = r2._readIntoRequests;
          r2._readIntoRequests = new D2(), f2.forEach((c2) => {
            c2._closeSteps(void 0);
          });
        }
        const s2 = e2._readableStreamController[Ar](t2);
        return F2(s2, u2);
      }
      n$1(ie, "ReadableStreamCancel");
      function Pt(e2) {
        e2._state = "closed";
        const t2 = e2._reader;
        if (t2 !== void 0 && (Zn(t2), Ee(t2))) {
          const r2 = t2._readRequests;
          t2._readRequests = new D2(), r2.forEach((s2) => {
            s2._closeSteps();
          });
        }
      }
      n$1(Pt, "ReadableStreamClose");
      function Zo(e2, t2) {
        e2._state = "errored", e2._storedError = t2;
        const r2 = e2._reader;
        r2 !== void 0 && (Or(r2, t2), Ee(r2) ? ro(r2, t2) : Ao(r2, t2));
      }
      n$1(Zo, "ReadableStreamError");
      function De(e2) {
        return new TypeError(`ReadableStream.prototype.${e2} can only be used on a ReadableStream`);
      }
      n$1(De, "streamBrandCheckException$1");
      function Ko(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.highWaterMark;
        return zr(r2, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Ir(r2) };
      }
      n$1(Ko, "convertQueuingStrategyInit");
      const Jo = n$1((e2) => e2.byteLength, "byteLengthSizeFunction");
      h2(Jo, "size");
      const vn = class vn {
        constructor(t2) {
          Se(t2, 1, "ByteLengthQueuingStrategy"), t2 = Ko(t2, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!ei(this))
            throw Xo("highWaterMark");
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!ei(this))
            throw Xo("size");
          return Jo;
        }
      };
      n$1(vn, "ByteLengthQueuingStrategy");
      let Xe = vn;
      Object.defineProperties(Xe.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Xe.prototype, Symbol.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
      function Xo(e2) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${e2} can only be used on a ByteLengthQueuingStrategy`);
      }
      n$1(Xo, "byteLengthBrandCheckException");
      function ei(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_byteLengthQueuingStrategyHighWaterMark") ? false : e2 instanceof Xe;
      }
      n$1(ei, "IsByteLengthQueuingStrategy");
      const ti = n$1(() => 1, "countSizeFunction");
      h2(ti, "size");
      const En = class En {
        constructor(t2) {
          Se(t2, 1, "CountQueuingStrategy"), t2 = Ko(t2, "First parameter"), this._countQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!ni(this))
            throw ri("highWaterMark");
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!ni(this))
            throw ri("size");
          return ti;
        }
      };
      n$1(En, "CountQueuingStrategy");
      let et = En;
      Object.defineProperties(et.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(et.prototype, Symbol.toStringTag, { value: "CountQueuingStrategy", configurable: true });
      function ri(e2) {
        return new TypeError(`CountQueuingStrategy.prototype.${e2} can only be used on a CountQueuingStrategy`);
      }
      n$1(ri, "countBrandCheckException");
      function ni(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_countQueuingStrategyHighWaterMark") ? false : e2 instanceof et;
      }
      n$1(ni, "IsCountQueuingStrategy");
      function hs(e2, t2) {
        ue(e2, t2);
        const r2 = e2 == null ? void 0 : e2.cancel, s2 = e2 == null ? void 0 : e2.flush, f2 = e2 == null ? void 0 : e2.readableType, c2 = e2 == null ? void 0 : e2.start, d2 = e2 == null ? void 0 : e2.transform, m2 = e2 == null ? void 0 : e2.writableType;
        return { cancel: r2 === void 0 ? void 0 : ys(r2, e2, `${t2} has member 'cancel' that`), flush: s2 === void 0 ? void 0 : ps(s2, e2, `${t2} has member 'flush' that`), readableType: f2, start: c2 === void 0 ? void 0 : bs(c2, e2, `${t2} has member 'start' that`), transform: d2 === void 0 ? void 0 : ms(d2, e2, `${t2} has member 'transform' that`), writableType: m2 };
      }
      n$1(hs, "convertTransformer");
      function ps(e2, t2, r2) {
        return Z(e2, r2), (s2) => j2(e2, t2, [s2]);
      }
      n$1(ps, "convertTransformerFlushCallback");
      function bs(e2, t2, r2) {
        return Z(e2, r2), (s2) => z2(e2, t2, [s2]);
      }
      n$1(bs, "convertTransformerStartCallback");
      function ms(e2, t2, r2) {
        return Z(e2, r2), (s2, f2) => j2(e2, t2, [s2, f2]);
      }
      n$1(ms, "convertTransformerTransformCallback");
      function ys(e2, t2, r2) {
        return Z(e2, r2), (s2) => j2(e2, t2, [s2]);
      }
      n$1(ys, "convertTransformerCancelCallback");
      const An = class An {
        constructor(t2 = {}, r2 = {}, s2 = {}) {
          t2 === void 0 && (t2 = null);
          const f2 = Gt(r2, "Second parameter"), c2 = Gt(s2, "Third parameter"), d2 = hs(t2, "First parameter");
          if (d2.readableType !== void 0)
            throw new RangeError("Invalid readableType specified");
          if (d2.writableType !== void 0)
            throw new RangeError("Invalid writableType specified");
          const m2 = St(c2, 0), R2 = Yt(c2), y2 = St(f2, 1), C = Yt(f2);
          let P2;
          const B2 = E2((ae) => {
            P2 = ae;
          });
          gs(this, B2, y2, C, m2, R2), Ss(this, d2), d2.start !== void 0 ? P2(d2.start(this._transformStreamController)) : P2(void 0);
        }
        get readable() {
          if (!oi(this))
            throw li("readable");
          return this._readable;
        }
        get writable() {
          if (!oi(this))
            throw li("writable");
          return this._writable;
        }
      };
      n$1(An, "TransformStream");
      let tt = An;
      Object.defineProperties(tt.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(tt.prototype, Symbol.toStringTag, { value: "TransformStream", configurable: true });
      function gs(e2, t2, r2, s2, f2, c2) {
        function d2() {
          return t2;
        }
        n$1(d2, "startAlgorithm");
        function m2(B2) {
          return Ts(e2, B2);
        }
        n$1(m2, "writeAlgorithm");
        function R2(B2) {
          return Cs(e2, B2);
        }
        n$1(R2, "abortAlgorithm");
        function y2() {
          return Ps(e2);
        }
        n$1(y2, "closeAlgorithm"), e2._writable = Ra(d2, m2, y2, R2, r2, s2);
        function C() {
          return vs(e2);
        }
        n$1(C, "pullAlgorithm");
        function P2(B2) {
          return Es(e2, B2);
        }
        n$1(P2, "cancelAlgorithm"), e2._readable = Ct(d2, C, P2, f2, c2), e2._backpressure = void 0, e2._backpressureChangePromise = void 0, e2._backpressureChangePromise_resolve = void 0, ar(e2, true), e2._transformStreamController = void 0;
      }
      n$1(gs, "InitializeTransformStream");
      function oi(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_transformStreamController") ? false : e2 instanceof tt;
      }
      n$1(oi, "IsTransformStream");
      function ii(e2, t2) {
        oe(e2._readable._readableStreamController, t2), dn(e2, t2);
      }
      n$1(ii, "TransformStreamError");
      function dn(e2, t2) {
        lr(e2._transformStreamController), wt(e2._writable._writableStreamController, t2), hn(e2);
      }
      n$1(dn, "TransformStreamErrorWritableAndUnblockWrite");
      function hn(e2) {
        e2._backpressure && ar(e2, false);
      }
      n$1(hn, "TransformStreamUnblockWrite");
      function ar(e2, t2) {
        e2._backpressureChangePromise !== void 0 && e2._backpressureChangePromise_resolve(), e2._backpressureChangePromise = E2((r2) => {
          e2._backpressureChangePromise_resolve = r2;
        }), e2._backpressure = t2;
      }
      n$1(ar, "TransformStreamSetBackpressure");
      const Bn = class Bn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!sr(this))
            throw ur("desiredSize");
          const t2 = this._controlledTransformStream._readable._readableStreamController;
          return fn(t2);
        }
        enqueue(t2 = void 0) {
          if (!sr(this))
            throw ur("enqueue");
          ai(this, t2);
        }
        error(t2 = void 0) {
          if (!sr(this))
            throw ur("error");
          ws(this, t2);
        }
        terminate() {
          if (!sr(this))
            throw ur("terminate");
          Rs(this);
        }
      };
      n$1(Bn, "TransformStreamDefaultController");
      let pe = Bn;
      Object.defineProperties(pe.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), h2(pe.prototype.enqueue, "enqueue"), h2(pe.prototype.error, "error"), h2(pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pe.prototype, Symbol.toStringTag, { value: "TransformStreamDefaultController", configurable: true });
      function sr(e2) {
        return !l2(e2) || !Object.prototype.hasOwnProperty.call(e2, "_controlledTransformStream") ? false : e2 instanceof pe;
      }
      n$1(sr, "IsTransformStreamDefaultController");
      function _s(e2, t2, r2, s2, f2) {
        t2._controlledTransformStream = e2, e2._transformStreamController = t2, t2._transformAlgorithm = r2, t2._flushAlgorithm = s2, t2._cancelAlgorithm = f2, t2._finishPromise = void 0, t2._finishPromise_resolve = void 0, t2._finishPromise_reject = void 0;
      }
      n$1(_s, "SetUpTransformStreamDefaultController");
      function Ss(e2, t2) {
        const r2 = Object.create(pe.prototype);
        let s2, f2, c2;
        t2.transform !== void 0 ? s2 = n$1((d2) => t2.transform(d2, r2), "transformAlgorithm") : s2 = n$1((d2) => {
          try {
            return ai(r2, d2), T2(void 0);
          } catch (m2) {
            return b2(m2);
          }
        }, "transformAlgorithm"), t2.flush !== void 0 ? f2 = n$1(() => t2.flush(r2), "flushAlgorithm") : f2 = n$1(() => T2(void 0), "flushAlgorithm"), t2.cancel !== void 0 ? c2 = n$1((d2) => t2.cancel(d2), "cancelAlgorithm") : c2 = n$1(() => T2(void 0), "cancelAlgorithm"), _s(e2, r2, s2, f2, c2);
      }
      n$1(Ss, "SetUpTransformStreamDefaultControllerFromTransformer");
      function lr(e2) {
        e2._transformAlgorithm = void 0, e2._flushAlgorithm = void 0, e2._cancelAlgorithm = void 0;
      }
      n$1(lr, "TransformStreamDefaultControllerClearAlgorithms");
      function ai(e2, t2) {
        const r2 = e2._controlledTransformStream, s2 = r2._readable._readableStreamController;
        if (!Je(s2))
          throw new TypeError("Readable side is not in a state that permits enqueue");
        try {
          Ke(s2, t2);
        } catch (c2) {
          throw dn(r2, c2), r2._readable._storedError;
        }
        Za(s2) !== r2._backpressure && ar(r2, true);
      }
      n$1(ai, "TransformStreamDefaultControllerEnqueue");
      function ws(e2, t2) {
        ii(e2._controlledTransformStream, t2);
      }
      n$1(ws, "TransformStreamDefaultControllerError");
      function si(e2, t2) {
        const r2 = e2._transformAlgorithm(t2);
        return F2(r2, void 0, (s2) => {
          throw ii(e2._controlledTransformStream, s2), s2;
        });
      }
      n$1(si, "TransformStreamDefaultControllerPerformTransform");
      function Rs(e2) {
        const t2 = e2._controlledTransformStream, r2 = t2._readable._readableStreamController;
        $e(r2);
        const s2 = new TypeError("TransformStream terminated");
        dn(t2, s2);
      }
      n$1(Rs, "TransformStreamDefaultControllerTerminate");
      function Ts(e2, t2) {
        const r2 = e2._transformStreamController;
        if (e2._backpressure) {
          const s2 = e2._backpressureChangePromise;
          return F2(s2, () => {
            const f2 = e2._writable;
            if (f2._state === "erroring")
              throw f2._storedError;
            return si(r2, t2);
          });
        }
        return si(r2, t2);
      }
      n$1(Ts, "TransformStreamDefaultSinkWriteAlgorithm");
      function Cs(e2, t2) {
        const r2 = e2._transformStreamController;
        if (r2._finishPromise !== void 0)
          return r2._finishPromise;
        const s2 = e2._readable;
        r2._finishPromise = E2((c2, d2) => {
          r2._finishPromise_resolve = c2, r2._finishPromise_reject = d2;
        });
        const f2 = r2._cancelAlgorithm(t2);
        return lr(r2), _2(f2, () => (s2._state === "errored" ? rt(r2, s2._storedError) : (oe(s2._readableStreamController, t2), pn(r2)), null), (c2) => (oe(s2._readableStreamController, c2), rt(r2, c2), null)), r2._finishPromise;
      }
      n$1(Cs, "TransformStreamDefaultSinkAbortAlgorithm");
      function Ps(e2) {
        const t2 = e2._transformStreamController;
        if (t2._finishPromise !== void 0)
          return t2._finishPromise;
        const r2 = e2._readable;
        t2._finishPromise = E2((f2, c2) => {
          t2._finishPromise_resolve = f2, t2._finishPromise_reject = c2;
        });
        const s2 = t2._flushAlgorithm();
        return lr(t2), _2(s2, () => (r2._state === "errored" ? rt(t2, r2._storedError) : ($e(r2._readableStreamController), pn(t2)), null), (f2) => (oe(r2._readableStreamController, f2), rt(t2, f2), null)), t2._finishPromise;
      }
      n$1(Ps, "TransformStreamDefaultSinkCloseAlgorithm");
      function vs(e2) {
        return ar(e2, false), e2._backpressureChangePromise;
      }
      n$1(vs, "TransformStreamDefaultSourcePullAlgorithm");
      function Es(e2, t2) {
        const r2 = e2._transformStreamController;
        if (r2._finishPromise !== void 0)
          return r2._finishPromise;
        const s2 = e2._writable;
        r2._finishPromise = E2((c2, d2) => {
          r2._finishPromise_resolve = c2, r2._finishPromise_reject = d2;
        });
        const f2 = r2._cancelAlgorithm(t2);
        return lr(r2), _2(f2, () => (s2._state === "errored" ? rt(r2, s2._storedError) : (wt(s2._writableStreamController, t2), hn(e2), pn(r2)), null), (c2) => (wt(s2._writableStreamController, c2), hn(e2), rt(r2, c2), null)), r2._finishPromise;
      }
      n$1(Es, "TransformStreamDefaultSourceCancelAlgorithm");
      function ur(e2) {
        return new TypeError(`TransformStreamDefaultController.prototype.${e2} can only be used on a TransformStreamDefaultController`);
      }
      n$1(ur, "defaultControllerBrandCheckException");
      function pn(e2) {
        e2._finishPromise_resolve !== void 0 && (e2._finishPromise_resolve(), e2._finishPromise_resolve = void 0, e2._finishPromise_reject = void 0);
      }
      n$1(pn, "defaultControllerFinishPromiseResolve");
      function rt(e2, t2) {
        e2._finishPromise_reject !== void 0 && (Q(e2._finishPromise), e2._finishPromise_reject(t2), e2._finishPromise_resolve = void 0, e2._finishPromise_reject = void 0);
      }
      n$1(rt, "defaultControllerFinishPromiseReject");
      function li(e2) {
        return new TypeError(`TransformStream.prototype.${e2} can only be used on a TransformStream`);
      }
      n$1(li, "streamBrandCheckException"), a2.ByteLengthQueuingStrategy = Xe, a2.CountQueuingStrategy = et, a2.ReadableByteStreamController = te, a2.ReadableStream = L2, a2.ReadableStreamBYOBReader = ce, a2.ReadableStreamBYOBRequest = Re, a2.ReadableStreamDefaultController = ne, a2.ReadableStreamDefaultReader = fe, a2.TransformStream = tt, a2.TransformStreamDefaultController = pe, a2.WritableStream = de, a2.WritableStreamDefaultController = ke, a2.WritableStreamDefaultWriter = re;
    });
  }(pr, pr.exports)), pr.exports;
}
n$1(Ls, "requirePonyfill_es2018");
const $s = 65536;
if (!globalThis.ReadableStream)
  try {
    const i2 = require("node:process"), { emitWarning: o2 } = i2;
    try {
      i2.emitWarning = () => {
      }, Object.assign(globalThis, require("node:stream/web")), i2.emitWarning = o2;
    } catch (a2) {
      throw i2.emitWarning = o2, a2;
    }
  } catch {
    Object.assign(globalThis, Ls());
  }
try {
  const { Blob: i2 } = require("buffer");
  i2 && !i2.prototype.stream && (i2.prototype.stream = n$1(function(a2) {
    let u2 = 0;
    const l2 = this;
    return new ReadableStream({ type: "bytes", async pull(p) {
      const g2 = await l2.slice(u2, Math.min(l2.size, u2 + $s)).arrayBuffer();
      u2 += g2.byteLength, p.enqueue(new Uint8Array(g2)), u2 === l2.size && p.close();
    } });
  }, "name"));
} catch {
}
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
const hi = 65536;
async function* qn(i2, o2 = true) {
  for (const a2 of i2)
    if ("stream" in a2)
      yield* a2.stream();
    else if (ArrayBuffer.isView(a2))
      if (o2) {
        let u2 = a2.byteOffset;
        const l2 = a2.byteOffset + a2.byteLength;
        for (; u2 !== l2; ) {
          const p = Math.min(l2 - u2, hi), h2 = a2.buffer.slice(u2, u2 + p);
          u2 += h2.byteLength, yield new Uint8Array(h2);
        }
      } else
        yield a2;
    else {
      let u2 = 0, l2 = a2;
      for (; u2 !== l2.size; ) {
        const h2 = await l2.slice(u2, Math.min(l2.size, u2 + hi)).arrayBuffer();
        u2 += h2.byteLength, yield new Uint8Array(h2);
      }
    }
}
n$1(qn, "toIterator");
const pi = (Ve = class {
  constructor(o2 = [], a2 = {}) {
    be(this, ve, []);
    be(this, kt, "");
    be(this, bt, 0);
    be(this, Cr, "transparent");
    if (typeof o2 != "object" || o2 === null)
      throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    if (typeof o2[Symbol.iterator] != "function")
      throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    if (typeof a2 != "object" && typeof a2 != "function")
      throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    a2 === null && (a2 = {});
    const u2 = new TextEncoder();
    for (const p of o2) {
      let h2;
      ArrayBuffer.isView(p) ? h2 = new Uint8Array(p.buffer.slice(p.byteOffset, p.byteOffset + p.byteLength)) : p instanceof ArrayBuffer ? h2 = new Uint8Array(p.slice(0)) : p instanceof Ve ? h2 = p : h2 = u2.encode(`${p}`), X(this, bt, O$1(this, bt) + (ArrayBuffer.isView(h2) ? h2.byteLength : h2.size)), O$1(this, ve).push(h2);
    }
    X(this, Cr, `${a2.endings === void 0 ? "transparent" : a2.endings}`);
    const l2 = a2.type === void 0 ? "" : String(a2.type);
    X(this, kt, /^[\x20-\x7E]*$/.test(l2) ? l2 : "");
  }
  get size() {
    return O$1(this, bt);
  }
  get type() {
    return O$1(this, kt);
  }
  async text() {
    const o2 = new TextDecoder();
    let a2 = "";
    for await (const u2 of qn(O$1(this, ve), false))
      a2 += o2.decode(u2, { stream: true });
    return a2 += o2.decode(), a2;
  }
  async arrayBuffer() {
    const o2 = new Uint8Array(this.size);
    let a2 = 0;
    for await (const u2 of qn(O$1(this, ve), false))
      o2.set(u2, a2), a2 += u2.length;
    return o2.buffer;
  }
  stream() {
    const o2 = qn(O$1(this, ve), true);
    return new globalThis.ReadableStream({ type: "bytes", async pull(a2) {
      const u2 = await o2.next();
      u2.done ? a2.close() : a2.enqueue(u2.value);
    }, async cancel() {
      await o2.return();
    } });
  }
  slice(o2 = 0, a2 = this.size, u2 = "") {
    const { size: l2 } = this;
    let p = o2 < 0 ? Math.max(l2 + o2, 0) : Math.min(o2, l2), h2 = a2 < 0 ? Math.max(l2 + a2, 0) : Math.min(a2, l2);
    const g2 = Math.max(h2 - p, 0), A2 = O$1(this, ve), w2 = [];
    let E2 = 0;
    for (const b2 of A2) {
      if (E2 >= g2)
        break;
      const q2 = ArrayBuffer.isView(b2) ? b2.byteLength : b2.size;
      if (p && q2 <= p)
        p -= q2, h2 -= q2;
      else {
        let _2;
        ArrayBuffer.isView(b2) ? (_2 = b2.subarray(p, Math.min(q2, h2)), E2 += _2.byteLength) : (_2 = b2.slice(p, Math.min(q2, h2)), E2 += _2.size), h2 -= q2, w2.push(_2), p = 0;
      }
    }
    const T2 = new Ve([], { type: String(u2).toLowerCase() });
    return X(T2, bt, g2), X(T2, ve, w2), T2;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](o2) {
    return o2 && typeof o2 == "object" && typeof o2.constructor == "function" && (typeof o2.stream == "function" || typeof o2.arrayBuffer == "function") && /^(Blob|File)$/.test(o2[Symbol.toStringTag]);
  }
}, ve = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), n$1(Ve, "Blob"), Ve);
Object.defineProperties(pi.prototype, { size: { enumerable: true }, type: { enumerable: true }, slice: { enumerable: true } });
const Ds = pi, ut = Ds, Ms = (Ot = class extends ut {
  constructor(a2, u2, l2 = {}) {
    if (arguments.length < 2)
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    super(a2, l2);
    be(this, Wt, 0);
    be(this, qt, "");
    l2 === null && (l2 = {});
    const p = l2.lastModified === void 0 ? Date.now() : Number(l2.lastModified);
    Number.isNaN(p) || X(this, Wt, p), X(this, qt, String(u2));
  }
  get name() {
    return O$1(this, qt);
  }
  get lastModified() {
    return O$1(this, Wt);
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
  static [Symbol.hasInstance](a2) {
    return !!a2 && a2 instanceof ut && /^(File)$/.test(a2[Symbol.toStringTag]);
  }
}, Wt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), n$1(Ot, "File"), Ot), Us = Ms, On = Us;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var { toStringTag: Et, iterator: xs, hasInstance: Ns } = Symbol, bi = Math.random, Hs = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), mi = n$1((i2, o2, a2) => (i2 += "", /^(Blob|File)$/.test(o2 && o2[Et]) ? [(a2 = a2 !== void 0 ? a2 + "" : o2[Et] == "File" ? o2.name : "blob", i2), o2.name !== a2 || o2[Et] == "blob" ? new On([o2], a2, o2) : o2] : [i2, o2 + ""]), "f"), zn = n$1((i2, o2) => (o2 ? i2 : i2.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), Me = n$1((i2, o2, a2) => {
  if (o2.length < a2)
    throw new TypeError(`Failed to execute '${i2}' on 'FormData': ${a2} arguments required, but only ${o2.length} present.`);
}, "x");
const br = (zt = class {
  constructor(...o2) {
    be(this, ee, []);
    if (o2.length)
      throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
  }
  get [Et]() {
    return "FormData";
  }
  [xs]() {
    return this.entries();
  }
  static [Ns](o2) {
    return o2 && typeof o2 == "object" && o2[Et] === "FormData" && !Hs.some((a2) => typeof o2[a2] != "function");
  }
  append(...o2) {
    Me("append", arguments, 2), O$1(this, ee).push(mi(...o2));
  }
  delete(o2) {
    Me("delete", arguments, 1), o2 += "", X(this, ee, O$1(this, ee).filter(([a2]) => a2 !== o2));
  }
  get(o2) {
    Me("get", arguments, 1), o2 += "";
    for (var a2 = O$1(this, ee), u2 = a2.length, l2 = 0; l2 < u2; l2++)
      if (a2[l2][0] === o2)
        return a2[l2][1];
    return null;
  }
  getAll(o2, a2) {
    return Me("getAll", arguments, 1), a2 = [], o2 += "", O$1(this, ee).forEach((u2) => u2[0] === o2 && a2.push(u2[1])), a2;
  }
  has(o2) {
    return Me("has", arguments, 1), o2 += "", O$1(this, ee).some((a2) => a2[0] === o2);
  }
  forEach(o2, a2) {
    Me("forEach", arguments, 1);
    for (var [u2, l2] of this)
      o2.call(a2, l2, u2, this);
  }
  set(...o2) {
    Me("set", arguments, 2);
    var a2 = [], u2 = true;
    o2 = mi(...o2), O$1(this, ee).forEach((l2) => {
      l2[0] === o2[0] ? u2 && (u2 = !a2.push(o2)) : a2.push(l2);
    }), u2 && a2.push(o2), X(this, ee, a2);
  }
  *entries() {
    yield* O$1(this, ee);
  }
  *keys() {
    for (var [o2] of this)
      yield o2;
  }
  *values() {
    for (var [, o2] of this)
      yield o2;
  }
}, ee = /* @__PURE__ */ new WeakMap(), n$1(zt, "FormData"), zt);
function Vs(i2, o2 = ut) {
  var a2 = `${bi()}${bi()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), u2 = [], l2 = `--${a2}\r
Content-Disposition: form-data; name="`;
  return i2.forEach((p, h2) => typeof p == "string" ? u2.push(l2 + zn(h2) + `"\r
\r
${p.replace(new RegExp("\\r(?!\\n)|(?<!\\r)\\n", "g"), `\r
`)}\r
`) : u2.push(l2 + zn(h2) + `"; filename="${zn(p.name, 1)}"\r
Content-Type: ${p.type || "application/octet-stream"}\r
\r
`, p, `\r
`)), u2.push(`--${a2}--`), new o2(u2, { type: "multipart/form-data; boundary=" + a2 });
}
n$1(Vs, "formDataToBlob");
const Un = class Un2 extends Error {
  constructor(o2, a2) {
    super(o2), Error.captureStackTrace(this, this.constructor), this.type = a2;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
n$1(Un, "FetchBaseError");
let ft = Un;
const xn = class xn2 extends ft {
  constructor(o2, a2, u2) {
    super(o2, a2), u2 && (this.code = this.errno = u2.code, this.erroredSysCall = u2.syscall);
  }
};
n$1(xn, "FetchError");
let G = xn;
const mr = Symbol.toStringTag, yi = n$1((i2) => typeof i2 == "object" && typeof i2.append == "function" && typeof i2.delete == "function" && typeof i2.get == "function" && typeof i2.getAll == "function" && typeof i2.has == "function" && typeof i2.set == "function" && typeof i2.sort == "function" && i2[mr] === "URLSearchParams", "isURLSearchParameters"), yr = n$1((i2) => i2 && typeof i2 == "object" && typeof i2.arrayBuffer == "function" && typeof i2.type == "string" && typeof i2.stream == "function" && typeof i2.constructor == "function" && /^(Blob|File)$/.test(i2[mr]), "isBlob"), Qs = n$1((i2) => typeof i2 == "object" && (i2[mr] === "AbortSignal" || i2[mr] === "EventTarget"), "isAbortSignal"), Ys = n$1((i2, o2) => {
  const a2 = new URL(o2).hostname, u2 = new URL(i2).hostname;
  return a2 === u2 || a2.endsWith(`.${u2}`);
}, "isDomainOrSubdomain"), Gs = n$1((i2, o2) => {
  const a2 = new URL(o2).protocol, u2 = new URL(i2).protocol;
  return a2 === u2;
}, "isSameProtocol"), Zs = promisify(me.pipeline), H = Symbol("Body internals"), Nn = class Nn2 {
  constructor(o2, { size: a2 = 0 } = {}) {
    let u2 = null;
    o2 === null ? o2 = null : yi(o2) ? o2 = Buffer$2.from(o2.toString()) : yr(o2) || Buffer$2.isBuffer(o2) || (types.isAnyArrayBuffer(o2) ? o2 = Buffer$2.from(o2) : ArrayBuffer.isView(o2) ? o2 = Buffer$2.from(o2.buffer, o2.byteOffset, o2.byteLength) : o2 instanceof me || (o2 instanceof br ? (o2 = Vs(o2), u2 = o2.type.split("=")[1]) : o2 = Buffer$2.from(String(o2))));
    let l2 = o2;
    Buffer$2.isBuffer(o2) ? l2 = me.Readable.from(o2) : yr(o2) && (l2 = me.Readable.from(o2.stream())), this[H] = { body: o2, stream: l2, boundary: u2, disturbed: false, error: null }, this.size = a2, o2 instanceof me && o2.on("error", (p) => {
      const h2 = p instanceof ft ? p : new G(`Invalid response body while trying to fetch ${this.url}: ${p.message}`, "system", p);
      this[H].error = h2;
    });
  }
  get body() {
    return this[H].stream;
  }
  get bodyUsed() {
    return this[H].disturbed;
  }
  async arrayBuffer() {
    const { buffer: o2, byteOffset: a2, byteLength: u2 } = await In(this);
    return o2.slice(a2, a2 + u2);
  }
  async formData() {
    const o2 = this.headers.get("content-type");
    if (o2.startsWith("application/x-www-form-urlencoded")) {
      const u2 = new br(), l2 = new URLSearchParams(await this.text());
      for (const [p, h2] of l2)
        u2.append(p, h2);
      return u2;
    }
    const { toFormData: a2 } = await import('./multipart-parser-DS-dWx0d.mjs');
    return a2(this.body, o2);
  }
  async blob() {
    const o2 = this.headers && this.headers.get("content-type") || this[H].body && this[H].body.type || "", a2 = await this.arrayBuffer();
    return new ut([a2], { type: o2 });
  }
  async json() {
    const o2 = await this.text();
    return JSON.parse(o2);
  }
  async text() {
    const o2 = await In(this);
    return new TextDecoder().decode(o2);
  }
  buffer() {
    return In(this);
  }
};
n$1(Nn, "Body");
let Ue = Nn;
Ue.prototype.buffer = deprecate(Ue.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(Ue.prototype, { body: { enumerable: true }, bodyUsed: { enumerable: true }, arrayBuffer: { enumerable: true }, blob: { enumerable: true }, json: { enumerable: true }, text: { enumerable: true }, data: { get: deprecate(() => {
}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") } });
async function In(i2) {
  if (i2[H].disturbed)
    throw new TypeError(`body used already for: ${i2.url}`);
  if (i2[H].disturbed = true, i2[H].error)
    throw i2[H].error;
  const { body: o2 } = i2;
  if (o2 === null)
    return Buffer$2.alloc(0);
  if (!(o2 instanceof me))
    return Buffer$2.alloc(0);
  const a2 = [];
  let u2 = 0;
  try {
    for await (const l2 of o2) {
      if (i2.size > 0 && u2 + l2.length > i2.size) {
        const p = new G(`content size at ${i2.url} over limit: ${i2.size}`, "max-size");
        throw o2.destroy(p), p;
      }
      u2 += l2.length, a2.push(l2);
    }
  } catch (l2) {
    throw l2 instanceof ft ? l2 : new G(`Invalid response body while trying to fetch ${i2.url}: ${l2.message}`, "system", l2);
  }
  if (o2.readableEnded === true || o2._readableState.ended === true)
    try {
      return a2.every((l2) => typeof l2 == "string") ? Buffer$2.from(a2.join("")) : Buffer$2.concat(a2, u2);
    } catch (l2) {
      throw new G(`Could not create Buffer from response body for ${i2.url}: ${l2.message}`, "system", l2);
    }
  else
    throw new G(`Premature close of server response while trying to fetch ${i2.url}`);
}
n$1(In, "consumeBody");
const Fn = n$1((i2, o2) => {
  let a2, u2, { body: l2 } = i2[H];
  if (i2.bodyUsed)
    throw new Error("cannot clone body after it is used");
  return l2 instanceof me && typeof l2.getBoundary != "function" && (a2 = new PassThrough({ highWaterMark: o2 }), u2 = new PassThrough({ highWaterMark: o2 }), l2.pipe(a2), l2.pipe(u2), i2[H].stream = a2, l2 = u2), l2;
}, "clone"), Ks = deprecate((i2) => i2.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167"), gi = n$1((i2, o2) => i2 === null ? null : typeof i2 == "string" ? "text/plain;charset=UTF-8" : yi(i2) ? "application/x-www-form-urlencoded;charset=UTF-8" : yr(i2) ? i2.type || null : Buffer$2.isBuffer(i2) || types.isAnyArrayBuffer(i2) || ArrayBuffer.isView(i2) ? null : i2 instanceof br ? `multipart/form-data; boundary=${o2[H].boundary}` : i2 && typeof i2.getBoundary == "function" ? `multipart/form-data;boundary=${Ks(i2)}` : i2 instanceof me ? null : "text/plain;charset=UTF-8", "extractContentType"), Js = n$1((i2) => {
  const { body: o2 } = i2[H];
  return o2 === null ? 0 : yr(o2) ? o2.size : Buffer$2.isBuffer(o2) ? o2.length : o2 && typeof o2.getLengthSync == "function" && o2.hasKnownLength && o2.hasKnownLength() ? o2.getLengthSync() : null;
}, "getTotalBytes"), Xs = n$1(async (i2, { body: o2 }) => {
  o2 === null ? i2.end() : await Zs(o2, i2);
}, "writeToStream"), gr = typeof vt.validateHeaderName == "function" ? vt.validateHeaderName : (i2) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i2)) {
    const o2 = new TypeError(`Header name must be a valid HTTP token [${i2}]`);
    throw Object.defineProperty(o2, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o2;
  }
}, jn = typeof vt.validateHeaderValue == "function" ? vt.validateHeaderValue : (i2, o2) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o2)) {
    const a2 = new TypeError(`Invalid character in header content ["${i2}"]`);
    throw Object.defineProperty(a2, "code", { value: "ERR_INVALID_CHAR" }), a2;
  }
}, Pr = class Pr2 extends URLSearchParams {
  constructor(o2) {
    let a2 = [];
    if (o2 instanceof Pr2) {
      const u2 = o2.raw();
      for (const [l2, p] of Object.entries(u2))
        a2.push(...p.map((h2) => [l2, h2]));
    } else if (o2 != null)
      if (typeof o2 == "object" && !types.isBoxedPrimitive(o2)) {
        const u2 = o2[Symbol.iterator];
        if (u2 == null)
          a2.push(...Object.entries(o2));
        else {
          if (typeof u2 != "function")
            throw new TypeError("Header pairs must be iterable");
          a2 = [...o2].map((l2) => {
            if (typeof l2 != "object" || types.isBoxedPrimitive(l2))
              throw new TypeError("Each header pair must be an iterable object");
            return [...l2];
          }).map((l2) => {
            if (l2.length !== 2)
              throw new TypeError("Each header pair must be a name/value tuple");
            return [...l2];
          });
        }
      } else
        throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    return a2 = a2.length > 0 ? a2.map(([u2, l2]) => (gr(u2), jn(u2, String(l2)), [String(u2).toLowerCase(), String(l2)])) : void 0, super(a2), new Proxy(this, { get(u2, l2, p) {
      switch (l2) {
        case "append":
        case "set":
          return (h2, g2) => (gr(h2), jn(h2, String(g2)), URLSearchParams.prototype[l2].call(u2, String(h2).toLowerCase(), String(g2)));
        case "delete":
        case "has":
        case "getAll":
          return (h2) => (gr(h2), URLSearchParams.prototype[l2].call(u2, String(h2).toLowerCase()));
        case "keys":
          return () => (u2.sort(), new Set(URLSearchParams.prototype.keys.call(u2)).keys());
        default:
          return Reflect.get(u2, l2, p);
      }
    } });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(o2) {
    const a2 = this.getAll(o2);
    if (a2.length === 0)
      return null;
    let u2 = a2.join(", ");
    return /^content-encoding$/i.test(o2) && (u2 = u2.toLowerCase()), u2;
  }
  forEach(o2, a2 = void 0) {
    for (const u2 of this.keys())
      Reflect.apply(o2, a2, [this.get(u2), u2, this]);
  }
  *values() {
    for (const o2 of this.keys())
      yield this.get(o2);
  }
  *entries() {
    for (const o2 of this.keys())
      yield [o2, this.get(o2)];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((o2, a2) => (o2[a2] = this.getAll(a2), o2), {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((o2, a2) => {
      const u2 = this.getAll(a2);
      return a2 === "host" ? o2[a2] = u2[0] : o2[a2] = u2.length > 1 ? u2 : u2[0], o2;
    }, {});
  }
};
n$1(Pr, "Headers");
let ye = Pr;
Object.defineProperties(ye.prototype, ["get", "entries", "forEach", "values"].reduce((i2, o2) => (i2[o2] = { enumerable: true }, i2), {}));
function el(i2 = []) {
  return new ye(i2.reduce((o2, a2, u2, l2) => (u2 % 2 === 0 && o2.push(l2.slice(u2, u2 + 2)), o2), []).filter(([o2, a2]) => {
    try {
      return gr(o2), jn(o2, String(a2)), true;
    } catch {
      return false;
    }
  }));
}
n$1(el, "fromRawHeaders");
const tl = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Ln = n$1((i2) => tl.has(i2), "isRedirect"), se = Symbol("Response internals"), xe = class xe2 extends Ue {
  constructor(o2 = null, a2 = {}) {
    super(o2, a2);
    const u2 = a2.status != null ? a2.status : 200, l2 = new ye(a2.headers);
    if (o2 !== null && !l2.has("Content-Type")) {
      const p = gi(o2, this);
      p && l2.append("Content-Type", p);
    }
    this[se] = { type: "default", url: a2.url, status: u2, statusText: a2.statusText || "", headers: l2, counter: a2.counter, highWaterMark: a2.highWaterMark };
  }
  get type() {
    return this[se].type;
  }
  get url() {
    return this[se].url || "";
  }
  get status() {
    return this[se].status;
  }
  get ok() {
    return this[se].status >= 200 && this[se].status < 300;
  }
  get redirected() {
    return this[se].counter > 0;
  }
  get statusText() {
    return this[se].statusText;
  }
  get headers() {
    return this[se].headers;
  }
  get highWaterMark() {
    return this[se].highWaterMark;
  }
  clone() {
    return new xe2(Fn(this, this.highWaterMark), { type: this.type, url: this.url, status: this.status, statusText: this.statusText, headers: this.headers, ok: this.ok, redirected: this.redirected, size: this.size, highWaterMark: this.highWaterMark });
  }
  static redirect(o2, a2 = 302) {
    if (!Ln(a2))
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    return new xe2(null, { headers: { location: new URL(o2).toString() }, status: a2 });
  }
  static error() {
    const o2 = new xe2(null, { status: 0, statusText: "" });
    return o2[se].type = "error", o2;
  }
  static json(o2 = void 0, a2 = {}) {
    const u2 = JSON.stringify(o2);
    if (u2 === void 0)
      throw new TypeError("data is not JSON serializable");
    const l2 = new ye(a2 && a2.headers);
    return l2.has("content-type") || l2.set("content-type", "application/json"), new xe2(u2, { ...a2, headers: l2 });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
n$1(xe, "Response");
let le = xe;
Object.defineProperties(le.prototype, { type: { enumerable: true }, url: { enumerable: true }, status: { enumerable: true }, ok: { enumerable: true }, redirected: { enumerable: true }, statusText: { enumerable: true }, headers: { enumerable: true }, clone: { enumerable: true } });
const rl = n$1((i2) => {
  if (i2.search)
    return i2.search;
  const o2 = i2.href.length - 1, a2 = i2.hash || (i2.href[o2] === "#" ? "#" : "");
  return i2.href[o2 - a2.length] === "?" ? "?" : "";
}, "getSearch");
function _i(i2, o2 = false) {
  return i2 == null || (i2 = new URL(i2), /^(about|blob|data):$/.test(i2.protocol)) ? "no-referrer" : (i2.username = "", i2.password = "", i2.hash = "", o2 && (i2.pathname = "", i2.search = ""), i2);
}
n$1(_i, "stripURLForUseAsAReferrer");
const Si = /* @__PURE__ */ new Set(["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"]), nl = "strict-origin-when-cross-origin";
function ol(i2) {
  if (!Si.has(i2))
    throw new TypeError(`Invalid referrerPolicy: ${i2}`);
  return i2;
}
n$1(ol, "validateReferrerPolicy");
function il(i2) {
  if (/^(http|ws)s:$/.test(i2.protocol))
    return true;
  const o2 = i2.host.replace(/(^\[)|(]$)/g, ""), a2 = isIP(o2);
  return a2 === 4 && /^127\./.test(o2) || a2 === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o2) ? true : i2.host === "localhost" || i2.host.endsWith(".localhost") ? false : i2.protocol === "file:";
}
n$1(il, "isOriginPotentiallyTrustworthy");
function ct(i2) {
  return /^about:(blank|srcdoc)$/.test(i2) || i2.protocol === "data:" || /^(blob|filesystem):$/.test(i2.protocol) ? true : il(i2);
}
n$1(ct, "isUrlPotentiallyTrustworthy");
function al(i2, { referrerURLCallback: o2, referrerOriginCallback: a2 } = {}) {
  if (i2.referrer === "no-referrer" || i2.referrerPolicy === "")
    return null;
  const u2 = i2.referrerPolicy;
  if (i2.referrer === "about:client")
    return "no-referrer";
  const l2 = i2.referrer;
  let p = _i(l2), h2 = _i(l2, true);
  p.toString().length > 4096 && (p = h2), o2 && (p = o2(p)), a2 && (h2 = a2(h2));
  const g2 = new URL(i2.url);
  switch (u2) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return h2;
    case "unsafe-url":
      return p;
    case "strict-origin":
      return ct(p) && !ct(g2) ? "no-referrer" : h2.toString();
    case "strict-origin-when-cross-origin":
      return p.origin === g2.origin ? p : ct(p) && !ct(g2) ? "no-referrer" : h2;
    case "same-origin":
      return p.origin === g2.origin ? p : "no-referrer";
    case "origin-when-cross-origin":
      return p.origin === g2.origin ? p : h2;
    case "no-referrer-when-downgrade":
      return ct(p) && !ct(g2) ? "no-referrer" : p;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${u2}`);
  }
}
n$1(al, "determineRequestsReferrer");
function sl(i2) {
  const o2 = (i2.get("referrer-policy") || "").split(/[,\s]+/);
  let a2 = "";
  for (const u2 of o2)
    u2 && Si.has(u2) && (a2 = u2);
  return a2;
}
n$1(sl, "parseReferrerPolicyFromHeader");
const $$1 = Symbol("Request internals"), At = n$1((i2) => typeof i2 == "object" && typeof i2[$$1] == "object", "isRequest"), ll = deprecate(() => {
}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)"), vr = class vr2 extends Ue {
  constructor(o2, a2 = {}) {
    let u2;
    if (At(o2) ? u2 = new URL(o2.url) : (u2 = new URL(o2), o2 = {}), u2.username !== "" || u2.password !== "")
      throw new TypeError(`${u2} is an url with embedded credentials.`);
    let l2 = a2.method || o2.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(l2) && (l2 = l2.toUpperCase()), !At(a2) && "data" in a2 && ll(), (a2.body != null || At(o2) && o2.body !== null) && (l2 === "GET" || l2 === "HEAD"))
      throw new TypeError("Request with GET/HEAD method cannot have body");
    const p = a2.body ? a2.body : At(o2) && o2.body !== null ? Fn(o2) : null;
    super(p, { size: a2.size || o2.size || 0 });
    const h2 = new ye(a2.headers || o2.headers || {});
    if (p !== null && !h2.has("Content-Type")) {
      const w2 = gi(p, this);
      w2 && h2.set("Content-Type", w2);
    }
    let g2 = At(o2) ? o2.signal : null;
    if ("signal" in a2 && (g2 = a2.signal), g2 != null && !Qs(g2))
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    let A2 = a2.referrer == null ? o2.referrer : a2.referrer;
    if (A2 === "")
      A2 = "no-referrer";
    else if (A2) {
      const w2 = new URL(A2);
      A2 = /^about:(\/\/)?client$/.test(w2) ? "client" : w2;
    } else
      A2 = void 0;
    this[$$1] = { method: l2, redirect: a2.redirect || o2.redirect || "follow", headers: h2, parsedURL: u2, signal: g2, referrer: A2 }, this.follow = a2.follow === void 0 ? o2.follow === void 0 ? 20 : o2.follow : a2.follow, this.compress = a2.compress === void 0 ? o2.compress === void 0 ? true : o2.compress : a2.compress, this.counter = a2.counter || o2.counter || 0, this.agent = a2.agent || o2.agent, this.highWaterMark = a2.highWaterMark || o2.highWaterMark || 16384, this.insecureHTTPParser = a2.insecureHTTPParser || o2.insecureHTTPParser || false, this.referrerPolicy = a2.referrerPolicy || o2.referrerPolicy || "";
  }
  get method() {
    return this[$$1].method;
  }
  get url() {
    return format(this[$$1].parsedURL);
  }
  get headers() {
    return this[$$1].headers;
  }
  get redirect() {
    return this[$$1].redirect;
  }
  get signal() {
    return this[$$1].signal;
  }
  get referrer() {
    if (this[$$1].referrer === "no-referrer")
      return "";
    if (this[$$1].referrer === "client")
      return "about:client";
    if (this[$$1].referrer)
      return this[$$1].referrer.toString();
  }
  get referrerPolicy() {
    return this[$$1].referrerPolicy;
  }
  set referrerPolicy(o2) {
    this[$$1].referrerPolicy = ol(o2);
  }
  clone() {
    return new vr2(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
n$1(vr, "Request");
let dt = vr;
Object.defineProperties(dt.prototype, { method: { enumerable: true }, url: { enumerable: true }, headers: { enumerable: true }, redirect: { enumerable: true }, clone: { enumerable: true }, signal: { enumerable: true }, referrer: { enumerable: true }, referrerPolicy: { enumerable: true } });
const ul = n$1((i2) => {
  const { parsedURL: o2 } = i2[$$1], a2 = new ye(i2[$$1].headers);
  a2.has("Accept") || a2.set("Accept", "*/*");
  let u2 = null;
  if (i2.body === null && /^(post|put)$/i.test(i2.method) && (u2 = "0"), i2.body !== null) {
    const g2 = Js(i2);
    typeof g2 == "number" && !Number.isNaN(g2) && (u2 = String(g2));
  }
  u2 && a2.set("Content-Length", u2), i2.referrerPolicy === "" && (i2.referrerPolicy = nl), i2.referrer && i2.referrer !== "no-referrer" ? i2[$$1].referrer = al(i2) : i2[$$1].referrer = "no-referrer", i2[$$1].referrer instanceof URL && a2.set("Referer", i2.referrer), a2.has("User-Agent") || a2.set("User-Agent", "node-fetch"), i2.compress && !a2.has("Accept-Encoding") && a2.set("Accept-Encoding", "gzip, deflate, br");
  let { agent: l2 } = i2;
  typeof l2 == "function" && (l2 = l2(o2));
  const p = rl(o2), h2 = { path: o2.pathname + p, method: i2.method, headers: a2[Symbol.for("nodejs.util.inspect.custom")](), insecureHTTPParser: i2.insecureHTTPParser, agent: l2 };
  return { parsedURL: o2, options: h2 };
}, "getNodeRequestOptions"), Hn = class Hn2 extends ft {
  constructor(o2, a2 = "aborted") {
    super(o2, a2);
  }
};
n$1(Hn, "AbortError");
let _r = Hn;
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
if (!globalThis.DOMException)
  try {
    const { MessageChannel: i2 } = require("worker_threads"), o2 = new i2().port1, a2 = new ArrayBuffer();
    o2.postMessage(a2, [a2, a2]);
  } catch (i2) {
    i2.constructor.name === "DOMException" && (globalThis.DOMException = i2.constructor);
  }
var fl = globalThis.DOMException;
const cl = f$2(fl), { stat: $n } = promises;
n$1((i2, o2) => wi(statSync(i2), i2, o2), "blobFromSync");
n$1((i2, o2) => $n(i2).then((a2) => wi(a2, i2, o2)), "blobFrom");
n$1((i2, o2) => $n(i2).then((a2) => Ri(a2, i2, o2)), "fileFrom");
n$1((i2, o2) => Ri(statSync(i2), i2, o2), "fileFromSync");
const wi = n$1((i2, o2, a2 = "") => new ut([new Sr({ path: o2, size: i2.size, lastModified: i2.mtimeMs, start: 0 })], { type: a2 }), "fromBlob"), Ri = n$1((i2, o2, a2 = "") => new On([new Sr({ path: o2, size: i2.size, lastModified: i2.mtimeMs, start: 0 })], basename(o2), { type: a2, lastModified: i2.mtimeMs }), "fromFile"), Er = class Er2 {
  constructor(o2) {
    be(this, Ne, void 0);
    be(this, He, void 0);
    X(this, Ne, o2.path), X(this, He, o2.start), this.size = o2.size, this.lastModified = o2.lastModified;
  }
  slice(o2, a2) {
    return new Er2({ path: O$1(this, Ne), lastModified: this.lastModified, size: a2 - o2, start: O$1(this, He) + o2 });
  }
  async *stream() {
    const { mtimeMs: o2 } = await $n(O$1(this, Ne));
    if (o2 > this.lastModified)
      throw new cl("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
    yield* createReadStream(O$1(this, Ne), { start: O$1(this, He), end: O$1(this, He) + this.size - 1 });
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
};
Ne = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), n$1(Er, "BlobDataItem");
let Sr = Er;
const ml = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function Ti(i2, o2) {
  return new Promise((a2, u2) => {
    const l2 = new dt(i2, o2), { parsedURL: p, options: h2 } = ul(l2);
    if (!ml.has(p.protocol))
      throw new TypeError(`node-fetch cannot load ${i2}. URL scheme "${p.protocol.replace(/:$/, "")}" is not supported.`);
    if (p.protocol === "data:") {
      const _2 = js(l2.url), V2 = new le(_2, { headers: { "Content-Type": _2.typeFull } });
      a2(V2);
      return;
    }
    const g2 = (p.protocol === "https:" ? Bs : vt).request, { signal: A2 } = l2;
    let w2 = null;
    const E2 = n$1(() => {
      const _2 = new _r("The operation was aborted.");
      u2(_2), l2.body && l2.body instanceof me.Readable && l2.body.destroy(_2), !(!w2 || !w2.body) && w2.body.emit("error", _2);
    }, "abort");
    if (A2 && A2.aborted) {
      E2();
      return;
    }
    const T2 = n$1(() => {
      E2(), q2();
    }, "abortAndFinalize"), b2 = g2(p.toString(), h2);
    A2 && A2.addEventListener("abort", T2);
    const q2 = n$1(() => {
      b2.abort(), A2 && A2.removeEventListener("abort", T2);
    }, "finalize");
    b2.on("error", (_2) => {
      u2(new G(`request to ${l2.url} failed, reason: ${_2.message}`, "system", _2)), q2();
    }), yl(b2, (_2) => {
      w2 && w2.body && w2.body.destroy(_2);
    }), process.version < "v14" && b2.on("socket", (_2) => {
      let V2;
      _2.prependListener("end", () => {
        V2 = _2._eventsCount;
      }), _2.prependListener("close", (I2) => {
        if (w2 && V2 < _2._eventsCount && !I2) {
          const F2 = new Error("Premature close");
          F2.code = "ERR_STREAM_PREMATURE_CLOSE", w2.body.emit("error", F2);
        }
      });
    }), b2.on("response", (_2) => {
      b2.setTimeout(0);
      const V2 = el(_2.rawHeaders);
      if (Ln(_2.statusCode)) {
        const z2 = V2.get("Location");
        let j2 = null;
        try {
          j2 = z2 === null ? null : new URL(z2, l2.url);
        } catch {
          if (l2.redirect !== "manual") {
            u2(new G(`uri requested responds with an invalid redirect URL: ${z2}`, "invalid-redirect")), q2();
            return;
          }
        }
        switch (l2.redirect) {
          case "error":
            u2(new G(`uri requested responds with a redirect, redirect mode is set to error: ${l2.url}`, "no-redirect")), q2();
            return;
          case "manual":
            break;
          case "follow": {
            if (j2 === null)
              break;
            if (l2.counter >= l2.follow) {
              u2(new G(`maximum redirect reached at: ${l2.url}`, "max-redirect")), q2();
              return;
            }
            const U = { headers: new ye(l2.headers), follow: l2.follow, counter: l2.counter + 1, agent: l2.agent, compress: l2.compress, method: l2.method, body: Fn(l2), signal: l2.signal, size: l2.size, referrer: l2.referrer, referrerPolicy: l2.referrerPolicy };
            if (!Ys(l2.url, j2) || !Gs(l2.url, j2))
              for (const Ft of ["authorization", "www-authenticate", "cookie", "cookie2"])
                U.headers.delete(Ft);
            if (_2.statusCode !== 303 && l2.body && o2.body instanceof me.Readable) {
              u2(new G("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q2();
              return;
            }
            (_2.statusCode === 303 || (_2.statusCode === 301 || _2.statusCode === 302) && l2.method === "POST") && (U.method = "GET", U.body = void 0, U.headers.delete("content-length"));
            const D2 = sl(V2);
            D2 && (U.referrerPolicy = D2), a2(Ti(new dt(j2, U))), q2();
            return;
          }
          default:
            return u2(new TypeError(`Redirect option '${l2.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      A2 && _2.once("end", () => {
        A2.removeEventListener("abort", T2);
      });
      let I2 = pipeline(_2, new PassThrough(), (z2) => {
        z2 && u2(z2);
      });
      process.version < "v12.10" && _2.on("aborted", T2);
      const F2 = { url: l2.url, status: _2.statusCode, statusText: _2.statusMessage, headers: V2, size: l2.size, counter: l2.counter, highWaterMark: l2.highWaterMark }, Q = V2.get("Content-Encoding");
      if (!l2.compress || l2.method === "HEAD" || Q === null || _2.statusCode === 204 || _2.statusCode === 304) {
        w2 = new le(I2, F2), a2(w2);
        return;
      }
      const ge = { flush: st.Z_SYNC_FLUSH, finishFlush: st.Z_SYNC_FLUSH };
      if (Q === "gzip" || Q === "x-gzip") {
        I2 = pipeline(I2, st.createGunzip(ge), (z2) => {
          z2 && u2(z2);
        }), w2 = new le(I2, F2), a2(w2);
        return;
      }
      if (Q === "deflate" || Q === "x-deflate") {
        const z2 = pipeline(_2, new PassThrough(), (j2) => {
          j2 && u2(j2);
        });
        z2.once("data", (j2) => {
          (j2[0] & 15) === 8 ? I2 = pipeline(I2, st.createInflate(), (U) => {
            U && u2(U);
          }) : I2 = pipeline(I2, st.createInflateRaw(), (U) => {
            U && u2(U);
          }), w2 = new le(I2, F2), a2(w2);
        }), z2.once("end", () => {
          w2 || (w2 = new le(I2, F2), a2(w2));
        });
        return;
      }
      if (Q === "br") {
        I2 = pipeline(I2, st.createBrotliDecompress(), (z2) => {
          z2 && u2(z2);
        }), w2 = new le(I2, F2), a2(w2);
        return;
      }
      w2 = new le(I2, F2), a2(w2);
    }), Xs(b2, l2).catch(u2);
  });
}
n$1(Ti, "fetch$1");
function yl(i2, o2) {
  const a2 = Buffer$2.from(`0\r
\r
`);
  let u2 = false, l2 = false, p;
  i2.on("response", (h2) => {
    const { headers: g2 } = h2;
    u2 = g2["transfer-encoding"] === "chunked" && !g2["content-length"];
  }), i2.on("socket", (h2) => {
    const g2 = n$1(() => {
      if (u2 && !l2) {
        const w2 = new Error("Premature close");
        w2.code = "ERR_STREAM_PREMATURE_CLOSE", o2(w2);
      }
    }, "onSocketClose"), A2 = n$1((w2) => {
      l2 = Buffer$2.compare(w2.slice(-5), a2) === 0, !l2 && p && (l2 = Buffer$2.compare(p.slice(-3), a2.slice(0, 3)) === 0 && Buffer$2.compare(w2.slice(-2), a2.slice(3)) === 0), p = w2;
    }, "onData");
    h2.prependListener("close", g2), h2.on("data", A2), i2.on("close", () => {
      h2.removeListener("close", g2), h2.removeListener("data", A2);
    });
  });
}
n$1(yl, "fixResponseChunkedTransferBadEnding");
const Ci = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new WeakMap();
function W(i2) {
  const o2 = Ci.get(i2);
  return console.assert(o2 != null, "'this' is expected an Event object, but got", i2), o2;
}
n$1(W, "pd");
function Pi(i2) {
  if (i2.passiveListener != null) {
    typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i2.passiveListener);
    return;
  }
  i2.event.cancelable && (i2.canceled = true, typeof i2.event.preventDefault == "function" && i2.event.preventDefault());
}
n$1(Pi, "setCancelFlag");
function ht(i2, o2) {
  Ci.set(this, { eventTarget: i2, event: o2, eventPhase: 2, currentTarget: i2, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: o2.timeStamp || Date.now() }), Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
  const a2 = Object.keys(o2);
  for (let u2 = 0; u2 < a2.length; ++u2) {
    const l2 = a2[u2];
    l2 in this || Object.defineProperty(this, l2, vi(l2));
  }
}
n$1(ht, "Event"), ht.prototype = { get type() {
  return W(this).event.type;
}, get target() {
  return W(this).eventTarget;
}, get currentTarget() {
  return W(this).currentTarget;
}, composedPath() {
  const i2 = W(this).currentTarget;
  return i2 == null ? [] : [i2];
}, get NONE() {
  return 0;
}, get CAPTURING_PHASE() {
  return 1;
}, get AT_TARGET() {
  return 2;
}, get BUBBLING_PHASE() {
  return 3;
}, get eventPhase() {
  return W(this).eventPhase;
}, stopPropagation() {
  const i2 = W(this);
  i2.stopped = true, typeof i2.event.stopPropagation == "function" && i2.event.stopPropagation();
}, stopImmediatePropagation() {
  const i2 = W(this);
  i2.stopped = true, i2.immediateStopped = true, typeof i2.event.stopImmediatePropagation == "function" && i2.event.stopImmediatePropagation();
}, get bubbles() {
  return !!W(this).event.bubbles;
}, get cancelable() {
  return !!W(this).event.cancelable;
}, preventDefault() {
  Pi(W(this));
}, get defaultPrevented() {
  return W(this).canceled;
}, get composed() {
  return !!W(this).event.composed;
}, get timeStamp() {
  return W(this).timeStamp;
}, get srcElement() {
  return W(this).eventTarget;
}, get cancelBubble() {
  return W(this).stopped;
}, set cancelBubble(i2) {
  if (!i2)
    return;
  const o2 = W(this);
  o2.stopped = true, typeof o2.event.cancelBubble == "boolean" && (o2.event.cancelBubble = true);
}, get returnValue() {
  return !W(this).canceled;
}, set returnValue(i2) {
  i2 || Pi(W(this));
}, initEvent() {
} }, Object.defineProperty(ht.prototype, "constructor", { value: ht, configurable: true, writable: true });
function vi(i2) {
  return { get() {
    return W(this).event[i2];
  }, set(o2) {
    W(this).event[i2] = o2;
  }, configurable: true, enumerable: true };
}
n$1(vi, "defineRedirectDescriptor");
function gl(i2) {
  return { value() {
    const o2 = W(this).event;
    return o2[i2].apply(o2, arguments);
  }, configurable: true, enumerable: true };
}
n$1(gl, "defineCallDescriptor");
function _l(i2, o2) {
  const a2 = Object.keys(o2);
  if (a2.length === 0)
    return i2;
  function u2(l2, p) {
    i2.call(this, l2, p);
  }
  n$1(u2, "CustomEvent"), u2.prototype = Object.create(i2.prototype, { constructor: { value: u2, configurable: true, writable: true } });
  for (let l2 = 0; l2 < a2.length; ++l2) {
    const p = a2[l2];
    if (!(p in i2.prototype)) {
      const g2 = typeof Object.getOwnPropertyDescriptor(o2, p).value == "function";
      Object.defineProperty(u2.prototype, p, g2 ? gl(p) : vi(p));
    }
  }
  return u2;
}
n$1(_l, "defineWrapper");
function Ei(i2) {
  if (i2 == null || i2 === Object.prototype)
    return ht;
  let o2 = Dn.get(i2);
  return o2 == null && (o2 = _l(Ei(Object.getPrototypeOf(i2)), i2), Dn.set(i2, o2)), o2;
}
n$1(Ei, "getWrapper");
function Sl(i2, o2) {
  const a2 = Ei(Object.getPrototypeOf(o2));
  return new a2(i2, o2);
}
n$1(Sl, "wrapEvent");
function wl(i2) {
  return W(i2).immediateStopped;
}
n$1(wl, "isStopped");
function Rl(i2, o2) {
  W(i2).eventPhase = o2;
}
n$1(Rl, "setEventPhase");
function Tl(i2, o2) {
  W(i2).currentTarget = o2;
}
n$1(Tl, "setCurrentTarget");
function Ai(i2, o2) {
  W(i2).passiveListener = o2;
}
n$1(Ai, "setPassiveListener");
const Bi = /* @__PURE__ */ new WeakMap(), ki = 1, Wi = 2, wr = 3;
function Rr(i2) {
  return i2 !== null && typeof i2 == "object";
}
n$1(Rr, "isObject");
function Bt(i2) {
  const o2 = Bi.get(i2);
  if (o2 == null)
    throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  return o2;
}
n$1(Bt, "getListeners");
function Cl(i2) {
  return { get() {
    let a2 = Bt(this).get(i2);
    for (; a2 != null; ) {
      if (a2.listenerType === wr)
        return a2.listener;
      a2 = a2.next;
    }
    return null;
  }, set(o2) {
    typeof o2 != "function" && !Rr(o2) && (o2 = null);
    const a2 = Bt(this);
    let u2 = null, l2 = a2.get(i2);
    for (; l2 != null; )
      l2.listenerType === wr ? u2 !== null ? u2.next = l2.next : l2.next !== null ? a2.set(i2, l2.next) : a2.delete(i2) : u2 = l2, l2 = l2.next;
    if (o2 !== null) {
      const p = { listener: o2, listenerType: wr, passive: false, once: false, next: null };
      u2 === null ? a2.set(i2, p) : u2.next = p;
    }
  }, configurable: true, enumerable: true };
}
n$1(Cl, "defineEventAttributeDescriptor");
function qi(i2, o2) {
  Object.defineProperty(i2, `on${o2}`, Cl(o2));
}
n$1(qi, "defineEventAttribute");
function Oi(i2) {
  function o2() {
    Pe.call(this);
  }
  n$1(o2, "CustomEventTarget"), o2.prototype = Object.create(Pe.prototype, { constructor: { value: o2, configurable: true, writable: true } });
  for (let a2 = 0; a2 < i2.length; ++a2)
    qi(o2.prototype, i2[a2]);
  return o2;
}
n$1(Oi, "defineCustomEventTarget");
function Pe() {
  if (this instanceof Pe) {
    Bi.set(this, /* @__PURE__ */ new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0]))
    return Oi(arguments[0]);
  if (arguments.length > 0) {
    const i2 = new Array(arguments.length);
    for (let o2 = 0; o2 < arguments.length; ++o2)
      i2[o2] = arguments[o2];
    return Oi(i2);
  }
  throw new TypeError("Cannot call a class as a function");
}
n$1(Pe, "EventTarget"), Pe.prototype = { addEventListener(i2, o2, a2) {
  if (o2 == null)
    return;
  if (typeof o2 != "function" && !Rr(o2))
    throw new TypeError("'listener' should be a function or an object.");
  const u2 = Bt(this), l2 = Rr(a2), h2 = (l2 ? !!a2.capture : !!a2) ? ki : Wi, g2 = { listener: o2, listenerType: h2, passive: l2 && !!a2.passive, once: l2 && !!a2.once, next: null };
  let A2 = u2.get(i2);
  if (A2 === void 0) {
    u2.set(i2, g2);
    return;
  }
  let w2 = null;
  for (; A2 != null; ) {
    if (A2.listener === o2 && A2.listenerType === h2)
      return;
    w2 = A2, A2 = A2.next;
  }
  w2.next = g2;
}, removeEventListener(i2, o2, a2) {
  if (o2 == null)
    return;
  const u2 = Bt(this), p = (Rr(a2) ? !!a2.capture : !!a2) ? ki : Wi;
  let h2 = null, g2 = u2.get(i2);
  for (; g2 != null; ) {
    if (g2.listener === o2 && g2.listenerType === p) {
      h2 !== null ? h2.next = g2.next : g2.next !== null ? u2.set(i2, g2.next) : u2.delete(i2);
      return;
    }
    h2 = g2, g2 = g2.next;
  }
}, dispatchEvent(i2) {
  if (i2 == null || typeof i2.type != "string")
    throw new TypeError('"event.type" should be a string.');
  const o2 = Bt(this), a2 = i2.type;
  let u2 = o2.get(a2);
  if (u2 == null)
    return true;
  const l2 = Sl(this, i2);
  let p = null;
  for (; u2 != null; ) {
    if (u2.once ? p !== null ? p.next = u2.next : u2.next !== null ? o2.set(a2, u2.next) : o2.delete(a2) : p = u2, Ai(l2, u2.passive ? u2.listener : null), typeof u2.listener == "function")
      try {
        u2.listener.call(this, l2);
      } catch (h2) {
        typeof console < "u" && typeof console.error == "function" && console.error(h2);
      }
    else
      u2.listenerType !== wr && typeof u2.listener.handleEvent == "function" && u2.listener.handleEvent(l2);
    if (wl(l2))
      break;
    u2 = u2.next;
  }
  return Ai(l2, null), Rl(l2, 0), Tl(l2, null), !l2.defaultPrevented;
} }, Object.defineProperty(Pe.prototype, "constructor", { value: Pe, configurable: true, writable: true });
const Vn = class Vn2 extends Pe {
  constructor() {
    throw super(), new TypeError("AbortSignal cannot be constructed directly");
  }
  get aborted() {
    const o2 = Tr.get(this);
    if (typeof o2 != "boolean")
      throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    return o2;
  }
};
n$1(Vn, "AbortSignal");
let pt = Vn;
qi(pt.prototype, "abort");
function Pl() {
  const i2 = Object.create(pt.prototype);
  return Pe.call(i2), Tr.set(i2, false), i2;
}
n$1(Pl, "createAbortSignal");
function vl(i2) {
  Tr.get(i2) === false && (Tr.set(i2, true), i2.dispatchEvent({ type: "abort" }));
}
n$1(vl, "abortSignal");
const Tr = /* @__PURE__ */ new WeakMap();
Object.defineProperties(pt.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pt.prototype, Symbol.toStringTag, { configurable: true, value: "AbortSignal" });
let Mn = (It = class {
  constructor() {
    zi.set(this, Pl());
  }
  get signal() {
    return Ii(this);
  }
  abort() {
    vl(Ii(this));
  }
}, n$1(It, "AbortController"), It);
const zi = /* @__PURE__ */ new WeakMap();
function Ii(i2) {
  const o2 = zi.get(i2);
  if (o2 == null)
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i2 === null ? "null" : typeof i2}`);
  return o2;
}
n$1(Ii, "getSignal"), Object.defineProperties(Mn.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mn.prototype, Symbol.toStringTag, { configurable: true, value: "AbortController" });
var El = Object.defineProperty, Al = n$1((i2, o2) => El(i2, "name", { value: o2, configurable: true }), "e");
const Fi = Ti;
ji();
function ji() {
  var _a2, _b2, _c;
  !((_b2 = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b2.node) && !((_c = globalThis.process) == null ? void 0 : _c.env.DISABLE_NODE_FETCH_NATIVE_WARN) && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n$1(ji, "s"), Al(ji, "checkNodeEnvironment");
var a$1 = Object.defineProperty;
var t$1 = (e2, r2) => a$1(e2, "name", { value: r2, configurable: true });
var f$1 = Object.defineProperty, g$1 = t$1((e2, r2) => f$1(e2, "name", { value: r2, configurable: true }), "e");
const o$1 = !!((_b = (_a = globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.FORCE_NODE_FETCH);
function l$1() {
  return !o$1 && globalThis.fetch ? globalThis.fetch : Fi;
}
t$1(l$1, "p"), g$1(l$1, "_getFetch");
const s$1 = l$1(), d$1 = !o$1 && globalThis.Headers || ye, A$1 = !o$1 && globalThis.AbortController || Mn;
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s2 = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s2.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s2[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s2[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k2) => query[k2] !== void 0).map((k2) => encodeQueryItem(k2, query[k2])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s2] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s2.length > 0 ? `?${s2.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s2] = path.split("?");
  return s0 + "/" + (s2.length > 0 ? `?${s2.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function isSamePath(p1, p2) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}
const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if ((opts == null ? void 0 : opts.cause) && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  var _a2, _b2, _c, _d, _e;
  const errorMessage = ((_a2 = ctx.error) == null ? void 0 : _a2.message) || ((_b2 = ctx.error) == null ? void 0 : _b2.toString()) || "";
  const method = ((_c = ctx.request) == null ? void 0 : _c.method) || ((_d = ctx.options) == null ? void 0 : _d.method) || "GET";
  const url = ((_e = ctx.request) == null ? void 0 : _e.url) || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}
const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t2 = typeof value;
  if (t2 === "string" || t2 === "number" || t2 === "boolean" || t2 === null) {
    return true;
  }
  if (t2 !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers2 = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if ((defaults == null ? void 0 : defaults.params) && (input == null ? void 0 : input.params)) {
    merged.params = {
      ...defaults == null ? void 0 : defaults.params,
      ...input == null ? void 0 : input.params
    };
  }
  if ((defaults == null ? void 0 : defaults.query) && (input == null ? void 0 : input.query)) {
    merged.query = {
      ...defaults == null ? void 0 : defaults.query,
      ...input == null ? void 0 : input.query
    };
  }
  if ((defaults == null ? void 0 : defaults.headers) && (input == null ? void 0 : input.headers)) {
    merged.headers = new Headers2((defaults == null ? void 0 : defaults.headers) || {});
    for (const [key, value] of new Headers2((input == null ? void 0 : input.headers) || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch: fetch2 = globalThis.fetch,
    Headers: Headers2 = globalThis.Headers,
    AbortController: AbortController2 = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    var _a2;
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers2),
      response: void 0,
      error: void 0
    };
    context.options.method = (_a2 = context.options.method) == null ? void 0 : _a2.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController2();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch2(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r2 = await $fetchRaw(request, options);
    return r2._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch2(...args);
  $fetch.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}
function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return s$1;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new vt.Agent(agentOptions);
  const httpsAgent = new Bs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return s$1(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers = globalThis.Headers || d$1;
const AbortController$1 = globalThis.AbortController || A$1;
const ofetch = createFetch({ fetch, Headers, AbortController: AbortController$1 });
const $fetch$1 = ofetch;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a2, _b2;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a3;
    const unresolvedPluginsForThisPlugin = ((_a3 = plugin2.dependsOn) == null ? void 0 : _a3.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e2) => errors.push(e2)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext) && ((_b2 = plugin2.env) == null ? void 0 : _b2.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i2 = 0; i2 < promiseDepth; i2++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup2, args) {
  const fn = () => args ? setup2(...args) : setup2();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a2;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a2;
  return (_a2 = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = null;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version$1.startsWith("3");
function resolveUnref(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root2 = resolveUnref(ref2);
  if (!ref2 || !root2)
    return root2;
  if (Array.isArray(root2))
    return root2.map((r2) => resolveUnrefHeadInput(r2, lastKey));
  if (typeof root2 === "object") {
    return Object.fromEntries(
      Object.entries(root2).map(([k2, v2]) => {
        if (k2 === "titleTemplate" || k2.startsWith("on"))
          return [k2, unref(v2)];
        return [k2, resolveUnrefHeadInput(v2, k2)];
      })
    );
  }
  return root2;
}
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e2) => {
    entry2.patch(e2);
  });
  getCurrentInstance();
  return entry2;
}
const unhead_n3iigXbUuN = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace2) => {
      if (!replace2) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r2 = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r2;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r2) => {
    var _a2;
    return ((_a2 = route.params[r2.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m2) => {
    var _a2;
    return ((_a2 = m2.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c2) => _defu(p, c2, "", merger), {})
  );
}
const defu = createDefu();
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": true };
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const _routes = [
  {
    name: "about",
    path: "/about",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./about-DVp9-RMq.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "admin",
    path: "/admin",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-DvqZSAZp.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "article-detail-id",
    path: "/article/detail/:id()",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./_id_-BhsGW4jg.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "article",
    path: "/article",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-CPFqf28G.mjs').then((m2) => m2.default || m2)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-cHMj-xph.mjs').then((m2) => m2.default || m2)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a2;
    return props ? h$1(component, props, slots) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r2) => {
    var _a2;
    return ((_a2 = route.params[r2.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from2) {
  if (to === from2 || from2 === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from2)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => {
      var _a2, _b2;
      return comp.components && comp.components.default === ((_b2 = (_a2 = from2.matched[index2]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from2, savedPosition) {
    var _a2;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a2 = useRouter().options) == null ? void 0 : _a2.scrollBehaviorType) ?? "auto";
    let position2 = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from2) : to.meta.scrollToTop;
    if (!position2 && from2 && to && routeAllowsScrollToTop !== false && isChangingPage(to, from2)) {
      position2 = { left: 0, top: 0 };
    }
    if (to.path === from2.path) {
      if (from2.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from2) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position2 = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position2);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b2, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b2 = routerOptions.routes) == null ? void 0 : _b2.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from2, savedPosition) => {
        if (from2 === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from2) => {
      previousRoute.value = from2;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from2) => {
      var _a3, _b3, _c2, _d;
      if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d = (_c2 = from2.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from2) => {
      var _a3, _b3;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r2) => r2.default || r2)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from2));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    useError();
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.fullPath !== initialURL && (to.redirectedFrom || !isSamePath(to.fullPath, initialURL))) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_O0NGasFLi0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const LazyContentDoc = defineAsyncComponent(() => import('./ContentDoc-B2iCVHju.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentList = defineAsyncComponent(() => import('./ContentList-DzABATLK.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentNavigation = defineAsyncComponent(() => import('./ContentNavigation-BRUWHDJy.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentQuery = defineAsyncComponent(() => import('./ContentQuery-BHrVu1x8.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentRenderer = defineAsyncComponent(() => import('./ContentRenderer-CZAVktt2.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentRendererMarkdown = defineAsyncComponent(() => import('./ContentRendererMarkdown-72Dff3SW.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyContentSlot = defineAsyncComponent(() => import('./ContentSlot-CS0BBgM8.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyDocumentDrivenEmpty = defineAsyncComponent(() => import('./DocumentDrivenEmpty-C0K2MxpJ.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyDocumentDrivenNotFound = defineAsyncComponent(() => import('./DocumentDrivenNotFound-poYXCCAi.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyMarkdown = defineAsyncComponent(() => import('./Markdown-DLRDJcH1.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseCode = defineAsyncComponent(() => import('./ProseCode-GCKyKWL3.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseCodeInline = defineAsyncComponent(() => import('./ProseCodeInline-DgSSExv0.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProsePre = defineAsyncComponent(() => import('./ProsePre-CnsClAiY.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseA = defineAsyncComponent(() => import('./ProseA-DiWXp7xN.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseBlockquote = defineAsyncComponent(() => import('./ProseBlockquote-B8Dr8r0t.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseEm = defineAsyncComponent(() => import('./ProseEm-BJoS4OL2.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH1 = defineAsyncComponent(() => import('./ProseH1-CclPNF0u.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH2 = defineAsyncComponent(() => import('./ProseH2-B8TWcCi4.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH3 = defineAsyncComponent(() => import('./ProseH3-Cy6mex3p.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH4 = defineAsyncComponent(() => import('./ProseH4-Cc8e34GW.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH5 = defineAsyncComponent(() => import('./ProseH5-BXwD7olr.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseH6 = defineAsyncComponent(() => import('./ProseH6-BvZjOiXS.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseHr = defineAsyncComponent(() => import('./ProseHr-GgtfXfV1.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseImg = defineAsyncComponent(() => import('./ProseImg-T-TLR2Vx.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseLi = defineAsyncComponent(() => import('./ProseLi-J8RbJZ_j.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseOl = defineAsyncComponent(() => import('./ProseOl-psWxkXXG.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseP = defineAsyncComponent(() => import('./ProseP-BGYjPHLY.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseScript = defineAsyncComponent(() => import('./ProseScript-Bdh2N79T.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseStrong = defineAsyncComponent(() => import('./ProseStrong-DkYwhUSu.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseTable = defineAsyncComponent(() => import('./ProseTable-CURJnO55.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseTbody = defineAsyncComponent(() => import('./ProseTbody-jdDYfemg.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseTd = defineAsyncComponent(() => import('./ProseTd-CTKNGZLn.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseTh = defineAsyncComponent(() => import('./ProseTh-CJ-hJ2Kp.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseThead = defineAsyncComponent(() => import('./ProseThead-ByOA9PQn.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseTr = defineAsyncComponent(() => import('./ProseTr-H5Fl7o1w.mjs').then((r2) => r2["default"] || r2.default || r2));
const LazyProseUl = defineAsyncComponent(() => import('./ProseUl-B1Ae8UQZ.mjs').then((r2) => r2["default"] || r2.default || r2));
const lazyGlobalComponents = [
  ["ContentDoc", LazyContentDoc],
  ["ContentList", LazyContentList],
  ["ContentNavigation", LazyContentNavigation],
  ["ContentQuery", LazyContentQuery],
  ["ContentRenderer", LazyContentRenderer],
  ["ContentRendererMarkdown", LazyContentRendererMarkdown],
  ["MDCSlot", LazyContentSlot],
  ["DocumentDrivenEmpty", LazyDocumentDrivenEmpty],
  ["DocumentDrivenNotFound", LazyDocumentDrivenNotFound],
  ["Markdown", LazyMarkdown],
  ["ProseCode", LazyProseCode],
  ["ProseCodeInline", LazyProseCodeInline],
  ["ProsePre", LazyProsePre],
  ["ProseA", LazyProseA],
  ["ProseBlockquote", LazyProseBlockquote],
  ["ProseEm", LazyProseEm],
  ["ProseH1", LazyProseH1],
  ["ProseH2", LazyProseH2],
  ["ProseH3", LazyProseH3],
  ["ProseH4", LazyProseH4],
  ["ProseH5", LazyProseH5],
  ["ProseH6", LazyProseH6],
  ["ProseHr", LazyProseHr],
  ["ProseImg", LazyProseImg],
  ["ProseLi", LazyProseLi],
  ["ProseOl", LazyProseOl],
  ["ProseP", LazyProseP],
  ["ProseScript", LazyProseScript],
  ["ProseStrong", LazyProseStrong],
  ["ProseTable", LazyProseTable],
  ["ProseTbody", LazyProseTbody],
  ["ProseTd", LazyProseTd],
  ["ProseTh", LazyProseTh],
  ["ProseThead", LazyProseThead],
  ["ProseTr", LazyProseTr],
  ["ProseUl", LazyProseUl]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const prism_IbSO6xpRLU = /* @__PURE__ */ defineNuxtPlugin(() => {
  return {
    provide: {
      Prism
    }
  };
});
const plugins = [
  unhead_n3iigXbUuN,
  plugin,
  revive_payload_server_O0NGasFLi0,
  components_plugin_KR1HBZs4kY,
  prism_IbSO6xpRLU
];
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h$1(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next2, prev2) => {
        if (next2 !== prev2) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h$1(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h$1(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h$1(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m2) => {
    var _a2;
    return ((_a2 = m2.components) == null ? void 0 : _a2.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
function toPrimitive(t2, r2) {
  if ("object" != _typeof$1(t2) || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2 || "default");
    if ("object" != _typeof$1(i2))
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof$1(i2) ? i2 : i2 + "";
}
function _defineProperty$c(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$1(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$c(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const isFunction$1 = (val) => typeof val === "function";
const isArray$1 = Array.isArray;
const isString = (val) => typeof val === "string";
const isObject$1 = (val) => val !== null && typeof val === "object";
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
const hasOwnProperty$a = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$a.call(val, key);
function resolvePropValue(options, props, key, value) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction$1(defaultValue) ? defaultValue() : defaultValue;
    }
    if (opt.type === Boolean) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (value === "") {
        value = true;
      }
    }
  }
  return value;
}
function classNames() {
  const classes = [];
  for (let i2 = 0; i2 < arguments.length; i2++) {
    const value = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
    if (!value)
      continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray$1(value)) {
      for (let i3 = 0; i3 < value.length; i3++) {
        const inner = classNames(value[i3]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject$1(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(" ");
}
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry2, index2) {
      if (entry2[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry2 = this.__entries__[index2];
        return entry2 && entry2[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i2 = 0, _a2 = this.__entries__; _i2 < _a2.length; _i2++) {
          var entry2 = _a2[_i2];
          callback.call(ctx, entry2[1], entry2[0]);
        }
      };
      return class_1;
    }()
  );
}();
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      {
        return;
      }
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      {
        return;
      }
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a2) {
      var _b2 = _a2.propertyName, propertyName = _b2 === void 0 ? "" : _b2;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i2 = 0, _a2 = Object.keys(props); _i2 < _a2.length; _i2++) {
    var key = _a2[_i2];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function getContentRect(target) {
  {
    return emptyRect;
  }
}
function createReadOnlyRect(_a2) {
  var x2 = _a2.x, y2 = _a2.y, width = _a2.width, height = _a2.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x: x2,
    y: y2,
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: height + y2,
    left: x2
  });
  return rect;
}
function createRectInit(x2, y2, width, height) {
  return { x: x2, y: y2, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a2;
    return (_a2 = observers.get(this))[method].apply(_a2, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
const isValid = (value) => {
  return value !== void 0 && value !== null && value !== "";
};
const initDefaultProps = (types2, defaultProps) => {
  const propTypes = _extends({}, types2);
  Object.keys(defaultProps).forEach((k2) => {
    const prop = propTypes[k2];
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k2];
      } else if (prop.def) {
        prop.def(defaultProps[k2]);
      } else {
        propTypes[k2] = {
          type: prop,
          default: defaultProps[k2]
        };
      }
    } else {
      throw new Error(`not have ${k2} prop`);
    }
  });
  return propTypes;
};
const splitAttrs = (attrs) => {
  const allAttrs = Object.keys(attrs);
  const eventAttrs = {};
  const onEvents = {};
  const extraAttrs = {};
  for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
    const key = allAttrs[i2];
    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key];
      onEvents[key] = attrs[key];
    } else {
      extraAttrs[key] = attrs[key];
    }
  }
  return {
    onEvents,
    events: eventAttrs,
    extraAttrs
  };
};
const parseStyleText = function() {
  let cssText = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let camel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  if (typeof cssText === "object")
    return cssText;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k2 = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k2] = tmp[1].trim();
      }
    }
  });
  return res;
};
const hasProp = (instance, prop) => {
  return instance[prop] !== void 0;
};
const skipFlattenKey = Symbol("skipFlatten");
const flattenChildren = function() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const temp = Array.isArray(children) ? children : [children];
  const res = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty2));
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child);
      } else {
        res.push(...flattenChildren(child.children, filterEmpty2));
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty2 && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty2) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};
const getSlot = function(self2) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (isVNode(self2)) {
    if (self2.type === Fragment) {
      return name === "default" ? flattenChildren(self2.children) : [];
    } else if (self2.children && self2.children[name]) {
      return flattenChildren(self2.children[name](options));
    } else {
      return [];
    }
  } else {
    const res = self2.$slots[name] && self2.$slots[name](options);
    return flattenChildren(res);
  }
};
const findDOMNode = (instance) => {
  var _a2;
  let node2 = ((_a2 = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a2 === void 0 ? void 0 : _a2.el) || instance && (instance.$el || instance);
  while (node2 && !node2.tagName) {
    node2 = node2.nextSibling;
  }
  return node2;
};
const getOptionProps = (instance) => {
  const res = {};
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach((k2) => {
      const v2 = instance.$props[k2];
      const hyphenateKey = hyphenate(k2);
      if (v2 !== void 0 || hyphenateKey in props) {
        res[k2] = v2;
      }
    });
  } else if (isVNode(instance) && typeof instance.type === "object") {
    const originProps = instance.props || {};
    const props = {};
    Object.keys(originProps).forEach((key) => {
      props[camelize(key)] = originProps[key];
    });
    const options = instance.type.props || {};
    Object.keys(options).forEach((k2) => {
      const v2 = resolvePropValue(options, props, k2, props[k2]);
      if (v2 !== void 0 || k2 in props) {
        res[k2] = v2;
      }
    });
  }
  return res;
};
const getComponent = function(instance) {
  let prop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : instance;
  let execute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  let com = void 0;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== void 0) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop];
    if (temp !== void 0 && instance.props !== null) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? void 0 : com;
  }
  return com;
};
function getEvents() {
  let ele = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let on = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  let props = {};
  if (ele.$) {
    props = _extends(_extends({}, props), ele.$attrs);
  } else {
    props = _extends(_extends({}, props), ele.props);
  }
  return splitAttrs(props)[on ? "onEvents" : "events"];
}
function getStyle$1(ele, camel) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props.style || {};
  if (typeof style === "string") {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    const res = {};
    Object.keys(style).forEach((k2) => res[camelize(k2)] = style[k2]);
    return res;
  }
  return style;
}
function isFragment(c2) {
  return c2.length === 1 && c2[0].type === Fragment;
}
function isEmptyElement(c2) {
  return c2 && (c2.type === Comment || c2.type === Fragment && c2.children.length === 0 || c2.type === Text && c2.children.trim() === "");
}
function filterEmpty() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const res = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
      res.push(...filterEmpty(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter((c2) => !isEmptyElement(c2));
}
function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && typeof element.type !== "symbol";
}
function getPropsSlot(slots, props) {
  let prop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "default";
  var _a2, _b2;
  return (_a2 = props[prop]) !== null && _a2 !== void 0 ? _a2 : (_b2 = slots[prop]) === null || _b2 === void 0 ? void 0 : _b2.call(slots);
}
let raf = (callback) => setTimeout(callback, 16);
let caf = (num) => clearTimeout(num);
let rafUUID = 0;
const rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
function wrapperRaf(callback) {
  let times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
}
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
function throttleByAnimationFrame(fn) {
  let requestId;
  const later = (args) => () => {
    requestId = null;
    fn(...args);
  };
  const throttled = function() {
    if (requestId == null) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      requestId = wrapperRaf(later(args));
    }
  };
  throttled.cancel = () => {
    wrapperRaf.cancel(requestId);
    requestId = null;
  };
  return throttled;
}
const tuple = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
const withInstall = (comp) => {
  const c2 = comp;
  c2.install = function(app) {
    app.component(c2.displayName || c2.name, comp);
  };
  return comp;
};
function eventType() {
  return {
    type: [Function, Array]
  };
}
function objectType(defaultVal) {
  return {
    type: Object,
    default: defaultVal
  };
}
function booleanType(defaultVal) {
  return {
    type: Boolean,
    default: defaultVal
  };
}
function functionType(defaultVal) {
  return {
    type: Function,
    default: defaultVal
  };
}
function anyType(defaultVal, required) {
  const type = {
    validator: () => true,
    default: defaultVal
  };
  return required ? type : type;
}
function arrayType(defaultVal) {
  return {
    type: Array,
    default: defaultVal
  };
}
function stringType(defaultVal) {
  return {
    type: String,
    default: defaultVal
  };
}
function someType(types2, defaultVal) {
  return types2 ? {
    type: types2,
    default: defaultVal
  } : anyType(defaultVal);
}
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      supportsPassive = true;
    }
  });
  (void 0).addEventListener("testPassive", null, opts);
  (void 0).removeEventListener("testPassive", null, opts);
} catch (e2) {
}
const supportsPassive$1 = supportsPassive;
function addEventListenerWrap(target, eventType2, cb, option) {
  if (target && target.addEventListener) {
    let opt = option;
    if (opt === void 0 && supportsPassive$1 && (eventType2 === "touchstart" || eventType2 === "touchmove" || eventType2 === "wheel")) {
      opt = {
        passive: false
      };
    }
    target.addEventListener(eventType2, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType2, cb);
      }
    }
  };
}
const defaultIconPrefixCls = "anticon";
const configProviderKey = Symbol("configProvider");
const defaultConfigProvider = {
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls)
      return customizePrefixCls;
    return suffixCls ? `ant-${suffixCls}` : "ant";
  },
  iconPrefixCls: computed(() => defaultIconPrefixCls),
  getPopupContainer: computed(() => () => (void 0).body),
  direction: computed(() => "ltr")
};
const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider);
};
const DisabledContextKey = Symbol("DisabledContextKey");
const useInjectDisabled = () => {
  return inject(DisabledContextKey, ref(void 0));
};
const enUS$1 = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
const locale$2 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const CalendarLocale = locale$2;
const locale$1 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const TimePicker = locale$1;
const locale = {
  lang: _extends({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePicker)
};
const enUS = locale;
const typeTemplate = "${label} is not a valid ${type}";
const localeValues = {
  locale: "en",
  Pagination: enUS$1,
  DatePicker: enUS,
  TimePicker,
  Calendar: enUS,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh",
    scanned: "Scanned"
  }
};
const LocaleReceiver = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const localeData = inject("localeData", {});
    const locale2 = computed(() => {
      const {
        componentName = "global",
        defaultLocale
      } = props;
      const locale3 = defaultLocale || localeValues[componentName || "global"];
      const {
        antLocale
      } = localeData;
      const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return _extends(_extends({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
    });
    const localeCode = computed(() => {
      const {
        antLocale
      } = localeData;
      const localeCode2 = antLocale && antLocale.locale;
      if (antLocale && antLocale.exist && !localeCode2) {
        return localeValues.locale;
      }
      return localeCode2;
    });
    return () => {
      const children = props.children || slots.default;
      const {
        antLocale
      } = localeData;
      return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
    };
  }
});
function murmur2(str) {
  var h2 = 0;
  var k2, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= /* k >>> r: */
    k2 >>> 24;
    h2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i2) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
const SPLIT = "%";
class Entity {
  constructor(instanceId) {
    this.cache = /* @__PURE__ */ new Map();
    this.instanceId = instanceId;
  }
  get(keys2) {
    return this.cache.get(Array.isArray(keys2) ? keys2.join(SPLIT) : keys2) || null;
  }
  update(keys2, valueFn) {
    const path = Array.isArray(keys2) ? keys2.join(SPLIT) : keys2;
    const prevValue = this.cache.get(path);
    const nextValue = valueFn(prevValue);
    if (nextValue === null) {
      this.cache.delete(path);
    } else {
      this.cache.set(path, nextValue);
    }
  }
}
const CacheEntity = Entity;
const ATTR_MARK = "data-css-hash";
function createCache() {
  const cssinjsInstanceId = Math.random().toString(12).slice(2);
  return new CacheEntity(cssinjsInstanceId);
}
const StyleContextKey = Symbol("StyleContextKey");
const getCache = () => {
  var _a2, _b2, _c;
  const instance = getCurrentInstance();
  let cache;
  if (instance && instance.appContext) {
    const globalCache = (_c = (_b2 = (_a2 = instance.appContext) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.globalProperties) === null || _c === void 0 ? void 0 : _c.__ANTDV_CSSINJS_CACHE__;
    if (globalCache) {
      cache = globalCache;
    } else {
      cache = createCache();
      if (instance.appContext.config.globalProperties) {
        instance.appContext.config.globalProperties.__ANTDV_CSSINJS_CACHE__ = cache;
      }
    }
  } else {
    cache = createCache();
  }
  return cache;
};
const defaultStyleContext = {
  cache: createCache(),
  defaultCache: true,
  hashPriority: "low"
};
const useStyleInject = () => {
  const cache = getCache();
  return inject(StyleContextKey, shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache
  })));
};
const useStyleProvider = (props) => {
  const parentContext = useStyleInject();
  const context = shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache: createCache()
  }));
  watch([() => unref(props), parentContext], () => {
    const mergedContext = _extends({}, parentContext.value);
    const propsValue = unref(props);
    Object.keys(propsValue).forEach((key) => {
      const value = propsValue[key];
      if (propsValue[key] !== void 0) {
        mergedContext[key] = value;
      }
    });
    const {
      cache
    } = propsValue;
    mergedContext.cache = mergedContext.cache || createCache();
    mergedContext.defaultCache = !cache && parentContext.value.defaultCache;
    context.value = mergedContext;
  }, {
    immediate: true
  });
  provide(StyleContextKey, context);
  return context;
};
const styleProviderProps = () => ({
  autoClear: booleanType(),
  /** @private Test only. Not work in production. */
  mock: stringType(),
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache: objectType(),
  /** Tell children that this context is default generated context */
  defaultCache: booleanType(),
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority: stringType(),
  /** Tell cssinjs where to inject style in */
  container: someType(),
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline: booleanType(),
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers: arrayType(),
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters: arrayType()
});
withInstall(defineComponent({
  name: "AStyleProvider",
  inheritAttrs: false,
  props: styleProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useStyleProvider(props);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
}));
function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  const styleContext = useStyleInject();
  const fullPathStr = shallowRef("");
  const res = shallowRef();
  watchEffect(() => {
    fullPathStr.value = [prefix, ...keyPath.value].join("%");
  });
  const clearCache = (pathStr) => {
    styleContext.value.cache.update(pathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      const nextCount = times - 1;
      if (nextCount === 0) {
        onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
        return null;
      }
      return [times - 1, cache];
    });
  };
  watch(fullPathStr, (newStr, oldStr) => {
    if (oldStr)
      clearCache(oldStr);
    styleContext.value.cache.update(newStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      let tmpCache = cache;
      const mergedCache = tmpCache || cacheFn();
      return [times + 1, mergedCache];
    });
    res.value = styleContext.value.cache.get(fullPathStr.value)[1];
  }, {
    immediate: true
  });
  return res;
}
function canUseDom() {
  return false;
}
function contains(root2, n2) {
  if (!root2) {
    return false;
  }
  if (root2.contains) {
    return root2.contains(n2);
  }
  return false;
}
const MARK_KEY = `vc-util-key`;
const containerCache = /* @__PURE__ */ new Map();
function getMark() {
  let {
    mark
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = (void 0).querySelector("head");
  return head || (void 0).body;
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node2) => node2.tagName === "STYLE");
}
function findExistNode(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const container = getContainer(option);
  return findStyles(container).find((node2) => node2.getAttribute(getMark(option)) === key);
}
function removeCSS(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i2 = 0; i2 < left.length; i2++) {
    if (left[i2] !== right[i2]) {
      return false;
    }
  }
  return true;
}
class ThemeCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(derivativeOption) {
    let updateCallTimes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let cache = {
      map: this.cache
    };
    derivativeOption.forEach((derivative2) => {
      var _a2;
      if (!cache) {
        cache = void 0;
      } else {
        cache = (_a2 = cache === null || cache === void 0 ? void 0 : cache.map) === null || _a2 === void 0 ? void 0 : _a2.get(derivative2);
      }
    });
    if ((cache === null || cache === void 0 ? void 0 : cache.value) && updateCallTimes) {
      cache.value[1] = this.cacheCallTimes++;
    }
    return cache === null || cache === void 0 ? void 0 : cache.value;
  }
  get(derivativeOption) {
    var _a2;
    return (_a2 = this.internalGet(derivativeOption, true)) === null || _a2 === void 0 ? void 0 : _a2[0];
  }
  has(derivativeOption) {
    return !!this.internalGet(derivativeOption);
  }
  set(derivativeOption, value) {
    if (!this.has(derivativeOption)) {
      if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
        const [targetKey] = this.keys.reduce((result, key) => {
          const [, callTimes] = result;
          if (this.internalGet(key)[1] < callTimes) {
            return [key, this.internalGet(key)[1]];
          }
          return result;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(targetKey);
      }
      this.keys.push(derivativeOption);
    }
    let cache = this.cache;
    derivativeOption.forEach((derivative2, index2) => {
      if (index2 === derivativeOption.length - 1) {
        cache.set(derivative2, {
          value: [value, this.cacheCallTimes++]
        });
      } else {
        const cacheValue = cache.get(derivative2);
        if (!cacheValue) {
          cache.set(derivative2, {
            map: /* @__PURE__ */ new Map()
          });
        } else if (!cacheValue.map) {
          cacheValue.map = /* @__PURE__ */ new Map();
        }
        cache = cache.get(derivative2).map;
      }
    });
  }
  deleteByPath(currentCache, derivatives) {
    var _a2;
    const cache = currentCache.get(derivatives[0]);
    if (derivatives.length === 1) {
      if (!cache.map) {
        currentCache.delete(derivatives[0]);
      } else {
        currentCache.set(derivatives[0], {
          map: cache.map
        });
      }
      return (_a2 = cache.value) === null || _a2 === void 0 ? void 0 : _a2[0];
    }
    const result = this.deleteByPath(cache.map, derivatives.slice(1));
    if ((!cache.map || cache.map.size === 0) && !cache.value) {
      currentCache.delete(derivatives[0]);
    }
    return result;
  }
  delete(derivativeOption) {
    if (this.has(derivativeOption)) {
      this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
      return this.deleteByPath(this.cache, derivativeOption);
    }
    return void 0;
  }
}
ThemeCache.MAX_CACHE_SIZE = 20;
ThemeCache.MAX_CACHE_OFFSET = 5;
let warned = {};
function warning$2(valid, message) {
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning$2, valid, message);
}
function noop$3() {
}
let warning$1 = noop$3;
let uuid$1 = 0;
class Theme {
  constructor(derivatives) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid$1;
    if (derivatives.length === 0) {
      warning$1(derivatives.length > 0);
    }
    uuid$1 += 1;
  }
  getDerivativeToken(token2) {
    return this.derivatives.reduce((result, derivative2) => derivative2(token2, result), void 0);
  }
}
const cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}
const flattenTokenCache = /* @__PURE__ */ new WeakMap();
function flattenToken(token2) {
  let str = flattenTokenCache.get(token2) || "";
  if (!str) {
    Object.keys(token2).forEach((key) => {
      const value = token2[key];
      str += key;
      if (value instanceof Theme) {
        str += value.id;
      } else if (value && typeof value === "object") {
        str += flattenToken(value);
      } else {
        str += value;
      }
    });
    flattenTokenCache.set(token2, str);
  }
  return str;
}
function token2key(token2, salt) {
  return murmur2(`${salt}_${flattenToken(token2)}`);
}
function supportSelector(styleStr, handleElement, supportCheck) {
  return false;
}
let canLayer = void 0;
function supportLayer() {
  if (canLayer === void 0) {
    canLayer = supportSelector();
  }
  return canLayer;
}
const EMPTY_OVERRIDE = {};
const hashPrefix = "css";
const tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
const TOKEN_THRESHOLD = 0;
function cleanTokenStyle(tokenKey, instanceId) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  const tokenKeyList = Array.from(tokenKeys.keys());
  const cleanableKeyList = tokenKeyList.filter((key) => {
    const count = tokenKeys.get(key) || 0;
    return count <= 0;
  });
  if (tokenKeyList.length - cleanableKeyList.length > TOKEN_THRESHOLD) {
    cleanableKeyList.forEach((key) => {
      tokenKeys.delete(key);
    });
  }
}
const getComputedToken = (originToken, overrideToken, theme, format2) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  let mergedDerivativeToken = _extends(_extends({}, derivativeToken), overrideToken);
  if (format2) {
    mergedDerivativeToken = format2(mergedDerivativeToken);
  }
  return mergedDerivativeToken;
};
function useCacheToken(theme, tokens) {
  let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ref({});
  const style = useStyleInject();
  const mergedToken = computed(() => _extends({}, ...tokens.value));
  const tokenStr = computed(() => flattenToken(mergedToken.value));
  const overrideTokenStr = computed(() => flattenToken(option.value.override || EMPTY_OVERRIDE));
  const cachedToken = useClientCache("token", computed(() => [option.value.salt || "", theme.value.id, tokenStr.value, overrideTokenStr.value]), () => {
    const {
      salt = "",
      override = EMPTY_OVERRIDE,
      formatToken: formatToken2,
      getComputedToken: compute
    } = option.value;
    const mergedDerivativeToken = compute ? compute(mergedToken.value, override, theme.value) : getComputedToken(mergedToken.value, override, theme.value, formatToken2);
    const tokenKey = token2key(mergedDerivativeToken, salt);
    mergedDerivativeToken._tokenKey = tokenKey;
    recordCleanToken(tokenKey);
    const hashId = `${hashPrefix}-${murmur2(tokenKey)}`;
    mergedDerivativeToken._hashId = hashId;
    return [mergedDerivativeToken, hashId];
  }, (cache) => {
    var _a2;
    cleanTokenStyle(cache[0]._tokenKey, (_a2 = style.value) === null || _a2 === void 0 ? void 0 : _a2.cache.instanceId);
  });
  return cachedToken;
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value) {
  return value.trim();
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index2) {
  return value.charCodeAt(index2) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root2, parent, type, props, children, length2, siblings) {
  return { value, root: root2, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index2, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index2, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index2) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index2, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index2) {
  while (!token(peek()))
    next();
  return slice(index2, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root2, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index2 = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index2 ? points[index2 - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root2, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index2++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (ampersand == -1)
              characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root2, parent, index2, offset2, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root2, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index2 = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index2++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root2, parent, index2, offset2, rules, points, type, props, children, length2, siblings) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j2 = 0, k2 = 0; i2 < index2; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root2, parent, offset2 === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root2, parent, siblings) {
  return node(value, root2, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root2, parent, length2, siblings) {
  return node(value, root2, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function serialize(children, callback) {
  var output = "";
  for (var i2 = 0; i2 < children.length; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index2, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length)
        break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(",")))
        return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
const CSS_FILE_STYLE = "_FILE_STYLE__";
let cachePathMap;
function prepare() {
  if (!cachePathMap) {
    cachePathMap = {};
  }
}
function existPath(path) {
  prepare();
  return !!cachePathMap[path];
}
function getStyleAndHash(path) {
  const hash = cachePathMap[path];
  let styleStr = null;
  if (hash && canUseDom()) {
    {
      styleStr = CSS_FILE_STYLE;
    }
  }
  return [styleStr, hash];
}
const isClientSide = canUseDom();
const SKIP_CHECK = "_skip_check_";
const MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr) {
  const serialized = serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
  return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority) {
  if (!hashId) {
    return key;
  }
  const hashClassName = `.${hashId}`;
  const hashSelector = hashPriority === "low" ? `:where(${hashClassName})` : hashClassName;
  const keys2 = key.split(",").map((k2) => {
    var _a2;
    const fullPath = k2.trim().split(/\s+/);
    let firstPath = fullPath[0] || "";
    const htmlElement = ((_a2 = firstPath.match(/^\w+/)) === null || _a2 === void 0 ? void 0 : _a2[0]) || "";
    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
    return [firstPath, ...fullPath.slice(1)].join(" ");
  });
  return keys2.join(",");
}
const parseStyle = function(interpolation) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let {
    root: root2,
    injectHash,
    parentSelectors
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: true,
    parentSelectors: []
  };
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = []
  } = config;
  let styleStr = "";
  let effectStyle = {};
  function parseKeyframes(keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors
      });
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }
  function flattenList(list) {
    let fullList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach((originStyle) => {
    const style = typeof originStyle === "string" && !root2 ? {} : originStyle;
    if (typeof style === "string") {
      styleStr += `${style}
`;
    } else if (style._keyframe) {
      parseKeyframes(style);
    } else {
      const mergedStyle = transformers.reduce((prev2, trans) => {
        var _a2;
        return ((_a2 = trans === null || trans === void 0 ? void 0 : trans.visit) === null || _a2 === void 0 ? void 0 : _a2.call(trans, prev2)) || prev2;
      }, style);
      Object.keys(mergedStyle).forEach((key) => {
        var _a2;
        const value = mergedStyle[key];
        if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
          let subInjectHash = false;
          let mergedKey = key.trim();
          let nextRoot = false;
          if ((root2 || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else {
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root2 && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          const [parsedStr, childEffectStyle] = parseStyle(value, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey]
          });
          effectStyle = _extends(_extends({}, effectStyle), childEffectStyle);
          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          let appendStyle = function(cssKey, cssValue) {
            const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            let formatValue = cssValue;
            if (!unitlessKeys[cssKey] && typeof formatValue === "number" && formatValue !== 0) {
              formatValue = `${formatValue}px`;
            }
            if (cssKey === "animationName" && (cssValue === null || cssValue === void 0 ? void 0 : cssValue._keyframe)) {
              parseKeyframes(cssValue);
              formatValue = cssValue.getName(hashId);
            }
            styleStr += `${styleName}:${formatValue};`;
          };
          const actualValue = (_a2 = value === null || value === void 0 ? void 0 : value.value) !== null && _a2 !== void 0 ? _a2 : value;
          if (typeof value === "object" && (value === null || value === void 0 ? void 0 : value[MULTI_VALUE]) && Array.isArray(actualValue)) {
            actualValue.forEach((item) => {
              appendStyle(key, item);
            });
          } else {
            appendStyle(key, actualValue);
          }
        }
      });
    }
  });
  if (!root2) {
    styleStr = `{${styleStr}}`;
  } else if (layer && supportLayer()) {
    const layerCells = layer.split(",");
    const layerName = layerCells[layerCells.length - 1].trim();
    styleStr = `@layer ${layerName} {${styleStr}}`;
    if (layerCells.length > 1) {
      styleStr = `@layer ${layer}{%%%:%}${styleStr}`;
    }
  }
  return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
  return murmur2(`${path.join("%")}${styleStr}`);
}
function useStyleRegister(info, styleFn) {
  const styleContext = useStyleInject();
  const tokenKey = computed(() => info.value.token._tokenKey);
  const fullPath = computed(() => [tokenKey.value, ...info.value.path]);
  useClientCache(
    "style",
    fullPath,
    // Create cache if needed
    () => {
      const {
        path,
        hashId,
        layer,
        nonce,
        clientOnly,
        order = 0
      } = info.value;
      const cachePath = fullPath.value.join("|");
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, tokenKey.value, styleHash, {}, clientOnly, order];
        }
      }
      const styleObj = styleFn();
      const {
        hashPriority,
        container,
        transformers,
        linters,
        cache
      } = styleContext.value;
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer,
        path: path.join("-"),
        transformers,
        linters
      });
      const styleStr = normalizeStyle(parsedStyle);
      const styleId = uniqueHash(fullPath.value, styleStr);
      return [styleStr, tokenKey.value, styleId, effectStyle, clientOnly, order];
    },
    // Remove cache if no need
    (_ref, fromHMR) => {
      let [, , styleId] = _ref;
      if ((fromHMR || styleContext.value.autoClear) && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK
        });
      }
    }
  );
  return (node2) => {
    return node2;
  };
}
class Keyframe {
  constructor(name, style) {
    this._keyframe = true;
    this.name = name;
    this.style = style;
  }
  getName() {
    let hashId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return hashId ? `${hashId}-${this.name}` : this.name;
  }
}
const version = "4.1.2";
const PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
function bound01(n2, max) {
  if (isOnePointZero(n2)) {
    n2 = "100%";
  }
  var isPercent = isPercentage(n2);
  n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
  if (isPercent) {
    n2 = parseInt(String(n2 * max), 10) / 100;
  }
  if (Math.abs(n2 - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
  } else {
    n2 = n2 % max / parseFloat(String(max));
  }
  return n2;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n2) {
  return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
}
function isPercentage(n2) {
  return typeof n2 === "string" && n2.indexOf("%") !== -1;
}
function boundAlpha(a2) {
  a2 = parseFloat(a2);
  if (isNaN(a2) || a2 < 0 || a2 > 1) {
    a2 = 1;
  }
  return a2;
}
function convertToPercentage(n2) {
  if (n2 <= 1) {
    return "".concat(Number(n2) * 100, "%");
  }
  return n2;
}
function pad2(c2) {
  return c2.length === 1 ? "0" + c2 : String(c2);
}
function rgbToRgb(r2, g2, b2) {
  return {
    r: bound01(r2, 255) * 255,
    g: bound01(g2, 255) * 255,
    b: bound01(b2, 255) * 255
  };
}
function rgbToHsl(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max = Math.max(r2, g2, b2);
  var min = Math.min(r2, g2, b2);
  var h2 = 0;
  var s2 = 0;
  var l2 = (max + min) / 2;
  if (max === min) {
    s2 = 0;
    h2 = 0;
  } else {
    var d2 = max - min;
    s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
    switch (max) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, l: l2 };
}
function hue2rgb(p, q2, t2) {
  if (t2 < 0) {
    t2 += 1;
  }
  if (t2 > 1) {
    t2 -= 1;
  }
  if (t2 < 1 / 6) {
    return p + (q2 - p) * (6 * t2);
  }
  if (t2 < 1 / 2) {
    return q2;
  }
  if (t2 < 2 / 3) {
    return p + (q2 - p) * (2 / 3 - t2) * 6;
  }
  return p;
}
function hslToRgb(h2, s2, l2) {
  var r2;
  var g2;
  var b2;
  h2 = bound01(h2, 360);
  s2 = bound01(s2, 100);
  l2 = bound01(l2, 100);
  if (s2 === 0) {
    g2 = l2;
    b2 = l2;
    r2 = l2;
  } else {
    var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
    var p = 2 * l2 - q2;
    r2 = hue2rgb(p, q2, h2 + 1 / 3);
    g2 = hue2rgb(p, q2, h2);
    b2 = hue2rgb(p, q2, h2 - 1 / 3);
  }
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHsv(r2, g2, b2) {
  r2 = bound01(r2, 255);
  g2 = bound01(g2, 255);
  b2 = bound01(b2, 255);
  var max = Math.max(r2, g2, b2);
  var min = Math.min(r2, g2, b2);
  var h2 = 0;
  var v2 = max;
  var d2 = max - min;
  var s2 = max === 0 ? 0 : d2 / max;
  if (max === min) {
    h2 = 0;
  } else {
    switch (max) {
      case r2:
        h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        h2 = (b2 - r2) / d2 + 2;
        break;
      case b2:
        h2 = (r2 - g2) / d2 + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s: s2, v: v2 };
}
function hsvToRgb(h2, s2, v2) {
  h2 = bound01(h2, 360) * 6;
  s2 = bound01(s2, 100);
  v2 = bound01(v2, 100);
  var i2 = Math.floor(h2);
  var f2 = h2 - i2;
  var p = v2 * (1 - s2);
  var q2 = v2 * (1 - f2 * s2);
  var t2 = v2 * (1 - (1 - f2) * s2);
  var mod = i2 % 6;
  var r2 = [v2, q2, p, p, t2, v2][mod];
  var g2 = [t2, v2, v2, q2, p, p][mod];
  var b2 = [p, p, t2, v2, v2, q2][mod];
  return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
}
function rgbToHex(r2, g2, b2, allow3Char) {
  var hex = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r2, g2, b2, a2, allow4Char) {
  var hex = [
    pad2(Math.round(r2).toString(16)),
    pad2(Math.round(g2).toString(16)),
    pad2(Math.round(b2).toString(16)),
    pad2(convertDecimalToHex(a2))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d2) {
  return Math.round(parseFloat(d2) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a2 = 1;
  var s2 = null;
  var v2 = null;
  var l2 = null;
  var ok = false;
  var format2 = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format2 = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s2 = convertToPercentage(color.s);
      v2 = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s2, v2);
      ok = true;
      format2 = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s2 = convertToPercentage(color.s);
      l2 = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s2, l2);
      ok = true;
      format2 = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a2 = color.a;
    }
  }
  a2 = boundAlpha(a2);
  return {
    ok,
    format: color.format || format2,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a2
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = (
  /** @class */
  function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a2;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R2;
      var G2;
      var B2;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R2 = RsRGB / 12.92;
      } else {
        R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G2 = GsRGB / 12.92;
      } else {
        G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B2 = BsRGB / 12.92;
      } else {
        B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.isMonochrome = function() {
      var s2 = this.toHsl().s;
      return s2 === 0;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h2 = Math.round(hsv.h * 360);
      var s2 = Math.round(hsv.s * 100);
      var v2 = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h2 = Math.round(hsl.h * 360);
      var s2 = Math.round(hsl.s * 100);
      var l2 = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toHexShortString = function(allowShortChar) {
      if (allowShortChar === void 0) {
        allowShortChar = false;
      }
      return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r2 = Math.round(this.r);
      var g2 = Math.round(this.g);
      var b2 = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x2) {
        return "".concat(Math.round(bound01(x2, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x2) {
        return Math.round(bound01(x2, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i2 = 0, _a2 = Object.entries(names); _i2 < _a2.length; _i2++) {
        var _b2 = _a2[_i2], key = _b2[0], value = _b2[1];
        if (hex === value) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format2) {
      var formatSet = Boolean(format2);
      format2 = format2 !== null && format2 !== void 0 ? format2 : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format2.startsWith("hex") || format2 === "name");
      if (needsAlphaFormat) {
        if (format2 === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format2 === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format2 === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format2 === "hex" || format2 === "hex6") {
        formattedString = this.toHexString();
      }
      if (format2 === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format2 === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format2 === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format2 === "name") {
        formattedString = this.toName();
      }
      if (format2 === "hsl") {
        formattedString = this.toHslString();
      }
      if (format2 === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h2 = hsv.h;
      var s2 = hsv.s;
      var v2 = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h: h2, s: s2, v: v2 }));
        v2 = (v2 + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      var alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor2({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n2) {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      var result = [this];
      var increment = 360 / n2;
      for (var i2 = 1; i2 < n2; i2++) {
        result.push(new TinyColor2({ h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }()
);
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function toHsv(_ref) {
  var r2 = _ref.r, g2 = _ref.g, b2 = _ref.b;
  var hsv = rgbToHsv(r2, g2, b2);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}
function toHex(_ref2) {
  var r2 = _ref2.r, g2 = _ref2.g, b2 = _ref2.b;
  return "#".concat(rgbToHex(r2, g2, b2, false));
}
function mix$1(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}
function getHue(hsv, i2, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i2 : Math.round(hsv.h) + hueStep * i2;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i2 : Math.round(hsv.h) - hueStep * i2;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i2, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i2;
  } else if (i2 === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i2;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i2 === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}
function getValue$1(hsv, i2, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i2;
  } else {
    value = hsv.v - brightnessStep2 * i2;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}
function generate$1(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);
  for (var i2 = lightColorCount; i2 > 0; i2 -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i2, true),
      s: getSaturation(hsv, i2, true),
      v: getValue$1(hsv, i2, true)
    }));
    patterns.push(colorString);
  }
  patterns.push(toHex(pColor));
  for (var _i2 = 1; _i2 <= darkColorCount; _i2 += 1) {
    var _hsv = toHsv(pColor);
    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i2),
      s: getSaturation(_hsv, _i2),
      v: getValue$1(_hsv, _i2)
    }));
    patterns.push(_colorString);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(function(_ref3) {
      var index2 = _ref3.index, opacity = _ref3.opacity;
      var darkColorString = toHex(mix$1(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index2]), opacity * 100));
      return darkColorString;
    });
  }
  return patterns;
}
var presetPrimaryColors = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function(key) {
  presetPalettes[key] = generate$1(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];
  presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
    theme: "dark",
    backgroundColor: "#141414"
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var blue = presetPalettes.blue;
const genControlHeight = (token2) => {
  const {
    controlHeight
  } = token2;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
function genSizeMapToken(token2) {
  const {
    sizeUnit,
    sizeStep
  } = token2;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    sizeXL: sizeUnit * (sizeStep + 4),
    sizeLG: sizeUnit * (sizeStep + 2),
    sizeMD: sizeUnit * (sizeStep + 1),
    sizeMS: sizeUnit * sizeStep,
    size: sizeUnit * sizeStep,
    sizeSM: sizeUnit * (sizeStep - 1),
    sizeXS: sizeUnit * (sizeStep - 2),
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}
const defaultPresetColors = {
  blue: "#1677ff",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#eb2f96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
const seedToken = _extends(_extends({}, defaultPresetColors), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false
});
const defaultSeedToken = seedToken;
function genColorMapToken(seed, _ref) {
  let {
    generateColorPalettes: generateColorPalettes2,
    generateNeutralColorPalettes: generateNeutralColorPalettes2
  } = _ref;
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase
  } = seed;
  const primaryColors = generateColorPalettes2(colorPrimaryBase);
  const successColors = generateColorPalettes2(colorSuccessBase);
  const warningColors = generateColorPalettes2(colorWarningBase);
  const errorColors = generateColorPalettes2(colorErrorBase);
  const infoColors = generateColorPalettes2(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
  return _extends(_extends({}, neutralColors), {
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorBgMask: new TinyColor("#000").setAlpha(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const genRadius = (radiusBase) => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;
  let radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase > 16 ? 16 : radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
function genCommonMapToken(token2) {
  const {
    motionUnit,
    motionBase,
    borderRadius,
    lineWidth
  } = token2;
  return _extends({
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
    // line
    lineWidthBold: lineWidth + 1
  }, genRadius(borderRadius));
}
const getAlphaColor$1 = (baseColor, alpha) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};
const generateColorPalettes = (baseColor) => {
  const colors = generate$1(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#fff";
  const colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor$1(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
    colorFill: getAlphaColor$1(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};
function getFontSizes(base) {
  const fontSizes = new Array(10).fill(null).map((_2, index2) => {
    const i2 = index2 - 1;
    const baseSize = base * Math.pow(2.71828, i2 / 5);
    const intSize = index2 > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map((size) => {
    const height = size + 8;
    return {
      size,
      lineHeight: height / size
    };
  });
}
const genFontMapToken = (fontSize) => {
  const fontSizePairs = getFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
  return {
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  };
};
function derivative(token2) {
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = generate$1(token2[colorKey]);
    return new Array(10).fill(1).reduce((prev2, _2, i2) => {
      prev2[`${colorKey}-${i2 + 1}`] = colors[i2];
      return prev2;
    }, {});
  }).reduce((prev2, cur) => {
    prev2 = _extends(_extends({}, prev2), cur);
    return prev2;
  }, {});
  return _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, token2), colorPalettes), genColorMapToken(token2, {
    generateColorPalettes,
    generateNeutralColorPalettes
  })), genFontMapToken(token2.fontSize)), genSizeMapToken(token2)), genControlHeight(token2)), genCommonMapToken(token2));
}
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
  const {
    r: fR,
    g: fG,
    b: fB,
    a: originAlpha
  } = new TinyColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }
  const {
    r: bR,
    g: bG,
    b: bB
  } = new TinyColor(backgroundColor).toRgb();
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r2 = Math.round((fR - bR * (1 - fA)) / fA);
    const g2 = Math.round((fG - bG * (1 - fA)) / fA);
    const b2 = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r2) && isStableColor(g2) && isStableColor(b2)) {
      return new TinyColor({
        r: r2,
        g: g2,
        b: b2,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
    }
  }
  return new TinyColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
var __rest$5 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
function formatToken(derivativeToken) {
  const {
    override
  } = derivativeToken, restToken = __rest$5(derivativeToken, ["override"]);
  const overrideTokens = _extends({}, override);
  Object.keys(defaultSeedToken).forEach((token2) => {
    delete overrideTokens[token2];
  });
  const mergedToken = _extends(_extends({}, restToken), overrideTokens);
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
  const screenXXXL = 2e3;
  const aliasToken = _extends(_extends(_extends({}, mergedToken), {
    colorLink: mergedToken.colorInfoText,
    colorLinkHover: mergedToken.colorInfoHover,
    colorLinkActive: mergedToken.colorInfoActive,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeIcon: mergedToken.fontSizeSM,
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXXL - 1,
    screenXXXL,
    screenXXXLMin: screenXXXL,
    // FIXME: component box-shadow, should be removed
    boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
    boxShadowCard: `
      0 1px 2px -2px ${new TinyColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new TinyColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new TinyColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), overrideTokens);
  return aliasToken;
}
const roundedArrow = (width, innerRadius, outerRadius, bgColor, boxShadow) => {
  const unitWidth = width / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = outerRadius * 1 / Math.sqrt(2);
  const by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - innerRadius * (1 / Math.sqrt(2));
  const cy = outerRadius * (Math.sqrt(2) - 1) + innerRadius * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + outerRadius * (Math.sqrt(2) - 2);
  const polygonOffset = outerRadius * (Math.sqrt(2) - 1);
  return {
    pointerEvents: "none",
    width,
    height: width,
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      width: shadowWidth,
      height: shadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${innerRadius}px 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    },
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width,
      height: width / 2,
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [`polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`, `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`]
      },
      content: '""'
    }
  };
};
function genPresetColor(token2, genCss) {
  return PresetColors.reduce((prev2, colorKey) => {
    const lightColor = token2[`${colorKey}-1`];
    const lightBorderColor = token2[`${colorKey}-3`];
    const darkColor = token2[`${colorKey}-6`];
    const textColor = token2[`${colorKey}-7`];
    return _extends(_extends({}, prev2), genCss(colorKey, {
      lightColor,
      lightBorderColor,
      darkColor,
      textColor
    }));
  }, {});
}
const resetComponent = (token2) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token2.colorText,
  fontSize: token2.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token2.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: token2.fontFamily
});
const genLinkStyle = (token2) => ({
  a: {
    color: token2.colorLink,
    textDecoration: token2.linkDecoration,
    backgroundColor: "transparent",
    outline: "none",
    cursor: "pointer",
    transition: `color ${token2.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    "&:hover": {
      color: token2.colorLinkHover
    },
    "&:active": {
      color: token2.colorLinkActive
    },
    [`&:active,
  &:hover`]: {
      textDecoration: token2.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: token2.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: token2.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
});
const genCommonStyle = (token2, componentPrefixCls) => {
  const {
    fontFamily,
    fontSize
  } = token2;
  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      boxSizing: "border-box",
      "&::before, &::after": {
        boxSizing: "border-box"
      },
      [rootPrefixSelector]: {
        boxSizing: "border-box",
        "&::before, &::after": {
          boxSizing: "border-box"
        }
      }
    }
  };
};
const genFocusOutline = (token2) => ({
  outline: `${token2.lineWidthBold}px solid ${token2.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: "outline-offset 0s, outline 0s"
});
const genFocusStyle = (token2) => ({
  "&:focus-visible": _extends({}, genFocusOutline(token2))
});
function genComponentStyleHook(component, styleFn, getDefaultToken) {
  return (_prefixCls) => {
    const prefixCls = computed(() => _prefixCls === null || _prefixCls === void 0 ? void 0 : _prefixCls.value);
    const [theme, token2, hashId] = useToken();
    const {
      getPrefixCls,
      iconPrefixCls
    } = useConfigContextInject();
    const rootPrefixCls = computed(() => getPrefixCls());
    const sharedInfo = computed(() => {
      return {
        theme: theme.value,
        token: token2.value,
        hashId: hashId.value,
        path: ["Shared", rootPrefixCls.value]
      };
    });
    useStyleRegister(sharedInfo, () => [{
      // Link
      "&": genLinkStyle(token2.value)
    }]);
    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token2.value,
        hashId: hashId.value,
        path: [component, prefixCls.value, iconPrefixCls.value]
      };
    });
    return [useStyleRegister(componentInfo, () => {
      const {
        token: proxyToken,
        flush
      } = statisticToken(token2.value);
      const defaultComponentToken = typeof getDefaultToken === "function" ? getDefaultToken(proxyToken) : getDefaultToken;
      const mergedComponentToken = _extends(_extends({}, defaultComponentToken), token2.value[component]);
      const componentCls = `.${prefixCls.value}`;
      const mergedToken = merge(proxyToken, {
        componentCls,
        prefixCls: prefixCls.value,
        iconCls: `.${iconPrefixCls.value}`,
        antCls: `.${rootPrefixCls.value}`
      }, mergedComponentToken);
      const styleInterpolation = styleFn(mergedToken, {
        hashId: hashId.value,
        prefixCls: prefixCls.value,
        rootPrefixCls: rootPrefixCls.value,
        iconPrefixCls: iconPrefixCls.value,
        overrideComponentToken: token2.value[component]
      });
      flush(component, mergedComponentToken);
      return [genCommonStyle(token2.value, prefixCls.value), styleInterpolation];
    }), hashId];
  };
}
const enableStatistic = typeof CSSINJS_STATISTIC !== "undefined";
let recording = true;
function merge() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  if (!enableStatistic) {
    return _extends({}, ...objs);
  }
  recording = false;
  const ret = {};
  objs.forEach((obj) => {
    const keys2 = Object.keys(obj);
    keys2.forEach((key) => {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => obj[key]
      });
    });
  });
  recording = true;
  return ret;
}
function noop$2() {
}
function statisticToken(token2) {
  let tokenKeys2;
  let proxy = token2;
  let flush = noop$2;
  if (enableStatistic) {
    tokenKeys2 = /* @__PURE__ */ new Set();
    proxy = new Proxy(token2, {
      get(obj, prop) {
        if (recording) {
          tokenKeys2.add(prop);
        }
        return obj[prop];
      }
    });
    flush = (componentName, componentToken) => {
      ({
        global: Array.from(tokenKeys2),
        component: componentToken
      });
    };
  }
  return {
    token: proxy,
    keys: tokenKeys2,
    flush
  };
}
const defaultTheme = createTheme(derivative);
const defaultConfig = {
  token: defaultSeedToken,
  hashed: true
};
const DesignTokenContextKey = Symbol("DesignTokenContext");
const globalDesignTokenApi = shallowRef();
const useDesignTokenProvider = (value) => {
  provide(DesignTokenContextKey, value);
  watch(value, () => {
    globalDesignTokenApi.value = unref(value);
    triggerRef(globalDesignTokenApi);
  }, {
    immediate: true,
    deep: true
  });
};
defineComponent({
  props: {
    value: objectType()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useDesignTokenProvider(computed(() => props.value));
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
function useToken() {
  const designTokenContext = inject(DesignTokenContextKey, computed(() => globalDesignTokenApi.value || defaultConfig));
  const salt = computed(() => `${version}-${designTokenContext.value.hashed || ""}`);
  const mergedTheme = computed(() => designTokenContext.value.theme || defaultTheme);
  const cacheToken = useCacheToken(mergedTheme, computed(() => [defaultSeedToken, designTokenContext.value.token]), computed(() => ({
    salt: salt.value,
    override: _extends({
      override: designTokenContext.value.token
    }, designTokenContext.value.components),
    formatToken
  })));
  return [mergedTheme, computed(() => cacheToken.value[0]), computed(() => designTokenContext.value.hashed ? cacheToken.value[1] : "")];
}
const Empty$2 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token2] = useToken();
    const themeStyle = computed(() => {
      const bgColor = new TinyColor(token2.value.colorBgBase);
      if (bgColor.toHsl().l < 0.5) {
        return {
          opacity: 0.65
        };
      }
      return {};
    });
    return () => createVNode("svg", {
      "style": themeStyle.value,
      "width": "184",
      "height": "152",
      "viewBox": "0 0 184 152",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("g", {
      "transform": "translate(24 31.67)"
    }, [createVNode("ellipse", {
      "fill-opacity": ".8",
      "fill": "#F5F5F7",
      "cx": "67.797",
      "cy": "106.89",
      "rx": "67.797",
      "ry": "12.668"
    }, null), createVNode("path", {
      "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",
      "fill": "#AEB8C2"
    }, null), createVNode("path", {
      "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
      "fill": "url(#linearGradient-1)",
      "transform": "translate(13.56)"
    }, null), createVNode("path", {
      "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",
      "fill": "#F5F5F7"
    }, null), createVNode("path", {
      "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",
      "fill": "#DCE0E6"
    }, null)]), createVNode("path", {
      "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",
      "fill": "#DCE0E6"
    }, null), createVNode("g", {
      "transform": "translate(149.65 15.383)",
      "fill": "#FFF"
    }, [createVNode("ellipse", {
      "cx": "20.654",
      "cy": "3.167",
      "rx": "2.849",
      "ry": "2.815"
    }, null), createVNode("path", {
      "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
    }, null)])])]);
  }
});
Empty$2.PRESENTED_IMAGE_DEFAULT = true;
const DefaultEmptyImg = Empty$2;
const Simple = defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token2] = useToken();
    const color = computed(() => {
      const {
        colorFill,
        colorFillTertiary,
        colorFillQuaternary,
        colorBgContainer
      } = token2.value;
      return {
        borderColor: new TinyColor(colorFill).onBackground(colorBgContainer).toHexString(),
        shadowColor: new TinyColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
        contentColor: new TinyColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
      };
    });
    return () => createVNode("svg", {
      "width": "64",
      "height": "41",
      "viewBox": "0 0 64 41",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "transform": "translate(0 1)",
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("ellipse", {
      "fill": color.value.shadowColor,
      "cx": "32",
      "cy": "33",
      "rx": "32",
      "ry": "7"
    }, null), createVNode("g", {
      "fill-rule": "nonzero",
      "stroke": color.value.borderColor
    }, [createVNode("path", {
      "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
    }, null), createVNode("path", {
      "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
      "fill": color.value.contentColor
    }, null)])])]);
  }
});
Simple.PRESENTED_IMAGE_SIMPLE = true;
const SimpleEmptyImg = Simple;
const genSharedEmptyStyle = (token2) => {
  const {
    componentCls,
    margin,
    marginXS,
    marginXL,
    fontSize,
    lineHeight
  } = token2;
  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: "center",
      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        height: token2.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token2.opacityImage,
        img: {
          height: "100%"
        },
        svg: {
          height: "100%",
          margin: "auto"
        }
      },
      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin
      },
      "&-normal": {
        marginBlock: marginXL,
        color: token2.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token2.emptyImgHeightMD
        }
      },
      "&-small": {
        marginBlock: marginXS,
        color: token2.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token2.emptyImgHeightSM
        }
      }
    }
  };
};
const useStyle$7 = genComponentStyleHook("Empty", (token2) => {
  const {
    componentCls,
    controlHeightLG
  } = token2;
  const emptyToken = merge(token2, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875
  });
  return [genSharedEmptyStyle(emptyToken)];
});
var __rest$4 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
const defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);
const simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);
const emptyProps = () => ({
  prefixCls: String,
  imageStyle: objectType(),
  image: anyType(),
  description: anyType()
});
const Empty = defineComponent({
  name: "AEmpty",
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, _ref) {
    let {
      slots = {},
      attrs
    } = _ref;
    const {
      direction,
      prefixCls: prefixClsRef
    } = useConfigInject("empty", props);
    const [wrapSSR, hashId] = useStyle$7(prefixClsRef);
    return () => {
      var _a2, _b2;
      const prefixCls = prefixClsRef.value;
      const _c = _extends(_extends({}, props), attrs), {
        image = ((_a2 = slots.image) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || defaultEmptyImg,
        description = ((_b2 = slots.description) === null || _b2 === void 0 ? void 0 : _b2.call(slots)) || void 0,
        imageStyle,
        class: className = ""
      } = _c, restProps = __rest$4(_c, ["image", "description", "imageStyle", "class"]);
      return wrapSSR(createVNode(LocaleReceiver, {
        "componentName": "Empty",
        "children": (locale2) => {
          const des = typeof description !== "undefined" ? description : locale2.description;
          const alt = typeof des === "string" ? des : "empty";
          let imageNode = null;
          if (typeof image === "string") {
            imageNode = createVNode("img", {
              "alt": alt,
              "src": image
            }, null);
          } else {
            imageNode = image;
          }
          return createVNode("div", _objectSpread2$1({
            "class": classNames(prefixCls, className, hashId.value, {
              [`${prefixCls}-normal`]: image === simpleEmptyImg,
              [`${prefixCls}-rtl`]: direction.value === "rtl"
            })
          }, restProps), [createVNode("div", {
            "class": `${prefixCls}-image`,
            "style": imageStyle
          }, [imageNode]), des && createVNode("p", {
            "class": `${prefixCls}-description`
          }, [des]), slots.default && createVNode("div", {
            "class": `${prefixCls}-footer`
          }, [filterEmpty(slots.default())])]);
        }
      }, null));
    };
  }
});
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
const Empty$1 = withInstall(Empty);
const DefaultRenderEmpty = (props) => {
  const {
    prefixCls
  } = useConfigInject("empty", props);
  const renderHtml = (componentName) => {
    switch (componentName) {
      case "Table":
      case "List":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
          "class": `${prefixCls.value}-small`
        }, null);
      default:
        return createVNode(Empty$1, null, null);
    }
  };
  return renderHtml(props.componentName);
};
const SizeContextKey = Symbol("SizeContextKey");
const useInjectSize = () => {
  return inject(SizeContextKey, ref(void 0));
};
const useConfigInject = (name, props) => {
  const sizeContext = useInjectSize();
  const disabledContext = useInjectDisabled();
  const configProvider = inject(configProviderKey, _extends(_extends({}, defaultConfigProvider), {
    renderEmpty: (name2) => h$1(DefaultRenderEmpty, {
      componentName: name2
    })
  }));
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const direction = computed(() => {
    var _a2, _b2;
    return (_a2 = props.direction) !== null && _a2 !== void 0 ? _a2 : (_b2 = configProvider.direction) === null || _b2 === void 0 ? void 0 : _b2.value;
  });
  const iconPrefixCls = computed(() => {
    var _a2;
    return (_a2 = props.iconPrefixCls) !== null && _a2 !== void 0 ? _a2 : configProvider.iconPrefixCls.value;
  });
  const rootPrefixCls = computed(() => configProvider.getPrefixCls());
  const autoInsertSpaceInButton = computed(() => {
    var _a2;
    return (_a2 = configProvider.autoInsertSpaceInButton) === null || _a2 === void 0 ? void 0 : _a2.value;
  });
  const renderEmpty = configProvider.renderEmpty;
  const space = configProvider.space;
  const pageHeader = configProvider.pageHeader;
  const form = configProvider.form;
  const getTargetContainer = computed(() => {
    var _a2, _b2;
    return (_a2 = props.getTargetContainer) !== null && _a2 !== void 0 ? _a2 : (_b2 = configProvider.getTargetContainer) === null || _b2 === void 0 ? void 0 : _b2.value;
  });
  const getPopupContainer = computed(() => {
    var _a2, _b2, _c;
    return (_b2 = (_a2 = props.getContainer) !== null && _a2 !== void 0 ? _a2 : props.getPopupContainer) !== null && _b2 !== void 0 ? _b2 : (_c = configProvider.getPopupContainer) === null || _c === void 0 ? void 0 : _c.value;
  });
  const dropdownMatchSelectWidth = computed(() => {
    var _a2, _b2;
    return (_a2 = props.dropdownMatchSelectWidth) !== null && _a2 !== void 0 ? _a2 : (_b2 = configProvider.dropdownMatchSelectWidth) === null || _b2 === void 0 ? void 0 : _b2.value;
  });
  const virtual = computed(() => {
    var _a2;
    return (props.virtual === void 0 ? ((_a2 = configProvider.virtual) === null || _a2 === void 0 ? void 0 : _a2.value) !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  const size = computed(() => props.size || sizeContext.value);
  const autocomplete = computed(() => {
    var _a2, _b2, _c;
    return (_a2 = props.autocomplete) !== null && _a2 !== void 0 ? _a2 : (_c = (_b2 = configProvider.input) === null || _b2 === void 0 ? void 0 : _b2.value) === null || _c === void 0 ? void 0 : _c.autocomplete;
  });
  const disabled = computed(() => {
    var _a2;
    return (_a2 = props.disabled) !== null && _a2 !== void 0 ? _a2 : disabledContext.value;
  });
  const csp = computed(() => {
    var _a2;
    return (_a2 = props.csp) !== null && _a2 !== void 0 ? _a2 : configProvider.csp;
  });
  const wave = computed(() => {
    var _a2, _b2;
    return (_a2 = props.wave) !== null && _a2 !== void 0 ? _a2 : (_b2 = configProvider.wave) === null || _b2 === void 0 ? void 0 : _b2.value;
  });
  return {
    configProvider,
    prefixCls,
    direction,
    size,
    getTargetContainer,
    getPopupContainer,
    space,
    pageHeader,
    form,
    autoInsertSpaceInButton,
    renderEmpty,
    virtual,
    dropdownMatchSelectWidth,
    rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete,
    csp,
    iconPrefixCls,
    disabled,
    select: configProvider.select,
    wave
  };
};
function easeInOutCubic(t2, b2, c2, d2) {
  const cc = c2 - b2;
  t2 /= d2 / 2;
  if (t2 < 1) {
    return cc / 2 * t2 * t2 * t2 + b2;
  }
  return cc / 2 * ((t2 -= 2) * t2 * t2 + 2) + b2;
}
function isWindow$1(obj) {
  return obj !== null && obj !== void 0 && obj === obj.window;
}
function getScroll$1(target, top) {
  {
    return 0;
  }
}
function scrollTo(y2) {
  let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    getContainer: getContainer2 = () => void 0,
    callback,
    duration = 450
  } = options;
  const container = getContainer2();
  const scrollTop = getScroll$1();
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y2, duration);
    if (isWindow$1(container)) {
      container.scrollTo((void 0).pageXOffset, nextScrollTop);
    } else if (container instanceof Document || container.constructor.name === "HTMLDocument") {
      container.documentElement.scrollTop = nextScrollTop;
    } else {
      container.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      wrapperRaf(frameFunc);
    } else if (typeof callback === "function") {
      callback();
    }
  };
  wrapperRaf(frameFunc);
}
function e(e2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var r2 = t2[n2];
    r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
  }
}
function t(t2, n2, r2) {
  return n2 && e(t2.prototype, n2), r2 && e(t2, r2), t2;
}
function n() {
  return (n = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }).apply(this, arguments);
}
function r(e2, t2) {
  e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, e2.__proto__ = t2;
}
function i(e2, t2) {
  if (null == e2)
    return {};
  var n2, r2, i2 = {}, o2 = Object.keys(e2);
  for (r2 = 0; r2 < o2.length; r2++)
    t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e2[n2]);
  return i2;
}
function o(e2) {
  return 1 == (null != (t2 = e2) && "object" == typeof t2 && false === Array.isArray(t2)) && "[object Object]" === Object.prototype.toString.call(e2);
  var t2;
}
var u = Object.prototype, a = u.toString, f = u.hasOwnProperty, c = /^\s*function (\w+)/;
function l(e2) {
  var t2, n2 = null !== (t2 = null == e2 ? void 0 : e2.type) && void 0 !== t2 ? t2 : e2;
  if (n2) {
    var r2 = n2.toString().match(c);
    return r2 ? r2[1] : "";
  }
  return "";
}
var s = function(e2) {
  var t2, n2;
  return false !== o(e2) && "function" == typeof (t2 = e2.constructor) && false !== o(n2 = t2.prototype) && false !== n2.hasOwnProperty("isPrototypeOf");
}, v = function(e2) {
  return e2;
}, y = v;
var d = function(e2, t2) {
  return f.call(e2, t2);
}, h = Number.isInteger || function(e2) {
  return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2;
}, b = Array.isArray || function(e2) {
  return "[object Array]" === a.call(e2);
}, O = function(e2) {
  return "[object Function]" === a.call(e2);
}, g = function(e2) {
  return s(e2) && d(e2, "_vueTypes_name");
}, m = function(e2) {
  return s(e2) && (d(e2, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t2) {
    return d(e2, t2);
  }));
};
function j(e2, t2) {
  return Object.defineProperty(e2.bind(t2), "__original", { value: e2 });
}
function _(e2, t2, n2) {
  var r2;
  void 0 === n2 && (n2 = false);
  var i2 = true, o2 = "";
  r2 = s(e2) ? e2 : { type: e2 };
  var u2 = g(r2) ? r2._vueTypes_name + " - " : "";
  if (m(r2) && null !== r2.type) {
    if (void 0 === r2.type || true === r2.type)
      return i2;
    if (!r2.required && void 0 === t2)
      return i2;
    b(r2.type) ? (i2 = r2.type.some(function(e3) {
      return true === _(e3, t2, true);
    }), o2 = r2.type.map(function(e3) {
      return l(e3);
    }).join(" or ")) : i2 = "Array" === (o2 = l(r2)) ? b(t2) : "Object" === o2 ? s(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function(e3) {
      if (null == e3)
        return "";
      var t3 = e3.constructor.toString().match(c);
      return t3 ? t3[1] : "";
    }(t2) === o2 : t2 instanceof r2.type;
  }
  if (!i2) {
    var a2 = u2 + 'value "' + t2 + '" should be of type "' + o2 + '"';
    return false === n2 ? (y(a2), false) : a2;
  }
  if (d(r2, "validator") && O(r2.validator)) {
    var f2 = y, v2 = [];
    if (y = function(e3) {
      v2.push(e3);
    }, i2 = r2.validator(t2), y = f2, !i2) {
      var p = (v2.length > 1 ? "* " : "") + v2.join("\n* ");
      return v2.length = 0, false === n2 ? (y(p), i2) : p;
    }
  }
  return i2;
}
function T(e2, t2) {
  var n2 = Object.defineProperties(t2, { _vueTypes_name: { value: e2, writable: true }, isRequired: { get: function() {
    return this.required = true, this;
  } }, def: { value: function(e3) {
    return void 0 !== e3 || this.default ? O(e3) || true === _(this, e3, true) ? (this.default = b(e3) ? function() {
      return [].concat(e3);
    } : s(e3) ? function() {
      return Object.assign({}, e3);
    } : e3, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e3 + '"'), this) : this;
  } } }), r2 = n2.validator;
  return O(r2) && (n2.validator = j(r2, n2)), n2;
}
function w(e2, t2) {
  var n2 = T(e2, t2);
  return Object.defineProperty(n2, "validate", { value: function(e3) {
    return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e3, this), this;
  } });
}
function k(e2, t2, n2) {
  var r2, o2, u2 = (r2 = t2, o2 = {}, Object.getOwnPropertyNames(r2).forEach(function(e3) {
    o2[e3] = Object.getOwnPropertyDescriptor(r2, e3);
  }), Object.defineProperties({}, o2));
  if (u2._vueTypes_name = e2, !s(n2))
    return u2;
  var a2, f2, c2 = n2.validator, l2 = i(n2, ["validator"]);
  if (O(c2)) {
    var v2 = u2.validator;
    v2 && (v2 = null !== (f2 = (a2 = v2).__original) && void 0 !== f2 ? f2 : a2), u2.validator = j(v2 ? function(e3) {
      return v2.call(this, e3) && c2.call(this, e3);
    } : c2, u2);
  }
  return Object.assign(u2, l2);
}
function P(e2) {
  return e2.replace(/^(?!\s*$)/gm, "  ");
}
var x = function() {
  return w("any", {});
}, A = function() {
  return w("function", { type: Function });
}, E = function() {
  return w("boolean", { type: Boolean });
}, N = function() {
  return w("string", { type: String });
}, q = function() {
  return w("number", { type: Number });
}, S = function() {
  return w("array", { type: Array });
}, V = function() {
  return w("object", { type: Object });
}, F = function() {
  return T("integer", { type: Number, validator: function(e2) {
    return h(e2);
  } });
}, D = function() {
  return T("symbol", { validator: function(e2) {
    return "symbol" == typeof e2;
  } });
};
function L(e2, t2) {
  if (void 0 === t2 && (t2 = "custom validation failed"), "function" != typeof e2)
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return T(e2.name || "<<anonymous function>>", { validator: function(n2) {
    var r2 = e2(n2);
    return r2 || y(this._vueTypes_name + " - " + t2), r2;
  } });
}
function Y(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t2 = 'oneOf - value should be one of "' + e2.join('", "') + '".', n2 = e2.reduce(function(e3, t3) {
    if (null != t3) {
      var n3 = t3.constructor;
      -1 === e3.indexOf(n3) && e3.push(n3);
    }
    return e3;
  }, []);
  return T("oneOf", { type: n2.length > 0 ? n2 : void 0, validator: function(n3) {
    var r2 = -1 !== e2.indexOf(n3);
    return r2 || y(t2), r2;
  } });
}
function B(e2) {
  if (!b(e2))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t2 = false, n2 = [], r2 = 0; r2 < e2.length; r2 += 1) {
    var i2 = e2[r2];
    if (m(i2)) {
      if (g(i2) && "oneOf" === i2._vueTypes_name) {
        n2 = n2.concat(i2.type);
        continue;
      }
      if (O(i2.validator) && (t2 = true), true !== i2.type && i2.type) {
        n2 = n2.concat(i2.type);
        continue;
      }
    }
    n2.push(i2);
  }
  return n2 = n2.filter(function(e3, t3) {
    return n2.indexOf(e3) === t3;
  }), T("oneOfType", t2 ? { type: n2, validator: function(t3) {
    var n3 = [], r3 = e2.some(function(e3) {
      var r4 = _(g(e3) && "oneOf" === e3._vueTypes_name ? e3.type || null : e3, t3, true);
      return "string" == typeof r4 && n3.push(r4), true === r4;
    });
    return r3 || y("oneOfType - provided value does not match any of the " + n3.length + " passed-in validators:\n" + P(n3.join("\n"))), r3;
  } } : { type: n2 });
}
function I(e2) {
  return T("arrayOf", { type: Array, validator: function(t2) {
    var n2, r2 = t2.every(function(t3) {
      return true === (n2 = _(e2, t3, true));
    });
    return r2 || y("arrayOf - value validation error:\n" + P(n2)), r2;
  } });
}
function J(e2) {
  return T("instanceOf", { type: e2 });
}
function M(e2) {
  return T("objectOf", { type: Object, validator: function(t2) {
    var n2, r2 = Object.keys(t2).every(function(r3) {
      return true === (n2 = _(e2, t2[r3], true));
    });
    return r2 || y("objectOf - value validation error:\n" + P(n2)), r2;
  } });
}
function R(e2) {
  var t2 = Object.keys(e2), n2 = t2.filter(function(t3) {
    var n3;
    return !!(null === (n3 = e2[t3]) || void 0 === n3 ? void 0 : n3.required);
  }), r2 = T("shape", { type: Object, validator: function(r3) {
    var i2 = this;
    if (!s(r3))
      return false;
    var o2 = Object.keys(r3);
    if (n2.length > 0 && n2.some(function(e3) {
      return -1 === o2.indexOf(e3);
    })) {
      var u2 = n2.filter(function(e3) {
        return -1 === o2.indexOf(e3);
      });
      return y(1 === u2.length ? 'shape - required property "' + u2[0] + '" is not defined.' : 'shape - required properties "' + u2.join('", "') + '" are not defined.'), false;
    }
    return o2.every(function(n3) {
      if (-1 === t2.indexOf(n3))
        return true === i2._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n3 + '" property. Allowed keys: "' + t2.join('", "') + '".'), false);
      var o3 = _(e2[n3], r3[n3], true);
      return "string" == typeof o3 && y('shape - "' + n3 + '" property validation error:\n ' + P(o3)), true === o3;
    });
  } });
  return Object.defineProperty(r2, "_vueTypes_isLoose", { writable: true, value: false }), Object.defineProperty(r2, "loose", { get: function() {
    return this._vueTypes_isLoose = true, this;
  } }), r2;
}
var $ = function() {
  function e2() {
  }
  return e2.extend = function(e3) {
    var t2 = this;
    if (b(e3))
      return e3.forEach(function(e4) {
        return t2.extend(e4);
      }), this;
    var n2 = e3.name, r2 = e3.validate, o2 = void 0 !== r2 && r2, u2 = e3.getter, a2 = void 0 !== u2 && u2, f2 = i(e3, ["name", "validate", "getter"]);
    if (d(this, n2))
      throw new TypeError('[VueTypes error]: Type "' + n2 + '" already defined');
    var c2, l2 = f2.type;
    return g(l2) ? (delete f2.type, Object.defineProperty(this, n2, a2 ? { get: function() {
      return k(n2, l2, f2);
    } } : { value: function() {
      var e4, t3 = k(n2, l2, f2);
      return t3.validator && (t3.validator = (e4 = t3.validator).bind.apply(e4, [t3].concat([].slice.call(arguments)))), t3;
    } })) : (c2 = a2 ? { get: function() {
      var e4 = Object.assign({}, f2);
      return o2 ? w(n2, e4) : T(n2, e4);
    }, enumerable: true } : { value: function() {
      var e4, t3, r3 = Object.assign({}, f2);
      return e4 = o2 ? w(n2, r3) : T(n2, r3), r3.validator && (e4.validator = (t3 = r3.validator).bind.apply(t3, [e4].concat([].slice.call(arguments)))), e4;
    }, enumerable: true }, Object.defineProperty(this, n2, c2));
  }, t(e2, null, [{ key: "any", get: function() {
    return x();
  } }, { key: "func", get: function() {
    return A().def(this.defaults.func);
  } }, { key: "bool", get: function() {
    return E().def(this.defaults.bool);
  } }, { key: "string", get: function() {
    return N().def(this.defaults.string);
  } }, { key: "number", get: function() {
    return q().def(this.defaults.number);
  } }, { key: "array", get: function() {
    return S().def(this.defaults.array);
  } }, { key: "object", get: function() {
    return V().def(this.defaults.object);
  } }, { key: "integer", get: function() {
    return F().def(this.defaults.integer);
  } }, { key: "symbol", get: function() {
    return D();
  } }]), e2;
}();
function z(e2) {
  var i2;
  return void 0 === e2 && (e2 = { func: function() {
  }, bool: true, string: "", number: 0, array: function() {
    return [];
  }, object: function() {
    return {};
  }, integer: 0 }), (i2 = function(i3) {
    function o2() {
      return i3.apply(this, arguments) || this;
    }
    return r(o2, i3), t(o2, null, [{ key: "sensibleDefaults", get: function() {
      return n({}, this.defaults);
    }, set: function(t2) {
      this.defaults = false !== t2 ? n({}, true !== t2 ? t2 : e2) : {};
    } }]), o2;
  }($)).defaults = n({}, e2), i2;
}
$.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = { validate: function(e2, t2) {
  return true === _(t2, e2, true);
}, toType: function(e2, t2, n2) {
  return void 0 === n2 && (n2 = false), n2 ? w(e2, t2) : T(e2, t2);
} };
(function(e2) {
  function t2() {
    return e2.apply(this, arguments) || this;
  }
  return r(t2, e2), t2;
})(z());
const PropTypes = z({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
PropTypes.extend([{
  name: "looseBool",
  getter: true,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: true,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: true,
  type: null
}]);
const devWarning = (valid, component, message) => {
  warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
};
function returnEmptyString() {
  return "";
}
function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }
  return (void 0).document;
}
function noop$1() {
}
const triggerProps = () => ({
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def([]),
  showAction: PropTypes.any.def([]),
  hideAction: PropTypes.any.def([]),
  getPopupClassNameFromAlign: PropTypes.any.def(returnEmptyString),
  onPopupVisibleChange: Function,
  afterPopupVisibleChange: PropTypes.func.def(noop$1),
  popup: PropTypes.any,
  popupStyle: {
    type: Object,
    default: void 0
  },
  prefixCls: PropTypes.string.def("rc-trigger-popup"),
  popupClassName: PropTypes.string.def(""),
  popupPlacement: String,
  builtinPlacements: PropTypes.object,
  popupTransitionName: String,
  popupAnimation: PropTypes.any,
  mouseEnterDelay: PropTypes.number.def(0),
  mouseLeaveDelay: PropTypes.number.def(0.1),
  zIndex: Number,
  focusDelay: PropTypes.number.def(0),
  blurDelay: PropTypes.number.def(0.15),
  getPopupContainer: Function,
  getDocument: PropTypes.func.def(returnDocument),
  forceRender: {
    type: Boolean,
    default: void 0
  },
  destroyPopupOnHide: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  // onPopupAlign: PropTypes.func.def(noop),
  popupAlign: PropTypes.object.def(() => ({})),
  popupVisible: {
    type: Boolean,
    default: void 0
  },
  defaultPopupVisible: {
    type: Boolean,
    default: false
  },
  maskTransitionName: String,
  maskAnimation: String,
  stretch: String,
  alignPoint: {
    type: Boolean,
    default: void 0
  },
  autoDestroy: {
    type: Boolean,
    default: false
  },
  mobile: Object,
  getTriggerDOMNode: Function
});
const innerProps = {
  visible: Boolean,
  prefixCls: String,
  zIndex: Number,
  destroyPopupOnHide: Boolean,
  forceRender: Boolean,
  // Legacy Motion
  animation: [String, Object],
  transitionName: String,
  // Measure
  stretch: {
    type: String
  },
  // Align
  align: {
    type: Object
  },
  point: {
    type: Object
  },
  getRootDomNode: {
    type: Function
  },
  getClassNameFromAlign: {
    type: Function
  },
  onAlign: {
    type: Function
  },
  onMouseenter: {
    type: Function
  },
  onMouseleave: {
    type: Function
  },
  onMousedown: {
    type: Function
  },
  onTouchstart: {
    type: Function
  }
};
const mobileProps = _extends(_extends({}, innerProps), {
  mobile: {
    type: Object
  }
});
const popupProps = _extends(_extends({}, innerProps), {
  mask: Boolean,
  mobile: {
    type: Object
  },
  maskAnimation: String,
  maskTransitionName: String
});
function getMotion(_ref) {
  let {
    prefixCls,
    animation,
    transitionName
  } = _ref;
  if (animation) {
    return {
      name: `${prefixCls}-${animation}`
    };
  }
  if (transitionName) {
    return {
      name: transitionName
    };
  }
  return {};
}
function Mask(props) {
  const {
    prefixCls,
    visible,
    zIndex,
    mask,
    maskAnimation,
    maskTransitionName
  } = props;
  if (!mask) {
    return null;
  }
  let motion = {};
  if (maskTransitionName || maskAnimation) {
    motion = getMotion({
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    });
  }
  return createVNode(Transition, _objectSpread2$1({
    "appear": true
  }, motion), {
    default: () => [withDirectives(createVNode("div", {
      "style": {
        zIndex
      },
      "class": `${prefixCls}-mask`
    }, null), [[resolveDirective("if"), visible]])]
  });
}
Mask.displayName = "Mask";
const MobilePopupInner = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MobilePopupInner",
  inheritAttrs: false,
  props: mobileProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const elementRef = ref();
    expose({
      forceAlign: () => {
      },
      getElement: () => elementRef.value
    });
    return () => {
      var _a2;
      const {
        zIndex,
        visible,
        prefixCls,
        mobile: {
          popupClassName,
          popupStyle,
          popupMotion = {},
          popupRender
        } = {}
      } = props;
      const mergedStyle = _extends({
        zIndex
      }, popupStyle);
      let childNode = flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      if (popupRender) {
        childNode = popupRender(childNode);
      }
      const mergedClassName = classNames(prefixCls, popupClassName);
      return createVNode(Transition, _objectSpread2$1({
        "ref": elementRef
      }, popupMotion), {
        default: () => [visible ? createVNode("div", {
          "class": mergedClassName,
          "style": mergedStyle
        }, [childNode]) : null]
      });
    };
  }
});
const useVisibleStatus = (visible, doMeasure) => {
  const status = shallowRef(null);
  const rafRef = shallowRef();
  const destroyRef = shallowRef(false);
  function setStatus(nextStatus) {
    if (!destroyRef.value) {
      status.value = nextStatus;
    }
  }
  function cancelRaf() {
    wrapperRaf.cancel(rafRef.value);
  }
  function goNextStatus(callback) {
    cancelRaf();
    rafRef.value = wrapperRaf(() => {
      let newStatus = status.value;
      switch (status.value) {
        case "align":
          newStatus = "motion";
          break;
        case "motion":
          newStatus = "stable";
          break;
      }
      setStatus(newStatus);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }
  watch(visible, () => {
    setStatus("measure");
  }, {
    immediate: true,
    flush: "post"
  });
  return [status, goNextStatus];
};
const useStretchStyle = (stretch) => {
  const targetSize = shallowRef({
    width: 0,
    height: 0
  });
  function measureStretch(element) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const style = computed(() => {
    const sizeStyle = {};
    if (stretch.value) {
      const {
        width,
        height
      } = targetSize.value;
      if (stretch.value.indexOf("height") !== -1 && height) {
        sizeStyle.height = `${height}px`;
      } else if (stretch.value.indexOf("minHeight") !== -1 && height) {
        sizeStyle.minHeight = `${height}px`;
      }
      if (stretch.value.indexOf("width") !== -1 && width) {
        sizeStyle.width = `${width}px`;
      } else if (stretch.value.indexOf("minWidth") !== -1 && width) {
        sizeStyle.minWidth = `${width}px`;
      }
    }
    return sizeStyle;
  });
  return [style, measureStretch];
};
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$b(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _defineProperty$b(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var vendorPrefix;
var jsCssMap = {
  Webkit: "-webkit-",
  Moz: "-moz-",
  // IE did it wrong again ...
  ms: "-ms-",
  O: "-o-"
};
function getVendorPrefix() {
  if (vendorPrefix !== void 0) {
    return vendorPrefix;
  }
  vendorPrefix = "";
  var style = (void 0).createElement("p").style;
  var testProp = "Transform";
  for (var key in jsCssMap) {
    if (key + testProp in style) {
      vendorPrefix = key;
    }
  }
  return vendorPrefix;
}
function getTransitionName$1() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "TransitionProperty") : "transitionProperty";
}
function getTransformName() {
  return getVendorPrefix() ? "".concat(getVendorPrefix(), "Transform") : "transform";
}
function setTransitionProperty(node2, value) {
  var name = getTransitionName$1();
  if (name) {
    node2.style[name] = value;
    if (name !== "transitionProperty") {
      node2.style.transitionProperty = value;
    }
  }
}
function setTransform(node2, value) {
  var name = getTransformName();
  if (name) {
    node2.style[name] = value;
    if (name !== "transform") {
      node2.style.transform = value;
    }
  }
}
function getTransitionProperty(node2) {
  return node2.style.transitionProperty || node2.style[getTransitionName$1()];
}
function getTransformXY(node2) {
  var style = (void 0).getComputedStyle(node2, null);
  var transform = style.getPropertyValue("transform") || style.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var matrix = transform.replace(/[^0-9\-.,]/g, "").split(",");
    return {
      x: parseFloat(matrix[12] || matrix[4], 0),
      y: parseFloat(matrix[13] || matrix[5], 0)
    };
  }
  return {
    x: 0,
    y: 0
  };
}
var matrix2d = /matrix\((.*)\)/;
var matrix3d = /matrix3d\((.*)\)/;
function setTransformXY(node2, xy) {
  var style = (void 0).getComputedStyle(node2, null);
  var transform = style.getPropertyValue("transform") || style.getPropertyValue(getTransformName());
  if (transform && transform !== "none") {
    var arr;
    var match2d = transform.match(matrix2d);
    if (match2d) {
      match2d = match2d[1];
      arr = match2d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[4] = xy.x;
      arr[5] = xy.y;
      setTransform(node2, "matrix(".concat(arr.join(","), ")"));
    } else {
      var match3d = transform.match(matrix3d)[1];
      arr = match3d.split(",").map(function(item) {
        return parseFloat(item, 10);
      });
      arr[12] = xy.x;
      arr[13] = xy.y;
      setTransform(node2, "matrix3d(".concat(arr.join(","), ")"));
    }
  } else {
    setTransform(node2, "translateX(".concat(xy.x, "px) translateY(").concat(xy.y, "px) translateZ(0)"));
  }
}
var getComputedStyleX;
function forceRelayout(elem) {
  var originalStyle = elem.style.display;
  elem.style.display = "none";
  elem.offsetHeight;
  elem.style.display = originalStyle;
}
function css(el2, name, v2) {
  var value = v2;
  if (_typeof(name) === "object") {
    for (var i2 in name) {
      if (name.hasOwnProperty(i2)) {
        css(el2, i2, name[i2]);
      }
    }
    return void 0;
  }
  if (typeof value !== "undefined") {
    if (typeof value === "number") {
      value = "".concat(value, "px");
    }
    el2.style[name] = value;
    return void 0;
  }
  return getComputedStyleX(el2, name);
}
function getClientPosition(elem) {
  var box;
  var x2;
  var y2;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  box = elem.getBoundingClientRect();
  x2 = Math.floor(box.left);
  y2 = Math.floor(box.top);
  x2 -= docElem.clientLeft || body.clientLeft || 0;
  y2 -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x2,
    top: y2
  };
}
function getScroll(w2, top) {
  var ret = w2["page".concat(top ? "Y" : "X", "Offset")];
  var method = "scroll".concat(top ? "Top" : "Left");
  if (typeof ret !== "number") {
    var d2 = w2.document;
    ret = d2.documentElement[method];
    if (typeof ret !== "number") {
      ret = d2.body[method];
    }
  }
  return ret;
}
function getScrollLeft(w2) {
  return getScroll(w2);
}
function getScrollTop(w2) {
  return getScroll(w2, true);
}
function getOffset$2(el2) {
  var pos = getClientPosition(el2);
  var doc = el2.ownerDocument;
  var w2 = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w2);
  pos.top += getScrollTop(w2);
  return pos;
}
function isWindow(obj) {
  return obj !== null && obj !== void 0 && obj == obj.window;
}
function getDocument(node2) {
  if (isWindow(node2)) {
    return node2.document;
  }
  if (node2.nodeType === 9) {
    return node2;
  }
  return node2.ownerDocument;
}
function getOffsetDirection(dir, option) {
  if (dir === "left") {
    return option.useCssRight ? "right" : dir;
  }
  return option.useCssBottom ? "bottom" : dir;
}
function oppositeOffsetDirection(dir) {
  if (dir === "left") {
    return "right";
  } else if (dir === "right") {
    return "left";
  } else if (dir === "top") {
    return "bottom";
  } else if (dir === "bottom") {
    return "top";
  }
}
function setLeftTop(elem, offset2, option) {
  if (css(elem, "position") === "static") {
    elem.style.position = "relative";
  }
  var presetH = -999;
  var presetV = -999;
  var horizontalProperty = getOffsetDirection("left", option);
  var verticalProperty = getOffsetDirection("top", option);
  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);
  if (horizontalProperty !== "left") {
    presetH = 999;
  }
  if (verticalProperty !== "top") {
    presetV = 999;
  }
  var originalTransition = "";
  var originalOffset = getOffset$2(elem);
  if ("left" in offset2 || "top" in offset2) {
    originalTransition = getTransitionProperty(elem) || "";
    setTransitionProperty(elem, "none");
  }
  if ("left" in offset2) {
    elem.style[oppositeHorizontalProperty] = "";
    elem.style[horizontalProperty] = "".concat(presetH, "px");
  }
  if ("top" in offset2) {
    elem.style[oppositeVerticalProperty] = "";
    elem.style[verticalProperty] = "".concat(presetV, "px");
  }
  forceRelayout(elem);
  var old = getOffset$2(elem);
  var originalStyle = {};
  for (var key in offset2) {
    if (offset2.hasOwnProperty(key)) {
      var dir = getOffsetDirection(key, option);
      var preset = key === "left" ? presetH : presetV;
      var off = originalOffset[key] - old[key];
      if (dir === key) {
        originalStyle[dir] = preset + off;
      } else {
        originalStyle[dir] = preset - off;
      }
    }
  }
  css(elem, originalStyle);
  forceRelayout(elem);
  if ("left" in offset2 || "top" in offset2) {
    setTransitionProperty(elem, originalTransition);
  }
  var ret = {};
  for (var _key in offset2) {
    if (offset2.hasOwnProperty(_key)) {
      var _dir = getOffsetDirection(_key, option);
      var _off = offset2[_key] - originalOffset[_key];
      if (_key === _dir) {
        ret[_dir] = originalStyle[_dir] + _off;
      } else {
        ret[_dir] = originalStyle[_dir] - _off;
      }
    }
  }
  css(elem, ret);
}
function setTransform$1(elem, offset2) {
  var originalOffset = getOffset$2(elem);
  var originalXY = getTransformXY(elem);
  var resultXY = {
    x: originalXY.x,
    y: originalXY.y
  };
  if ("left" in offset2) {
    resultXY.x = originalXY.x + offset2.left - originalOffset.left;
  }
  if ("top" in offset2) {
    resultXY.y = originalXY.y + offset2.top - originalOffset.top;
  }
  setTransformXY(elem, resultXY);
}
function setOffset(elem, offset2, option) {
  if (option.ignoreShake) {
    var oriOffset = getOffset$2(elem);
    var oLeft = oriOffset.left.toFixed(0);
    var oTop = oriOffset.top.toFixed(0);
    var tLeft = offset2.left.toFixed(0);
    var tTop = offset2.top.toFixed(0);
    if (oLeft === tLeft && oTop === tTop) {
      return;
    }
  }
  if (option.useCssRight || option.useCssBottom) {
    setLeftTop(elem, offset2, option);
  } else if (option.useCssTransform && getTransformName() in (void 0).body.style) {
    setTransform$1(elem, offset2);
  } else {
    setLeftTop(elem, offset2, option);
  }
}
function each(arr, fn) {
  for (var i2 = 0; i2 < arr.length; i2++) {
    fn(arr[i2]);
  }
}
function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, "boxSizing") === "border-box";
}
var BOX_MODELS = ["margin", "border", "padding"];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;
function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name;
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }
  callback.call(elem);
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}
function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop;
  var j2;
  var i2;
  for (j2 = 0; j2 < props.length; j2++) {
    prop = props[j2];
    if (prop) {
      for (i2 = 0; i2 < which.length; i2++) {
        var cssProp = void 0;
        if (prop === "border") {
          cssProp = "".concat(prop).concat(which[i2], "Width");
        } else {
          cssProp = prop + which[i2];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}
var domUtils = {
  getParent: function getParent(element) {
    var parent = element;
    do {
      if (parent.nodeType === 11 && parent.host) {
        parent = parent.host;
      } else {
        parent = parent.parentNode;
      }
    } while (parent && parent.nodeType !== 1 && parent.nodeType !== 9);
    return parent;
  }
};
each(["Width", "Height"], function(name) {
  domUtils["doc".concat(name)] = function(refWin) {
    var d2 = refWin.document;
    return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d2.documentElement["scroll".concat(name)],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d2.body["scroll".concat(name)],
      domUtils["viewport".concat(name)](d2)
    );
  };
  domUtils["viewport".concat(name)] = function(win) {
    var prop = "client".concat(name);
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop];
    return doc.compatMode === "CSS1Compat" && documentElementProp || body && body[prop] || documentElementProp;
  };
});
function getWH(elem, name, ex) {
  var extra = ex;
  if (isWindow(elem)) {
    return name === "width" ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === "width" ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  var borderBoxValue = name === "width" ? Math.floor(elem.getBoundingClientRect().width) : Math.floor(elem.getBoundingClientRect().height);
  var isBorderBox = isBorderBoxFn(elem);
  var cssBoxValue = 0;
  if (borderBoxValue === null || borderBoxValue === void 0 || borderBoxValue <= 0) {
    borderBoxValue = void 0;
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue === null || cssBoxValue === void 0 || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    cssBoxValue = Math.floor(parseFloat(cssBoxValue)) || 0;
  }
  if (extra === void 0) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  var borderBoxValueOrIsBorderBox = borderBoxValue !== void 0 || isBorderBox;
  var val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ["border", "padding"], which);
    }
    return cssBoxValue;
  } else if (borderBoxValueOrIsBorderBox) {
    if (extra === BORDER_INDEX) {
      return val;
    }
    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ["border"], which) : getPBMWidth(elem, ["margin"], which));
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which);
}
var cssShow = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function getWHIgnoreDisplay() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }
  var val;
  var elem = args[0];
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(void 0, args);
  } else {
    swap(elem, cssShow, function() {
      val = getWH.apply(void 0, args);
    });
  }
  return val;
}
each(["width", "height"], function(name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils["outer".concat(first)] = function(el2, includeMargin) {
    return el2 && getWHIgnoreDisplay(el2, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  var which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  domUtils[name] = function(elem, v2) {
    var val = v2;
    if (val !== void 0) {
      if (elem) {
        var isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ["padding", "border"], which);
        }
        return css(elem, name, val);
      }
      return void 0;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});
function mix(to, from2) {
  for (var i2 in from2) {
    if (from2.hasOwnProperty(i2)) {
      to[i2] = from2[i2];
    }
  }
  return to;
}
var utils = {
  getWindow: function getWindow(node2) {
    if (node2 && node2.document && node2.setTimeout) {
      return node2;
    }
    var doc = node2.ownerDocument || node2;
    return doc.defaultView || doc.parentWindow;
  },
  getDocument,
  offset: function offset(el2, value, option) {
    if (typeof value !== "undefined") {
      setOffset(el2, value, option || {});
    } else {
      return getOffset$2(el2);
    }
  },
  isWindow,
  each,
  css,
  clone: function clone(obj) {
    var i2;
    var ret = {};
    for (i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        ret[i2] = obj[i2];
      }
    }
    var overflow = obj.overflow;
    if (overflow) {
      for (i2 in obj) {
        if (obj.hasOwnProperty(i2)) {
          ret.overflow[i2] = obj.overflow[i2];
        }
      }
    }
    return ret;
  },
  mix,
  getWindowScrollLeft: function getWindowScrollLeft(w2) {
    return getScrollLeft(w2);
  },
  getWindowScrollTop: function getWindowScrollTop(w2) {
    return getScrollTop(w2);
  },
  merge: function merge2() {
    var ret = {};
    for (var i2 = 0; i2 < arguments.length; i2++) {
      utils.mix(ret, i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2]);
    }
    return ret;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
mix(utils, domUtils);
var getParent2 = utils.getParent;
function getOffsetParent(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return null;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent;
  var positionStyle = utils.css(element, "position");
  var skipStatic = positionStyle === "fixed" || positionStyle === "absolute";
  if (!skipStatic) {
    return element.nodeName.toLowerCase() === "html" ? null : getParent2(element);
  }
  for (parent = getParent2(element); parent && parent !== body && parent.nodeType !== 9; parent = getParent2(parent)) {
    positionStyle = utils.css(parent, "position");
    if (positionStyle !== "static") {
      return parent;
    }
  }
  return null;
}
var getParent$1 = utils.getParent;
function isAncestorFixed(element) {
  if (utils.isWindow(element) || element.nodeType === 9) {
    return false;
  }
  var doc = utils.getDocument(element);
  var body = doc.body;
  var parent = null;
  for (
    parent = getParent$1(element);
    // 修复元素位于 document.documentElement 下导致崩溃问题
    parent && parent !== body && parent !== doc;
    parent = getParent$1(parent)
  ) {
    var positionStyle = utils.css(parent, "position");
    if (positionStyle === "fixed") {
      return true;
    }
  }
  return false;
}
function getVisibleRectForElement(element, alwaysByViewport) {
  var visibleRect = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity
  };
  var el2 = getOffsetParent(element);
  var doc = utils.getDocument(element);
  var win = doc.defaultView || doc.parentWindow;
  var body = doc.body;
  var documentElement = doc.documentElement;
  while (el2) {
    if (((void 0).userAgent.indexOf("MSIE") === -1 || el2.clientWidth !== 0) && // body may have overflow set on it, yet we still get the entire
    // viewport. In some browsers, el.offsetParent may be
    // document.documentElement, so check for that too.
    el2 !== body && el2 !== documentElement && utils.css(el2, "overflow") !== "visible") {
      var pos = utils.offset(el2);
      pos.left += el2.clientLeft;
      pos.top += el2.clientTop;
      visibleRect.top = Math.max(visibleRect.top, pos.top);
      visibleRect.right = Math.min(
        visibleRect.right,
        // consider area without scrollBar
        pos.left + el2.clientWidth
      );
      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el2.clientHeight);
      visibleRect.left = Math.max(visibleRect.left, pos.left);
    } else if (el2 === body || el2 === documentElement) {
      break;
    }
    el2 = getOffsetParent(el2);
  }
  var originalPosition = null;
  if (!utils.isWindow(element) && element.nodeType !== 9) {
    originalPosition = element.style.position;
    var position2 = utils.css(element, "position");
    if (position2 === "absolute") {
      element.style.position = "fixed";
    }
  }
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  var documentWidth = documentElement.scrollWidth;
  var documentHeight = documentElement.scrollHeight;
  var bodyStyle = (void 0).getComputedStyle(body);
  if (bodyStyle.overflowX === "hidden") {
    documentWidth = win.innerWidth;
  }
  if (bodyStyle.overflowY === "hidden") {
    documentHeight = win.innerHeight;
  }
  if (element.style) {
    element.style.position = originalPosition;
  }
  if (alwaysByViewport || isAncestorFixed(element)) {
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    visibleRect.right = Math.min(visibleRect.right, scrollX + viewportWidth);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + viewportHeight);
  } else {
    var maxVisibleWidth = Math.max(documentWidth, scrollX + viewportWidth);
    visibleRect.right = Math.min(visibleRect.right, maxVisibleWidth);
    var maxVisibleHeight = Math.max(documentHeight, scrollY + viewportHeight);
    visibleRect.bottom = Math.min(visibleRect.bottom, maxVisibleHeight);
  }
  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
}
function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
  var pos = utils.clone(elFuturePos);
  var size = {
    width: elRegion.width,
    height: elRegion.height
  };
  if (overflow.adjustX && pos.left < visibleRect.left) {
    pos.left = visibleRect.left;
  }
  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
    size.width -= pos.left + size.width - visibleRect.right;
  }
  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
  }
  if (overflow.adjustY && pos.top < visibleRect.top) {
    pos.top = visibleRect.top;
  }
  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
    size.height -= pos.top + size.height - visibleRect.bottom;
  }
  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
  }
  return utils.mix(pos, size);
}
function getRegion(node2) {
  var offset2;
  var w2;
  var h2;
  if (!utils.isWindow(node2) && node2.nodeType !== 9) {
    offset2 = utils.offset(node2);
    w2 = utils.outerWidth(node2);
    h2 = utils.outerHeight(node2);
  } else {
    var win = utils.getWindow(node2);
    offset2 = {
      left: utils.getWindowScrollLeft(win),
      top: utils.getWindowScrollTop(win)
    };
    w2 = utils.viewportWidth(win);
    h2 = utils.viewportHeight(win);
  }
  offset2.width = w2;
  offset2.height = h2;
  return offset2;
}
function getAlignOffset(region, align) {
  var V2 = align.charAt(0);
  var H2 = align.charAt(1);
  var w2 = region.width;
  var h2 = region.height;
  var x2 = region.left;
  var y2 = region.top;
  if (V2 === "c") {
    y2 += h2 / 2;
  } else if (V2 === "b") {
    y2 += h2;
  }
  if (H2 === "c") {
    x2 += w2 / 2;
  } else if (H2 === "r") {
    x2 += w2;
  }
  return {
    left: x2,
    top: y2
  };
}
function getElFuturePos(elRegion, refNodeRegion, points, offset2, targetOffset2) {
  var p1 = getAlignOffset(refNodeRegion, points[1]);
  var p2 = getAlignOffset(elRegion, points[0]);
  var diff = [p2.left - p1.left, p2.top - p1.top];
  return {
    left: Math.round(elRegion.left - diff[0] + offset2[0] - targetOffset2[0]),
    top: Math.round(elRegion.top - diff[1] + offset2[1] - targetOffset2[1])
  };
}
function isFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
}
function isFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
}
function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
}
function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
}
function flip(points, reg, map) {
  var ret = [];
  utils.each(points, function(p) {
    ret.push(p.replace(reg, function(m2) {
      return map[m2];
    }));
  });
  return ret;
}
function flipOffset(offset2, index2) {
  offset2[index2] = -offset2[index2];
  return offset2;
}
function convertOffset(str, offsetLen) {
  var n2;
  if (/%$/.test(str)) {
    n2 = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
  } else {
    n2 = parseInt(str, 10);
  }
  return n2 || 0;
}
function normalizeOffset(offset2, el2) {
  offset2[0] = convertOffset(offset2[0], el2.width);
  offset2[1] = convertOffset(offset2[1], el2.height);
}
function doAlign(el2, tgtRegion, align, isTgtRegionVisible) {
  var points = align.points;
  var offset2 = align.offset || [0, 0];
  var targetOffset2 = align.targetOffset || [0, 0];
  var overflow = align.overflow;
  var source = align.source || el2;
  offset2 = [].concat(offset2);
  targetOffset2 = [].concat(targetOffset2);
  overflow = overflow || {};
  var newOverflowCfg = {};
  var fail = 0;
  var alwaysByViewport = !!(overflow && overflow.alwaysByViewport);
  var visibleRect = getVisibleRectForElement(source, alwaysByViewport);
  var elRegion = getRegion(source);
  normalizeOffset(offset2, elRegion);
  normalizeOffset(targetOffset2, tgtRegion);
  var elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset2);
  var newElRegion = utils.merge(elRegion, elFuturePos);
  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTgtRegionVisible) {
    if (overflow.adjustX) {
      if (isFailX(elFuturePos, elRegion, visibleRect)) {
        var newPoints = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
        var newOffset = flipOffset(offset2, 0);
        var newTargetOffset = flipOffset(targetOffset2, 0);
        var newElFuturePos = getElFuturePos(elRegion, tgtRegion, newPoints, newOffset, newTargetOffset);
        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = newPoints;
          offset2 = newOffset;
          targetOffset2 = newTargetOffset;
        }
      }
    }
    if (overflow.adjustY) {
      if (isFailY(elFuturePos, elRegion, visibleRect)) {
        var _newPoints = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
        var _newOffset = flipOffset(offset2, 1);
        var _newTargetOffset = flipOffset(targetOffset2, 1);
        var _newElFuturePos = getElFuturePos(elRegion, tgtRegion, _newPoints, _newOffset, _newTargetOffset);
        if (!isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
          fail = 1;
          points = _newPoints;
          offset2 = _newOffset;
          targetOffset2 = _newTargetOffset;
        }
      }
    }
    if (fail) {
      elFuturePos = getElFuturePos(elRegion, tgtRegion, points, offset2, targetOffset2);
      utils.mix(newElRegion, elFuturePos);
    }
    var isStillFailX = isFailX(elFuturePos, elRegion, visibleRect);
    var isStillFailY = isFailY(elFuturePos, elRegion, visibleRect);
    if (isStillFailX || isStillFailY) {
      var _newPoints2 = points;
      if (isStillFailX) {
        _newPoints2 = flip(points, /[lr]/gi, {
          l: "r",
          r: "l"
        });
      }
      if (isStillFailY) {
        _newPoints2 = flip(points, /[tb]/gi, {
          t: "b",
          b: "t"
        });
      }
      points = _newPoints2;
      offset2 = align.offset || [0, 0];
      targetOffset2 = align.targetOffset || [0, 0];
    }
    newOverflowCfg.adjustX = overflow.adjustX && isStillFailX;
    newOverflowCfg.adjustY = overflow.adjustY && isStillFailY;
    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
    }
  }
  if (newElRegion.width !== elRegion.width) {
    utils.css(source, "width", utils.width(source) + newElRegion.width - elRegion.width);
  }
  if (newElRegion.height !== elRegion.height) {
    utils.css(source, "height", utils.height(source) + newElRegion.height - elRegion.height);
  }
  utils.offset(source, {
    left: newElRegion.left,
    top: newElRegion.top
  }, {
    useCssRight: align.useCssRight,
    useCssBottom: align.useCssBottom,
    useCssTransform: align.useCssTransform,
    ignoreShake: align.ignoreShake
  });
  return {
    points,
    offset: offset2,
    targetOffset: targetOffset2,
    overflow: newOverflowCfg
  };
}
function isOutOfVisibleRect(target, alwaysByViewport) {
  var visibleRect = getVisibleRectForElement(target, alwaysByViewport);
  var targetRegion = getRegion(target);
  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
}
function alignElement(el2, refNode, align) {
  var target = align.target || refNode;
  var refNodeRegion = getRegion(target);
  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target, align.overflow && align.overflow.alwaysByViewport);
  return doAlign(el2, refNodeRegion, align, isTargetNotOutOfVisible);
}
alignElement.__getOffsetParent = getOffsetParent;
alignElement.__getVisibleRectForElement = getVisibleRectForElement;
function alignPoint(el2, tgtPoint, align) {
  var pageX;
  var pageY;
  var doc = utils.getDocument(el2);
  var win = doc.defaultView || doc.parentWindow;
  var scrollX = utils.getWindowScrollLeft(win);
  var scrollY = utils.getWindowScrollTop(win);
  var viewportWidth = utils.viewportWidth(win);
  var viewportHeight = utils.viewportHeight(win);
  if ("pageX" in tgtPoint) {
    pageX = tgtPoint.pageX;
  } else {
    pageX = scrollX + tgtPoint.clientX;
  }
  if ("pageY" in tgtPoint) {
    pageY = tgtPoint.pageY;
  } else {
    pageY = scrollY + tgtPoint.clientY;
  }
  var tgtRegion = {
    left: pageX,
    top: pageY,
    width: 0,
    height: 0
  };
  var pointInView = pageX >= 0 && pageX <= scrollX + viewportWidth && pageY >= 0 && pageY <= scrollY + viewportHeight;
  var points = [align.points[0], "cc"];
  return doAlign(el2, tgtRegion, _objectSpread2(_objectSpread2({}, align), {}, {
    points
  }), pointInView);
}
function cloneElement(vnode) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  let mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node2 = cloneVNode(ele, nodeProps, mergeRef);
  node2.props = override ? _extends(_extends({}, node2.props), nodeProps) : node2.props;
  warning$1(typeof node2.props.class !== "object");
  return node2;
}
const isVisible = (element) => {
  if (!element) {
    return false;
  }
  if (element.offsetParent) {
    return true;
  }
  if (element.getBBox) {
    const box = element.getBBox();
    if (box.width || box.height) {
      return true;
    }
  }
  if (element.getBoundingClientRect) {
    const box = element.getBoundingClientRect();
    if (box.width || box.height) {
      return true;
    }
  }
  return false;
};
function isSamePoint(prev2, next2) {
  if (prev2 === next2)
    return true;
  if (!prev2 || !next2)
    return false;
  if ("pageX" in next2 && "pageY" in next2) {
    return prev2.pageX === next2.pageX && prev2.pageY === next2.pageY;
  }
  if ("clientX" in next2 && "clientY" in next2) {
    return prev2.clientX === next2.clientX && prev2.clientY === next2.clientY;
  }
  return false;
}
function restoreFocus(activeElement, container) {
  if (activeElement !== (void 0).activeElement && contains(container, activeElement) && typeof activeElement.focus === "function") {
    activeElement.focus();
  }
}
function monitorResize(element, callback) {
  let prevWidth = null;
  let prevHeight = null;
  function onResize(_ref) {
    let [{
      target
    }] = _ref;
    if (!(void 0).documentElement.contains(target))
      return;
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      Promise.resolve().then(() => {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }
    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }
  const resizeObserver = new index(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return () => {
    resizeObserver.disconnect();
  };
}
const useBuffer = (callback, buffer) => {
  let called = false;
  let timeout = null;
  function cancelTrigger() {
    clearTimeout(timeout);
  }
  function trigger(force) {
    if (!called || force === true) {
      if (callback() === false) {
        return;
      }
      called = true;
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
      }, buffer.value);
    } else {
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
        trigger();
      }, buffer.value);
    }
  }
  return [trigger, () => {
    called = false;
    cancelTrigger();
  }];
};
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
function assocIndexOf(array, key) {
  var length2 = array.length;
  while (length2--) {
    if (eq(array[length2][0], key)) {
      return length2;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index2 = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length2) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var Map$1 = getNative(root, "Map");
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index2 = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length2) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index2 = -1, length2 = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length2) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index2 = -1, length2 = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index2 < length2) {
    this.add(values[index2]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index2 = -1, length2 = array == null ? 0 : array.length;
  while (++index2 < length2) {
    if (predicate(array[index2], index2, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index2 < arrLength) {
    var arrValue = array[index2], othValue = other[index2];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var Uint8Array$1 = root.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function mapToArray(map) {
  var index2 = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index2] = [key, value];
  });
  return result;
}
function setToArray(set) {
  var index2 = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index2] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", mapTag$3 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]";
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag$1:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
        return false;
      }
      return true;
    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      return eq(+object, +other);
    case errorTag$1:
      return object.name == other.name && object.message == other.message;
    case regexpTag$1:
    case stringTag$1:
      return object == other + "";
    case mapTag$3:
      var convert = mapToArray;
    case setTag$3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
function arrayPush(array, values) {
  var index2 = -1, length2 = values.length, offset2 = array.length;
  while (++index2 < length2) {
    array[offset2 + index2] = values[index2];
  }
  return array;
}
var isArray = Array.isArray;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
function arrayFilter(array, predicate) {
  var index2 = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length2) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$7 = Object.prototype;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function baseTimes(n2, iteratee) {
  var index2 = -1, result = Array(n2);
  while (++index2 < n2) {
    result[index2] = iteratee(index2);
  }
  return result;
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer$1 = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length2) {
  var type = typeof value;
  length2 = length2 == null ? MAX_SAFE_INTEGER$1 : length2;
  return !!length2 && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag = "[object Number]", objectTag$2 = "[object Object]", regexpTag = "[object RegExp]", setTag$2 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag] = typedArrayTags[setTag$2] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = function() {
  try {
    var types2 = freeModule && freeModule.require && freeModule.require("util").types;
    if (types2) {
      return types2;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length2)))) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index2 = objLength;
  while (index2--) {
    var key = objProps[index2];
    if (!(isPartial ? key in other : hasOwnProperty$2.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index2 < objLength) {
    key = objProps[index2];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var DataView$1 = getNative(root, "DataView");
var Promise$1 = getNative(root, "Promise");
var Set$1 = getNative(root, "Set");
var WeakMap$1 = getNative(root, "WeakMap");
var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$1.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
const alignProps = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
};
function getElement(func) {
  if (typeof func !== "function")
    return null;
  return func();
}
function getPoint(point) {
  if (typeof point !== "object" || !point)
    return null;
  return point;
}
const Align = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Align",
  props: alignProps,
  emits: ["align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const cacheRef = ref({});
    const nodeRef = ref();
    const [forceAlign, cancelForceAlign] = useBuffer(() => {
      const {
        disabled: latestDisabled,
        target: latestTarget,
        align: latestAlign,
        onAlign: latestOnAlign
      } = props;
      if (!latestDisabled && latestTarget && nodeRef.value) {
        const source = nodeRef.value;
        let result;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);
        cacheRef.value.element = element;
        cacheRef.value.point = point;
        cacheRef.value.align = latestAlign;
        const {
          activeElement
        } = void 0;
        if (element && isVisible(element)) {
          result = alignElement(source, element, latestAlign);
        } else if (point) {
          result = alignPoint(source, point, latestAlign);
        }
        restoreFocus(activeElement, source);
        if (latestOnAlign && result) {
          latestOnAlign(source, result);
        }
        return true;
      }
      return false;
    }, computed(() => props.monitorBufferTime));
    const resizeMonitor = ref({
      cancel: () => {
      }
    });
    const sourceResizeMonitor = ref({
      cancel: () => {
      }
    });
    const goAlign = () => {
      const target = props.target;
      const element = getElement(target);
      const point = getPoint(target);
      if (nodeRef.value !== sourceResizeMonitor.value.element) {
        sourceResizeMonitor.value.cancel();
        sourceResizeMonitor.value.element = nodeRef.value;
        sourceResizeMonitor.value.cancel = monitorResize(nodeRef.value, forceAlign);
      }
      if (cacheRef.value.element !== element || !isSamePoint(cacheRef.value.point, point) || !isEqual(cacheRef.value.align, props.align)) {
        forceAlign();
        if (resizeMonitor.value.element !== element) {
          resizeMonitor.value.cancel();
          resizeMonitor.value.element = element;
          resizeMonitor.value.cancel = monitorResize(element, forceAlign);
        }
      }
    };
    onUpdated(() => {
      nextTick(() => {
        goAlign();
      });
    });
    watch(() => props.disabled, (disabled) => {
      if (!disabled) {
        forceAlign();
      } else {
        cancelForceAlign();
      }
    }, {
      immediate: true,
      flush: "post"
    });
    const winResizeRef = ref(null);
    watch(() => props.monitorWindowResize, (monitorWindowResize) => {
      if (monitorWindowResize) {
        if (!winResizeRef.value) {
          winResizeRef.value = addEventListenerWrap(void 0, "resize", forceAlign);
        }
      } else if (winResizeRef.value) {
        winResizeRef.value.remove();
        winResizeRef.value = null;
      }
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      resizeMonitor.value.cancel();
      sourceResizeMonitor.value.cancel();
      if (winResizeRef.value)
        winResizeRef.value.remove();
      cancelForceAlign();
    });
    expose({
      forceAlign: () => forceAlign(true)
    });
    return () => {
      const child = slots === null || slots === void 0 ? void 0 : slots.default();
      if (child) {
        return cloneElement(child[0], {
          ref: nodeRef
        }, true, true);
      }
      return null;
    };
  }
});
tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
const getTransitionProps = function(transitionName) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName ? _extends({
    name: transitionName,
    appear: true,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
    enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
    enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
    leaveFromClass: ` ${transitionName}-leave`,
    leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
const getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
const PopupInner = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PopupInner",
  inheritAttrs: false,
  props: innerProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      attrs,
      slots
    } = _ref;
    const alignRef = shallowRef();
    const elementRef = shallowRef();
    const alignedClassName = shallowRef();
    const [stretchStyle, measureStretchStyle] = useStretchStyle(toRef(props, "stretch"));
    const visible = shallowRef(false);
    let timeoutId;
    watch(() => props.visible, (val) => {
      clearTimeout(timeoutId);
      if (val) {
        timeoutId = setTimeout(() => {
          visible.value = props.visible;
        });
      } else {
        visible.value = false;
      }
    }, {
      immediate: true
    });
    const [status, goNextStatus] = useVisibleStatus(visible);
    const prepareResolveRef = shallowRef();
    const getAlignTarget = () => {
      if (props.point) {
        return props.point;
      }
      return props.getRootDomNode;
    };
    const forceAlign = () => {
      var _a2;
      (_a2 = alignRef.value) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
    };
    const onInternalAlign = (popupDomNode, matchAlign) => {
      var _a2;
      const nextAlignedClassName = props.getClassNameFromAlign(matchAlign);
      const preAlignedClassName = alignedClassName.value;
      if (alignedClassName.value !== nextAlignedClassName) {
        alignedClassName.value = nextAlignedClassName;
      }
      if (status.value === "align") {
        if (preAlignedClassName !== nextAlignedClassName) {
          Promise.resolve().then(() => {
            forceAlign();
          });
        } else {
          goNextStatus(() => {
            var _a3;
            (_a3 = prepareResolveRef.value) === null || _a3 === void 0 ? void 0 : _a3.call(prepareResolveRef);
          });
        }
        (_a2 = props.onAlign) === null || _a2 === void 0 ? void 0 : _a2.call(props, popupDomNode, matchAlign);
      }
    };
    const motion = computed(() => {
      const m2 = typeof props.animation === "object" ? props.animation : getMotion(props);
      ["onAfterEnter", "onAfterLeave"].forEach((eventName) => {
        const originFn = m2[eventName];
        m2[eventName] = (node2) => {
          goNextStatus();
          status.value = "stable";
          originFn === null || originFn === void 0 ? void 0 : originFn(node2);
        };
      });
      return m2;
    });
    const onShowPrepare = () => {
      return new Promise((resolve) => {
        prepareResolveRef.value = resolve;
      });
    };
    watch([motion, status], () => {
      if (!motion.value && status.value === "motion") {
        goNextStatus();
      }
    }, {
      immediate: true
    });
    expose({
      forceAlign,
      getElement: () => {
        return elementRef.value.$el || elementRef.value;
      }
    });
    const alignDisabled = computed(() => {
      var _a2;
      if (((_a2 = props.align) === null || _a2 === void 0 ? void 0 : _a2.points) && (status.value === "align" || status.value === "stable")) {
        return false;
      }
      return true;
    });
    return () => {
      var _a2;
      const {
        zIndex,
        align,
        prefixCls,
        destroyPopupOnHide,
        onMouseenter,
        onMouseleave,
        onTouchstart = () => {
        },
        onMousedown
      } = props;
      const statusValue = status.value;
      const mergedStyle = [_extends(_extends({}, stretchStyle.value), {
        zIndex,
        opacity: statusValue === "motion" || statusValue === "stable" || !visible.value ? null : 0,
        // pointerEvents: statusValue === 'stable' ? null : 'none',
        pointerEvents: !visible.value && statusValue !== "stable" ? "none" : null
      }), attrs.style];
      let childNode = flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots, {
        visible: props.visible
      }));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      const mergedClassName = classNames(prefixCls, attrs.class, alignedClassName.value);
      const hasAnimate = visible.value || !props.visible;
      const transitionProps = hasAnimate ? getTransitionProps(motion.value.name, motion.value) : {};
      return createVNode(Transition, _objectSpread2$1(_objectSpread2$1({
        "ref": elementRef
      }, transitionProps), {}, {
        "onBeforeEnter": onShowPrepare
      }), {
        default: () => {
          return !destroyPopupOnHide || props.visible ? withDirectives(createVNode(Align, {
            "target": getAlignTarget(),
            "key": "popup",
            "ref": alignRef,
            "monitorWindowResize": true,
            "disabled": alignDisabled.value,
            "align": align,
            "onAlign": onInternalAlign
          }, {
            default: () => createVNode("div", {
              "class": mergedClassName,
              "onMouseenter": onMouseenter,
              "onMouseleave": onMouseleave,
              "onMousedown": withModifiers(onMousedown, ["capture"]),
              [supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"]: withModifiers(onTouchstart, ["capture"]),
              "style": mergedStyle
            }, [childNode])
          }), [[vShow, visible.value]]) : null;
        }
      });
    };
  }
});
const Popup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Popup",
  inheritAttrs: false,
  props: popupProps,
  setup(props, _ref) {
    let {
      attrs,
      slots,
      expose
    } = _ref;
    const innerVisible = shallowRef(false);
    const inMobile = shallowRef(false);
    const popupRef = shallowRef();
    const rootRef = shallowRef();
    watch([() => props.visible, () => props.mobile], () => {
      innerVisible.value = props.visible;
      if (props.visible && props.mobile) {
        inMobile.value = true;
      }
    }, {
      immediate: true,
      flush: "post"
    });
    expose({
      forceAlign: () => {
        var _a2;
        (_a2 = popupRef.value) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
      },
      getElement: () => {
        var _a2;
        return (_a2 = popupRef.value) === null || _a2 === void 0 ? void 0 : _a2.getElement();
      }
    });
    return () => {
      const cloneProps = _extends(_extends(_extends({}, props), attrs), {
        visible: innerVisible.value
      });
      const popupNode = inMobile.value ? createVNode(MobilePopupInner, _objectSpread2$1(_objectSpread2$1({}, cloneProps), {}, {
        "mobile": props.mobile,
        "ref": popupRef
      }), {
        default: slots.default
      }) : createVNode(PopupInner, _objectSpread2$1(_objectSpread2$1({}, cloneProps), {}, {
        "ref": popupRef
      }), {
        default: slots.default
      });
      return createVNode("div", {
        "ref": rootRef
      }, [createVNode(Mask, cloneProps, null), popupNode]);
    };
  }
});
function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  const baseAlign = builtinPlacements[placementStr] || {};
  return _extends(_extends({}, baseAlign), align);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  const {
    points
  } = align;
  const placements2 = Object.keys(builtinPlacements);
  for (let i2 = 0; i2 < placements2.length; i2 += 1) {
    const placement = placements2[i2];
    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return "";
}
const BaseMixin = {
  methods: {
    setState() {
      let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : void 0;
      let newState = typeof state === "function" ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        const s2 = this.getDerivedStateFromProps(getOptionProps(this), _extends(_extends({}, this.$data), newState));
        if (s2 === null) {
          return;
        } else {
          newState = _extends(_extends({}, newState), s2 || {});
        }
      }
      _extends(this.$data, newState);
      if (this._.isMounted) {
        this.$forceUpdate();
      }
      nextTick(() => {
        callback && callback();
      });
    },
    __emit() {
      const args = [].slice.call(arguments, 0);
      let eventName = args[0];
      eventName = `on${eventName[0].toUpperCase()}${eventName.substring(1)}`;
      const event = this.$props[eventName] || this.$attrs[eventName];
      if (args.length && event) {
        if (Array.isArray(event)) {
          for (let i2 = 0, l2 = event.length; i2 < l2; i2++) {
            event[i2](...args.slice(1));
          }
        } else {
          event(...args.slice(1));
        }
      }
    }
  }
};
const PortalContextKey = Symbol("PortalContextKey");
const useProvidePortal = function(instance) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: true
  };
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed(() => {
      const {
        sPopupVisible,
        popupRef,
        forceRender,
        autoDestroy
      } = instance || {};
      let shouldRender = false;
      if (sPopupVisible || popupRef || forceRender) {
        shouldRender = true;
      }
      if (!sPopupVisible && autoDestroy) {
        shouldRender = false;
      }
      return shouldRender;
    })
  });
};
const useInjectPortal = () => {
  useProvidePortal({}, {
    inTriggerContext: false
  });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed(() => false),
    inTriggerContext: false
  });
  return {
    shouldRender: computed(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
  };
};
const Portal$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let container;
    const {
      shouldRender
    } = useInjectPortal();
    const stopWatch = watch(shouldRender, () => {
      if (shouldRender.value && !container) {
        container = props.getContainer();
      }
      if (container) {
        stopWatch();
      }
    });
    onUpdated(() => {
      nextTick(() => {
        var _a2;
        if (shouldRender.value) {
          (_a2 = props.didUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(props, props);
        }
      });
    });
    return () => {
      var _a2;
      if (!shouldRender.value)
        return null;
      {
        return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      }
    };
  }
});
function useScrollLocker(lock) {
  computed(() => !!lock && !!lock.value);
  watchEffect((onClear) => {
    {
      return;
    }
  }, {
    flush: "post"
  });
}
let openCount = 0;
const getParent3 = (getContainer2) => {
  {
    return null;
  }
};
const Portal = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PortalWrapper",
  inheritAttrs: false,
  props: {
    wrapperClassName: String,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getContainer: PropTypes.any,
    visible: {
      type: Boolean,
      default: void 0
    },
    autoLock: booleanType(),
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const container = shallowRef();
    const componentRef = shallowRef();
    shallowRef();
    const triggerUpdate = shallowRef(1);
    const defaultContainer = canUseDom();
    let parent = null;
    const attachToParent = function() {
      let force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (force || container.value && !container.value.parentNode) {
        parent = getParent3(props.getContainer);
        if (parent) {
          parent.appendChild(container.value);
          return true;
        }
        return false;
      }
      return true;
    };
    const getContainer2 = () => {
      {
        return null;
      }
    };
    const setWrapperClassName = () => {
      const {
        wrapperClassName
      } = props;
      if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
        container.value.className = wrapperClassName;
      }
    };
    onUpdated(() => {
      setWrapperClassName();
      attachToParent();
    });
    useScrollLocker(computed(() => {
      return props.autoLock && props.visible && canUseDom() && (container.value === (void 0).body || container.value === defaultContainer);
    }));
    return () => {
      const {
        forceRender,
        visible
      } = props;
      let portal = null;
      const childProps = {
        getOpenCount: () => openCount,
        getContainer: getContainer2
      };
      if (triggerUpdate.value && (forceRender || visible || componentRef.value)) {
        portal = createVNode(Portal$1, {
          "getContainer": getContainer2,
          "ref": componentRef,
          "didUpdate": props.didUpdate
        }, {
          default: () => {
            var _a2;
            return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots, childProps);
          }
        });
      }
      return portal;
    };
  }
});
const ALL_HANDLERS = ["onClick", "onMousedown", "onTouchstart", "onMouseenter", "onMouseleave", "onFocus", "onBlur", "onContextmenu"];
const Trigger = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Trigger",
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: triggerProps(),
  setup(props) {
    const align = computed(() => {
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    });
    const popupRef = shallowRef(null);
    const setPopupRef = (val) => {
      popupRef.value = val;
    };
    return {
      vcTriggerContext: inject("vcTriggerContext", {}),
      popupRef,
      setPopupRef,
      triggerRef: shallowRef(null),
      align,
      focusTime: null,
      clickOutsideHandler: null,
      contextmenuOutsideHandler1: null,
      contextmenuOutsideHandler2: null,
      touchOutsideHandler: null,
      attachId: null,
      delayTimer: null,
      hasPopupMouseDown: false,
      preClickTime: null,
      preTouchTime: null,
      mouseDownTimeout: null,
      childOriginEvents: {}
    };
  },
  data() {
    const props = this.$props;
    let popupVisible;
    if (this.popupVisible !== void 0) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    ALL_HANDLERS.forEach((h2) => {
      this[`fire${h2}`] = (e2) => {
        this.fireEvents(h2, e2);
      };
    });
    return {
      prevPopupVisible: popupVisible,
      sPopupVisible: popupVisible,
      point: null
    };
  },
  watch: {
    popupVisible(val) {
      if (val !== void 0) {
        this.prevPopupVisible = this.sPopupVisible;
        this.sPopupVisible = val;
      }
    }
  },
  created() {
    provide("vcTriggerContext", {
      onPopupMouseDown: this.onPopupMouseDown,
      onPopupMouseenter: this.onPopupMouseenter,
      onPopupMouseleave: this.onPopupMouseleave
    });
    useProvidePortal(this);
  },
  deactivated() {
    this.setPopupVisible(false);
  },
  mounted() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  beforeUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    clearTimeout(this.mouseDownTimeout);
    wrapperRaf.cancel(this.attachId);
  },
  methods: {
    updatedCal() {
      const props = this.$props;
      const state = this.$data;
      if (state.sPopupVisible) {
        let currentDocument;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
          currentDocument = props.getDocument(this.getRootDomNode());
          this.clickOutsideHandler = addEventListenerWrap(currentDocument, "mousedown", this.onDocumentClick);
        }
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.touchOutsideHandler = addEventListenerWrap(currentDocument, "touchstart", this.onDocumentClick, supportsPassive$1 ? {
            passive: false
          } : false);
        }
        if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.contextmenuOutsideHandler1 = addEventListenerWrap(currentDocument, "scroll", this.onContextmenuClose);
        }
        if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
          this.contextmenuOutsideHandler2 = addEventListenerWrap(void 0, "blur", this.onContextmenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    },
    onMouseenter(e2) {
      const {
        mouseEnterDelay
      } = this.$props;
      this.fireEvents("onMouseenter", e2);
      this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e2);
    },
    onMouseMove(e2) {
      this.fireEvents("onMousemove", e2);
      this.setPoint(e2);
    },
    onMouseleave(e2) {
      this.fireEvents("onMouseleave", e2);
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onPopupMouseenter() {
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseenter) {
        vcTriggerContext.onPopupMouseenter();
      }
      this.clearDelayTimer();
    },
    onPopupMouseleave(e2) {
      var _a2;
      if (e2 && e2.relatedTarget && !e2.relatedTarget.setTimeout && contains((_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.getElement(), e2.relatedTarget)) {
        return;
      }
      if (this.isMouseLeaveToHide()) {
        this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
      }
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseleave) {
        vcTriggerContext.onPopupMouseleave(e2);
      }
    },
    onFocus(e2) {
      this.fireEvents("onFocus", e2);
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.$props.focusDelay);
      }
    },
    onMousedown(e2) {
      this.fireEvents("onMousedown", e2);
      this.preClickTime = Date.now();
    },
    onTouchstart(e2) {
      this.fireEvents("onTouchstart", e2);
      this.preTouchTime = Date.now();
    },
    onBlur(e2) {
      if (!contains(e2.target, e2.relatedTarget || (void 0).activeElement)) {
        this.fireEvents("onBlur", e2);
        this.clearDelayTimer();
        if (this.isBlurToHide()) {
          this.delaySetPopupVisible(false, this.$props.blurDelay);
        }
      }
    },
    onContextmenu(e2) {
      e2.preventDefault();
      this.fireEvents("onContextmenu", e2);
      this.setPopupVisible(true, e2);
    },
    onContextmenuClose() {
      if (this.isContextmenuToShow()) {
        this.close();
      }
    },
    onClick(event) {
      this.fireEvents("onClick", event);
      if (this.focusTime) {
        let preTime;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      if (this.isClickToShow() && (this.isClickToHide() || this.isBlurToHide()) && event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.domEvent) {
        event.domEvent.preventDefault();
      }
      const nextVisible = !this.$data.sPopupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.$data.sPopupVisible, event);
      }
    },
    onPopupMouseDown() {
      const {
        vcTriggerContext = {}
      } = this;
      this.hasPopupMouseDown = true;
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(() => {
        this.hasPopupMouseDown = false;
      }, 0);
      if (vcTriggerContext.onPopupMouseDown) {
        vcTriggerContext.onPopupMouseDown(...arguments);
      }
    },
    onDocumentClick(event) {
      if (this.$props.mask && !this.$props.maskClosable) {
        return;
      }
      const target = event.target;
      const root2 = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();
      if (
        // mousedown on the target should also close popup when action is contextMenu.
        // https://github.com/ant-design/ant-design/issues/29853
        (!contains(root2, target) || this.isContextMenuOnly()) && !contains(popupNode, target) && !this.hasPopupMouseDown
      ) {
        this.delaySetPopupVisible(false, 0.1);
      }
    },
    getPopupDomNode() {
      var _a2;
      return ((_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.getElement()) || null;
    },
    getRootDomNode() {
      var _a2, _b2, _c, _d;
      const {
        getTriggerDOMNode
      } = this.$props;
      if (getTriggerDOMNode) {
        const domNode = ((_b2 = (_a2 = this.triggerRef) === null || _a2 === void 0 ? void 0 : _a2.$el) === null || _b2 === void 0 ? void 0 : _b2.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        return findDOMNode(getTriggerDOMNode(domNode));
      }
      try {
        const domNode = ((_d = (_c = this.triggerRef) === null || _c === void 0 ? void 0 : _c.$el) === null || _d === void 0 ? void 0 : _d.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        if (domNode) {
          return domNode;
        }
      } catch (err) {
      }
      return findDOMNode(this);
    },
    handleGetPopupClassFromAlign(align) {
      const className = [];
      const props = this.$props;
      const {
        popupPlacement,
        builtinPlacements,
        prefixCls,
        alignPoint: alignPoint2,
        getPopupClassNameFromAlign
      } = props;
      if (popupPlacement && builtinPlacements) {
        className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint2));
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(" ");
    },
    getPopupAlign() {
      const props = this.$props;
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getComponent() {
      const mouseProps = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.onMouseenter = this.onPopupMouseenter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.onMouseleave = this.onPopupMouseleave;
      }
      mouseProps.onMousedown = this.onPopupMouseDown;
      mouseProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.onPopupMouseDown;
      const {
        handleGetPopupClassFromAlign,
        getRootDomNode,
        $attrs
      } = this;
      const {
        prefixCls,
        destroyPopupOnHide,
        popupClassName,
        popupAnimation,
        popupTransitionName,
        popupStyle,
        mask,
        maskAnimation,
        maskTransitionName,
        zIndex,
        stretch,
        alignPoint: alignPoint2,
        mobile,
        forceRender
      } = this.$props;
      const {
        sPopupVisible,
        point
      } = this.$data;
      const popupProps2 = _extends(_extends({
        prefixCls,
        destroyPopupOnHide,
        visible: sPopupVisible,
        point: alignPoint2 ? point : null,
        align: this.align,
        animation: popupAnimation,
        getClassNameFromAlign: handleGetPopupClassFromAlign,
        stretch,
        getRootDomNode,
        mask,
        zIndex,
        transitionName: popupTransitionName,
        maskAnimation,
        maskTransitionName,
        class: popupClassName,
        style: popupStyle,
        onAlign: $attrs.onPopupAlign || noop$1
      }, mouseProps), {
        ref: this.setPopupRef,
        mobile,
        forceRender
      });
      return createVNode(Popup, popupProps2, {
        default: this.$slots.popup || (() => getComponent(this, "popup"))
      });
    },
    attachParent(popupContainer) {
      wrapperRaf.cancel(this.attachId);
      const {
        getPopupContainer,
        getDocument: getDocument2
      } = this.$props;
      const domNode = this.getRootDomNode();
      let mountNode;
      if (!getPopupContainer) {
        mountNode = getDocument2(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        mountNode = getPopupContainer(domNode);
      }
      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        this.attachId = wrapperRaf(() => {
          this.attachParent(popupContainer);
        });
      }
    },
    getContainer() {
      const {
        $props: props
      } = this;
      const {
        getDocument: getDocument2
      } = props;
      const popupContainer = getDocument2(this.getRootDomNode()).createElement("div");
      popupContainer.style.position = "absolute";
      popupContainer.style.top = "0";
      popupContainer.style.left = "0";
      popupContainer.style.width = "100%";
      this.attachParent(popupContainer);
      return popupContainer;
    },
    setPopupVisible(sPopupVisible, event) {
      const {
        alignPoint: alignPoint2,
        sPopupVisible: prevPopupVisible,
        onPopupVisibleChange
      } = this;
      this.clearDelayTimer();
      if (prevPopupVisible !== sPopupVisible) {
        if (!hasProp(this, "popupVisible")) {
          this.setState({
            sPopupVisible,
            prevPopupVisible
          });
        }
        onPopupVisibleChange && onPopupVisibleChange(sPopupVisible);
      }
      if (alignPoint2 && event && sPopupVisible) {
        this.setPoint(event);
      }
    },
    setPoint(point) {
      const {
        alignPoint: alignPoint2
      } = this.$props;
      if (!alignPoint2 || !point)
        return;
      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY
        }
      });
    },
    handlePortalUpdate() {
      if (this.prevPopupVisible !== this.sPopupVisible) {
        this.afterPopupVisibleChange(this.sPopupVisible);
      }
    },
    delaySetPopupVisible(visible, delayS, event) {
      const delay = delayS * 1e3;
      this.clearDelayTimer();
      if (delay) {
        const point = event ? {
          pageX: event.pageX,
          pageY: event.pageY
        } : null;
        this.delayTimer = setTimeout(() => {
          this.setPopupVisible(visible, point);
          this.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible, event);
      }
    },
    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    },
    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
      if (this.contextmenuOutsideHandler1) {
        this.contextmenuOutsideHandler1.remove();
        this.contextmenuOutsideHandler1 = null;
      }
      if (this.contextmenuOutsideHandler2) {
        this.contextmenuOutsideHandler2.remove();
        this.contextmenuOutsideHandler2 = null;
      }
      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    },
    createTwoChains(event) {
      let fn = () => {
      };
      const events = getEvents(this);
      if (this.childOriginEvents[event] && events[event]) {
        return this[`fire${event}`];
      }
      fn = this.childOriginEvents[event] || events[event] || fn;
      return fn;
    },
    isClickToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("click") !== -1 || showAction.indexOf("click") !== -1;
    },
    isContextMenuOnly() {
      const {
        action
      } = this.$props;
      return action === "contextmenu" || action.length === 1 && action[0] === "contextmenu";
    },
    isContextmenuToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("contextmenu") !== -1 || showAction.indexOf("contextmenu") !== -1;
    },
    isClickToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("click") !== -1 || hideAction.indexOf("click") !== -1;
    },
    isMouseEnterToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || showAction.indexOf("mouseenter") !== -1;
    },
    isMouseLeaveToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || hideAction.indexOf("mouseleave") !== -1;
    },
    isFocusToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || showAction.indexOf("focus") !== -1;
    },
    isBlurToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || hideAction.indexOf("blur") !== -1;
    },
    forcePopupAlign() {
      var _a2;
      if (this.$data.sPopupVisible) {
        (_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
      }
    },
    fireEvents(type, e2) {
      if (this.childOriginEvents[type]) {
        this.childOriginEvents[type](e2);
      }
      const event = this.$props[type] || this.$attrs[type];
      if (event) {
        event(e2);
      }
    },
    close() {
      this.setPopupVisible(false);
    }
  },
  render() {
    const {
      $attrs
    } = this;
    const children = filterEmpty(getSlot(this));
    const {
      alignPoint: alignPoint2,
      getPopupContainer
    } = this.$props;
    const child = children[0];
    this.childOriginEvents = getEvents(child);
    const newChildProps = {
      key: "trigger"
    };
    if (this.isContextmenuToShow()) {
      newChildProps.onContextmenu = this.onContextmenu;
    } else {
      newChildProps.onContextmenu = this.createTwoChains("onContextmenu");
    }
    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMousedown = this.onMousedown;
      newChildProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.onTouchstart;
    } else {
      newChildProps.onClick = this.createTwoChains("onClick");
      newChildProps.onMousedown = this.createTwoChains("onMousedown");
      newChildProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.createTwoChains("onTouchstart");
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseenter = this.onMouseenter;
      if (alignPoint2) {
        newChildProps.onMousemove = this.onMouseMove;
      }
    } else {
      newChildProps.onMouseenter = this.createTwoChains("onMouseenter");
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseleave = this.onMouseleave;
    } else {
      newChildProps.onMouseleave = this.createTwoChains("onMouseleave");
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains("onFocus");
      newChildProps.onBlur = (e2) => {
        if (e2 && (!e2.relatedTarget || !contains(e2.target, e2.relatedTarget))) {
          this.createTwoChains("onBlur")(e2);
        }
      };
    }
    const childrenClassName = classNames(child && child.props && child.props.class, $attrs.class);
    if (childrenClassName) {
      newChildProps.class = childrenClassName;
    }
    const trigger = cloneElement(child, _extends(_extends({}, newChildProps), {
      ref: "triggerRef"
    }), true, true);
    const portal = createVNode(Portal, {
      "key": "portal",
      "getContainer": getPopupContainer && (() => getPopupContainer(this.getRootDomNode())),
      "didUpdate": this.handlePortalUpdate,
      "visible": this.$data.sPopupVisible
    }, {
      default: this.getComponent
    });
    return createVNode(Fragment, null, [trigger, portal]);
  }
});
function useMergedState(defaultStateValue, option) {
  const {
    defaultValue,
    value = ref()
  } = option || {};
  let initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  if (value.value !== void 0) {
    initValue = unref(value);
  }
  if (defaultValue !== void 0) {
    initValue = typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  const innerValue = ref(initValue);
  const mergedValue = ref(initValue);
  watchEffect(() => {
    let val = value.value !== void 0 ? value.value : innerValue.value;
    if (option.postState) {
      val = option.postState(val);
    }
    mergedValue.value = val;
  });
  function triggerChange(newValue) {
    const preVal = mergedValue.value;
    innerValue.value = newValue;
    if (toRaw(mergedValue.value) !== newValue && option.onChange) {
      option.onChange(newValue, preVal);
    }
  }
  watch(value, () => {
    innerValue.value = value.value;
  });
  return [mergedValue, triggerChange];
}
function useState(defaultStateValue) {
  const initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  const innerValue = ref(initValue);
  function triggerChange(newValue) {
    innerValue.value = newValue;
  }
  return [innerValue, triggerChange];
}
var contextKey$1 = Symbol("iconContext");
var useInjectIconContext = function useInjectIconContext2() {
  return inject(contextKey$1, {
    prefixCls: ref("anticon"),
    rootClassName: ref(""),
    csp: ref()
  });
};
function _objectSpread$a(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$a(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$a(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function warning(valid, message) {
}
function isIconDefinition(target) {
  return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
}
function generate(node2, key, rootProps) {
  if (!rootProps) {
    return h$1(node2.tag, _objectSpread$a({
      key
    }, node2.attrs), (node2.children || []).map(function(child, index2) {
      return generate(child, "".concat(key, "-").concat(node2.tag, "-").concat(index2));
    }));
  }
  return h$1(node2.tag, _objectSpread$a({
    key
  }, rootProps, node2.attrs), (node2.children || []).map(function(child, index2) {
    return generate(child, "".concat(key, "-").concat(node2.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles2() {
  var _useInjectIconContext = useInjectIconContext(), prefixCls = _useInjectIconContext.prefixCls;
  _useInjectIconContext.csp;
  getCurrentInstance();
  var mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls.value);
  }
  nextTick(function() {
    {
      return;
    }
  });
};
var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];
function _objectWithoutProperties$1(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectSpread$9(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$9(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var twoToneColorPalette = reactive({
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
});
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread$9({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props, context) {
  var _props$context$attrs = _objectSpread$9({}, props, context.attrs), icon = _props$context$attrs.icon, primaryColor = _props$context$attrs.primaryColor, secondaryColor = _props$context$attrs.secondaryColor, restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  warning(isIconDefinition(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = _objectSpread$9({}, target, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), _objectSpread$9({}, restProps, {
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
IconBase.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
IconBase.inheritAttrs = false;
IconBase.displayName = "IconBase";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const VueIcon = IconBase;
function _slicedToArray$1(arr, i2) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$1(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$1(o2, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i2) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i2 = _i2.call(arr); !(_n = (_s = _i2.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return VueIcon.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = VueIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var InsertStyles = defineComponent({
  name: "InsertStyles",
  setup: function setup() {
    useInsertStyles();
    return function() {
      return null;
    };
  }
});
var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i2) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i2 = _i2.call(arr); !(_n = (_s = _i2.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _objectSpread$8(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$8(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
setTwoToneColor(blue.primary);
var Icon = function Icon2(props, context) {
  var _classObj;
  var _props$context$attrs = _objectSpread$8({}, props, context.attrs), cls = _props$context$attrs["class"], icon = _props$context$attrs.icon, spin = _props$context$attrs.spin, rotate = _props$context$attrs.rotate, tabindex = _props$context$attrs.tabindex, twoToneColor = _props$context$attrs.twoToneColor, onClick = _props$context$attrs.onClick, restProps = _objectWithoutProperties(_props$context$attrs, _excluded);
  var _useInjectIconContext = useInjectIconContext(), prefixCls = _useInjectIconContext.prefixCls, rootClassName = _useInjectIconContext.rootClassName;
  var classObj = (_classObj = {}, _defineProperty$8(_classObj, rootClassName.value, !!rootClassName.value), _defineProperty$8(_classObj, prefixCls.value, true), _defineProperty$8(_classObj, "".concat(prefixCls.value, "-").concat(icon.name), Boolean(icon.name)), _defineProperty$8(_classObj, "".concat(prefixCls.value, "-spin"), !!spin || icon.name === "loading"), _classObj);
  var iconTabIndex = tabindex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return createVNode("span", _objectSpread$8({
    "role": "img",
    "aria-label": icon.name
  }, restProps, {
    "onClick": onClick,
    "class": [classObj, cls],
    "tabindex": iconTabIndex
  }), [createVNode(VueIcon, {
    "icon": icon,
    "primaryColor": primaryColor,
    "secondaryColor": secondaryColor,
    "style": svgStyle
  }, null), createVNode(InsertStyles, null, null)]);
};
Icon.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: [String, Array]
};
Icon.displayName = "AntdIcon";
Icon.inheritAttrs = false;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;
var LoadingOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
const LoadingOutlinedSvg = LoadingOutlined$2;
function _objectSpread$7(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$7(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LoadingOutlined = function LoadingOutlined2(props, context) {
  var p = _objectSpread$7({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$7({}, p, {
    "icon": LoadingOutlinedSvg
  }), null);
};
LoadingOutlined.displayName = "LoadingOutlined";
LoadingOutlined.inheritAttrs = false;
const LoadingOutlined$1 = LoadingOutlined;
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;
function _objectSpread$6(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$6(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var CloseOutlined = function CloseOutlined2(props, context) {
  var p = _objectSpread$6({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$6({}, p, {
    "icon": CloseOutlinedSvg
  }), null);
};
CloseOutlined.displayName = "CloseOutlined";
CloseOutlined.inheritAttrs = false;
const CloseOutlined$1 = CloseOutlined;
var CloseCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, "name": "close-circle", "theme": "filled" };
const CloseCircleFilledSvg = CloseCircleFilled$2;
function _objectSpread$5(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$5(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var CloseCircleFilled = function CloseCircleFilled2(props, context) {
  var p = _objectSpread$5({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$5({}, p, {
    "icon": CloseCircleFilledSvg
  }), null);
};
CloseCircleFilled.displayName = "CloseCircleFilled";
CloseCircleFilled.inheritAttrs = false;
const CloseCircleFilled$1 = CloseCircleFilled;
function createContext(defaultValue) {
  const contextKey2 = Symbol("contextKey");
  const useProvide = (props, newProps) => {
    const mergedProps = reactive({});
    provide(contextKey2, mergedProps);
    watchEffect(() => {
      _extends(mergedProps, props, newProps || {});
    });
    return mergedProps;
  };
  const useInject = () => {
    return inject(contextKey2, defaultValue) || {};
  };
  return {
    useProvide,
    useInject
  };
}
const genSpaceCompactStyle = (token2) => {
  const {
    componentCls
  } = token2;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-block": {
        display: "flex",
        width: "100%"
      },
      "&-vertical": {
        flexDirection: "column"
      }
    }
  };
};
const genSpaceStyle = (token2) => {
  const {
    componentCls
  } = token2;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-rtl": {
        direction: "rtl"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-align": {
        flexDirection: "column",
        "&-center": {
          alignItems: "center"
        },
        "&-start": {
          alignItems: "flex-start"
        },
        "&-end": {
          alignItems: "flex-end"
        },
        "&-baseline": {
          alignItems: "baseline"
        }
      },
      [`${componentCls}-space-item`]: {
        "&:empty": {
          display: "none"
        }
      }
    }
  };
};
const useStyle$6 = genComponentStyleHook("Space", (token2) => [genSpaceStyle(token2), genSpaceCompactStyle(token2)]);
var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer$1(value) || isTypedArray$1(value) || isArguments$1(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
const spaceCompactItemProps = () => ({
  compactSize: String,
  compactDirection: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
  isFirstItem: booleanType(),
  isLastItem: booleanType()
});
const SpaceCompactItemContext = createContext(null);
const useCompactItemContext = (prefixCls, direction) => {
  const compactItemContext = SpaceCompactItemContext.useInject();
  const compactItemClassnames = computed(() => {
    if (!compactItemContext || isEmpty(compactItemContext))
      return "";
    const {
      compactDirection,
      isFirstItem,
      isLastItem
    } = compactItemContext;
    const separator = compactDirection === "vertical" ? "-vertical-" : "-";
    return classNames({
      [`${prefixCls.value}-compact${separator}item`]: true,
      [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === "rtl"
    });
  });
  return {
    compactSize: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize),
    compactDirection: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection),
    compactItemClassnames
  };
};
defineComponent({
  name: "NoCompactStyle",
  setup(_2, _ref) {
    let {
      slots
    } = _ref;
    SpaceCompactItemContext.useProvide(null);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
const spaceCompactProps = () => ({
  prefixCls: String,
  size: {
    type: String
  },
  direction: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
  align: PropTypes.oneOf(tuple("start", "end", "center", "baseline")),
  block: {
    type: Boolean,
    default: void 0
  }
});
const CompactItem = defineComponent({
  name: "CompactItem",
  props: spaceCompactItemProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    SpaceCompactItemContext.useProvide(props);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
defineComponent({
  name: "ASpaceCompact",
  inheritAttrs: false,
  props: spaceCompactProps(),
  setup(props, _ref3) {
    let {
      attrs,
      slots
    } = _ref3;
    const {
      prefixCls,
      direction: directionConfig
    } = useConfigInject("space-compact", props);
    const compactItemContext = SpaceCompactItemContext.useInject();
    const [wrapSSR, hashId] = useStyle$6(prefixCls);
    const clx = computed(() => {
      return classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
        [`${prefixCls.value}-block`]: props.block,
        [`${prefixCls.value}-vertical`]: props.direction === "vertical"
      });
    });
    return () => {
      var _a2;
      const childNodes = flattenChildren(((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || []);
      if (childNodes.length === 0) {
        return null;
      }
      return wrapSSR(createVNode("div", _objectSpread2$1(_objectSpread2$1({}, attrs), {}, {
        "class": [clx.value, attrs.class]
      }), [childNodes.map((child, i2) => {
        var _a3;
        const key = child && child.key || `${prefixCls.value}-item-${i2}`;
        const noCompactItemContext = !compactItemContext || isEmpty(compactItemContext);
        return createVNode(CompactItem, {
          "key": key,
          "compactSize": (_a3 = props.size) !== null && _a3 !== void 0 ? _a3 : "middle",
          "compactDirection": props.direction,
          "isFirstItem": i2 === 0 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
          "isLastItem": i2 === childNodes.length - 1 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
        }, {
          default: () => [child]
        });
      })]));
    };
  }
});
const initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotion = function(motionCls, inKeyframes, outKeyframes, duration) {
  let sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return {
    [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: _extends(_extends({}, initMotionCommon(duration)), {
      animationPlayState: "paused"
    }),
    [`${sameLevelPrefix}${motionCls}-leave`]: _extends(_extends({}, initMotionCommonLeave(duration)), {
      animationPlayState: "paused"
    }),
    [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes,
      animationPlayState: "running"
    },
    [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
};
const fadeIn = new Keyframe("antFadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
const fadeOut = new Keyframe("antFadeOut", {
  "0%": {
    opacity: 1
  },
  "100%": {
    opacity: 0
  }
});
const initFadeMotion = function(token2) {
  let sameLevel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const {
    antCls
  } = token2;
  const motionCls = `${antCls}-fade`;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return [initMotion(motionCls, fadeIn, fadeOut, token2.motionDurationMid, sameLevel), {
    [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: "linear"
    },
    [`${sameLevelPrefix}${motionCls}-leave`]: {
      animationTimingFunction: "linear"
    }
  }];
};
const zoomIn = new Keyframe("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomOut = new Keyframe("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
const zoomBigIn = new Keyframe("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomBigOut = new Keyframe("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
const zoomUpIn = new Keyframe("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
const zoomUpOut = new Keyframe("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
const zoomLeftIn = new Keyframe("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
const zoomLeftOut = new Keyframe("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
const zoomRightIn = new Keyframe("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
const zoomRightOut = new Keyframe("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
const zoomDownIn = new Keyframe("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
const zoomDownOut = new Keyframe("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
const zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
const initZoomMotion = (token2, motionName) => {
  const {
    antCls
  } = token2;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token2.motionDurationFast : token2.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token2.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token2.motionEaseInOutCirc
    }
  }];
};
function compactItemBorder(token2, parentCls, options) {
  const {
    focusElCls,
    focus,
    borderElCls
  } = options;
  const childCombinator = borderElCls ? "> *" : "";
  const hoverEffects = ["hover", focus ? "focus" : null, "active"].filter(Boolean).map((n2) => `&:${n2} ${childCombinator}`).join(",");
  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: -token2.lineWidth
    },
    "&-item": _extends(_extends({
      [hoverEffects]: {
        zIndex: 2
      }
    }, focusElCls ? {
      [`&${focusElCls}`]: {
        zIndex: 2
      }
    } : {}), {
      [`&[disabled] ${childCombinator}`]: {
        zIndex: 0
      }
    })
  };
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
  const {
    borderElCls
  } = options;
  const childCombinator = borderElCls ? `> ${borderElCls}` : "";
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
      borderRadius: 0
    },
    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function genCompactItemStyle(token2) {
  let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: true
  };
  const {
    componentCls
  } = token2;
  const compactCls = `${componentCls}-compact`;
  return {
    [compactCls]: _extends(_extends({}, compactItemBorder(token2, compactCls, options)), compactItemBorderRadius(componentCls, compactCls, options))
  };
}
var CheckCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, "name": "check-circle", "theme": "filled" };
const CheckCircleFilledSvg = CheckCircleFilled$2;
function _objectSpread$4(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var CheckCircleFilled = function CheckCircleFilled2(props, context) {
  var p = _objectSpread$4({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$4({}, p, {
    "icon": CheckCircleFilledSvg
  }), null);
};
CheckCircleFilled.displayName = "CheckCircleFilled";
CheckCircleFilled.inheritAttrs = false;
const CheckCircleFilled$1 = CheckCircleFilled;
var ExclamationCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "exclamation-circle", "theme": "filled" };
const ExclamationCircleFilledSvg = ExclamationCircleFilled$2;
function _objectSpread$3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ExclamationCircleFilled = function ExclamationCircleFilled2(props, context) {
  var p = _objectSpread$3({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$3({}, p, {
    "icon": ExclamationCircleFilledSvg
  }), null);
};
ExclamationCircleFilled.displayName = "ExclamationCircleFilled";
ExclamationCircleFilled.inheritAttrs = false;
const ExclamationCircleFilled$1 = ExclamationCircleFilled;
const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
const targetOffset$1 = [0, 0];
const placements = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset$1
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset$1
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset$1
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset$1
  }
};
const tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes.any
};
const Content$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TooltipContent",
  props: tooltipContentProps,
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _a2;
      return createVNode("div", {
        "class": `${props.prefixCls}-inner`,
        "id": props.id,
        "role": "tooltip",
        "style": props.overlayInnerStyle
      }, [(_a2 = slots.overlay) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
    };
  }
});
var __rest$3 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
function noop() {
}
const Tooltip$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Tooltip",
  inheritAttrs: false,
  props: {
    trigger: PropTypes.any.def(["hover"]),
    defaultVisible: {
      type: Boolean,
      default: void 0
    },
    visible: {
      type: Boolean,
      default: void 0
    },
    placement: PropTypes.string.def("right"),
    transitionName: String,
    animation: PropTypes.any,
    afterVisibleChange: PropTypes.func.def(() => {
    }),
    overlayStyle: {
      type: Object,
      default: void 0
    },
    overlayClassName: String,
    prefixCls: PropTypes.string.def("rc-tooltip"),
    mouseEnterDelay: PropTypes.number.def(0.1),
    mouseLeaveDelay: PropTypes.number.def(0.1),
    getPopupContainer: Function,
    destroyTooltipOnHide: {
      type: Boolean,
      default: false
    },
    align: PropTypes.object.def(() => ({})),
    arrowContent: PropTypes.any.def(null),
    tipId: String,
    builtinPlacements: PropTypes.object,
    overlayInnerStyle: {
      type: Object,
      default: void 0
    },
    popupVisible: {
      type: Boolean,
      default: void 0
    },
    onVisibleChange: Function,
    onPopupAlign: Function
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      expose
    } = _ref;
    const triggerDOM = shallowRef();
    const getPopupElement = () => {
      const {
        prefixCls,
        tipId,
        overlayInnerStyle
      } = props;
      return [createVNode("div", {
        "class": `${prefixCls}-arrow`,
        "key": "arrow"
      }, [getPropsSlot(slots, props, "arrowContent")]), createVNode(Content$1, {
        "key": "content",
        "prefixCls": prefixCls,
        "id": tipId,
        "overlayInnerStyle": overlayInnerStyle
      }, {
        overlay: slots.overlay
      })];
    };
    const getPopupDomNode = () => {
      return triggerDOM.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      triggerDOM,
      forcePopupAlign: () => {
        var _a2;
        return (_a2 = triggerDOM.value) === null || _a2 === void 0 ? void 0 : _a2.forcePopupAlign();
      }
    });
    const destroyTooltip = shallowRef(false);
    const autoDestroy = shallowRef(false);
    watchEffect(() => {
      const {
        destroyTooltipOnHide
      } = props;
      if (typeof destroyTooltipOnHide === "boolean") {
        destroyTooltip.value = destroyTooltipOnHide;
      } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === "object") {
        const {
          keepParent
        } = destroyTooltipOnHide;
        destroyTooltip.value = keepParent === true;
        autoDestroy.value = keepParent === false;
      }
    });
    return () => {
      const {
        overlayClassName,
        trigger,
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayStyle,
        prefixCls,
        afterVisibleChange,
        transitionName,
        animation,
        placement,
        align,
        destroyTooltipOnHide,
        defaultVisible
      } = props, restProps = __rest$3(props, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible"]);
      const extraProps = _extends({}, restProps);
      if (props.visible !== void 0) {
        extraProps.popupVisible = props.visible;
      }
      const triggerProps2 = _extends(_extends(_extends({
        popupClassName: overlayClassName,
        prefixCls,
        action: trigger,
        builtinPlacements: placements,
        popupPlacement: placement,
        popupAlign: align,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltip.value,
        autoDestroy: autoDestroy.value,
        mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay
      }, extraProps), attrs), {
        onPopupVisibleChange: props.onVisibleChange || noop,
        onPopupAlign: props.onPopupAlign || noop,
        ref: triggerDOM,
        popup: getPopupElement()
      });
      return createVNode(Trigger, triggerProps2, {
        default: slots.default
      });
    };
  }
});
const abstractTooltipProps = () => ({
  trigger: [String, Array],
  open: {
    type: Boolean,
    default: void 0
  },
  /** @deprecated Please use `open` instead. */
  visible: {
    type: Boolean,
    default: void 0
  },
  placement: String,
  color: String,
  transitionName: String,
  overlayStyle: objectType(),
  overlayInnerStyle: objectType(),
  overlayClassName: String,
  openClassName: String,
  prefixCls: String,
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  getPopupContainer: Function,
  arrowPointAtCenter: {
    type: Boolean,
    default: void 0
  },
  autoAdjustOverflow: {
    type: [Boolean, Object],
    default: void 0
  },
  destroyTooltipOnHide: {
    type: Boolean,
    default: void 0
  },
  align: objectType(),
  builtinPlacements: objectType(),
  children: Array,
  /** @deprecated Please use `onOpenChange` instead. */
  onVisibleChange: Function,
  /** @deprecated Please use `onUpdate:open` instead. */
  "onUpdate:visible": Function,
  onOpenChange: Function,
  "onUpdate:open": Function
});
const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
};
const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
};
const targetOffset = [0, 0];
function getOverflowOptions(autoAdjustOverflow2) {
  if (typeof autoAdjustOverflow2 === "boolean") {
    return autoAdjustOverflow2 ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return _extends(_extends({}, autoAdjustOverflowDisabled), autoAdjustOverflow2);
}
function getPlacements(config) {
  const {
    arrowWidth = 4,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow: autoAdjustOverflow2,
    arrowPointAtCenter
  } = config;
  const placementMap = {
    left: {
      points: ["cr", "cl"],
      offset: [-4, 0]
    },
    right: {
      points: ["cl", "cr"],
      offset: [4, 0]
    },
    top: {
      points: ["bc", "tc"],
      offset: [0, -4]
    },
    bottom: {
      points: ["tc", "bc"],
      offset: [0, 4]
    },
    topLeft: {
      points: ["bl", "tc"],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ["tr", "cl"],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ["br", "tc"],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ["tl", "cr"],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ["tr", "bc"],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ["bl", "cr"],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ["tl", "bc"],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ["br", "cl"],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach((key) => {
    placementMap[key] = arrowPointAtCenter ? _extends(_extends({}, placementMap[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2),
      targetOffset
    }) : _extends(_extends({}, placements[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2)
    });
    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
function firstNotUndefined() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  for (let i2 = 0, len = arr.length; i2 < len; i2++) {
    if (arr[i2] !== void 0) {
      return arr[i2];
    }
  }
  return void 0;
}
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
function isPresetColor(color) {
  let includeInverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (includeInverse) {
    return [...inverseColors, ...PresetColors].includes(color);
  }
  return PresetColors.includes(color);
}
function parseColor(prefixCls, color) {
  const isInternalColor = isPresetColor(color);
  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    arrowStyle["--antd-arrow-background-color"] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}
function connectArrowCls(classList) {
  let showArrowCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return classList.map((cls) => `${showArrowCls}${cls}`).join(",");
}
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffset(options) {
  const maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  const {
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  } = options;
  const arrowInnerOffset = sizePopupArrow / 2 - Math.ceil(borderRadiusOuter * (Math.sqrt(2) - 1));
  const dropdownArrowOffset = (contentRadius > 12 ? contentRadius + 2 : 12) - arrowInnerOffset;
  const dropdownArrowOffsetVertical = limitVerticalRadius ? maxVerticalContentRadius - arrowInnerOffset : dropdownArrowOffset;
  return {
    dropdownArrowOffset,
    dropdownArrowOffsetVertical
  };
}
function getArrowStyle(token2, options) {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    borderRadiusXS,
    borderRadiusOuter,
    boxShadowPopoverArrow
  } = token2;
  const {
    colorBg,
    showArrowCls,
    contentRadius = token2.borderRadiusLG,
    limitVerticalRadius
  } = options;
  const {
    dropdownArrowOffsetVertical,
    dropdownArrowOffset
  } = getArrowOffset({
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  });
  const dropdownArrowDistance = sizePopupArrow / 2 + marginXXS;
  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [_extends(_extends({
        position: "absolute",
        zIndex: 1,
        display: "block"
      }, roundedArrow(sizePopupArrow, borderRadiusXS, borderRadiusOuter, colorBg, boxShadowPopoverArrow)), {
        "&:before": {
          background: colorBg
        }
      })],
      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      [[`&-placement-top ${componentCls}-arrow`, `&-placement-topLeft ${componentCls}-arrow`, `&-placement-topRight ${componentCls}-arrow`].join(",")]: {
        bottom: 0,
        transform: "translateY(100%) rotate(180deg)"
      },
      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateX(-50%) translateY(100%) rotate(180deg)"
      },
      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Bottom
      [[`&-placement-bottom ${componentCls}-arrow`, `&-placement-bottomLeft ${componentCls}-arrow`, `&-placement-bottomRight ${componentCls}-arrow`].join(",")]: {
        top: 0,
        transform: `translateY(-100%)`
      },
      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: `translateX(-50%) translateY(-100%)`
      },
      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Left
      [[`&-placement-left ${componentCls}-arrow`, `&-placement-leftTop ${componentCls}-arrow`, `&-placement-leftBottom ${componentCls}-arrow`].join(",")]: {
        right: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(100%) rotate(90deg)"
      },
      [`&-placement-left ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(100%) rotate(90deg)"
      },
      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // >>>>> Right
      [[`&-placement-right ${componentCls}-arrow`, `&-placement-rightTop ${componentCls}-arrow`, `&-placement-rightBottom ${componentCls}-arrow`].join(",")]: {
        left: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-right ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // =========================== Offset ============================
      // Offset the popover to account for the dropdown arrow
      // >>>>> Top
      [connectArrowCls([`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`], showArrowCls)]: {
        paddingBottom: dropdownArrowDistance
      },
      // >>>>> Bottom
      [connectArrowCls([`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`], showArrowCls)]: {
        paddingTop: dropdownArrowDistance
      },
      // >>>>> Left
      [connectArrowCls([`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`], showArrowCls)]: {
        paddingRight: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      },
      // >>>>> Right
      [connectArrowCls([`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`], showArrowCls)]: {
        paddingLeft: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      }
    }
  };
}
const genTooltipStyle = (token2) => {
  const {
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    tooltipRadiusOuter
  } = token2;
  return [
    {
      [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token2)), {
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        "&": [{
          width: "max-content"
        }, {
          width: "intrinsic"
        }],
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        "&-hidden": {
          display: "none"
        },
        "--antd-arrow-background-color": tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${paddingSM / 2}px ${paddingXS}px`,
          color: tooltipColor,
          textAlign: "start",
          textDecoration: "none",
          wordWrap: "break-word",
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: Math.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        }
      }), genPresetColor(token2, (colorKey, _ref) => {
        let {
          darkColor
        } = _ref;
        return {
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor
            },
            [`${componentCls}-arrow`]: {
              "--antd-arrow-background-color": darkColor
            }
          }
        };
      })), {
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      })
    },
    // Arrow Style
    getArrowStyle(merge(token2, {
      borderRadiusOuter: tooltipRadiusOuter
    }), {
      colorBg: "var(--antd-arrow-background-color)",
      showArrowCls: "",
      contentRadius: tooltipBorderRadius,
      limitVerticalRadius: true
    }),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none"
      }
    }
  ];
};
const useStyle$5 = (prefixCls, injectStyle) => {
  const useOriginHook = genComponentStyleHook("Tooltip", (token2) => {
    if ((injectStyle === null || injectStyle === void 0 ? void 0 : injectStyle.value) === false) {
      return [];
    }
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgDefault,
      borderRadiusOuter
    } = token2;
    const TooltipToken = merge(token2, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgDefault,
      tooltipRadiusOuter: borderRadiusOuter > 4 ? 4 : borderRadiusOuter
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token2, "zoom-big-fast")];
  }, (_ref2) => {
    let {
      zIndexPopupBase,
      colorBgSpotlight
    } = _ref2;
    return {
      zIndexPopup: zIndexPopupBase + 70,
      colorBgDefault: colorBgSpotlight
    };
  });
  return useOriginHook(prefixCls);
};
const splitObject = (obj, keys2) => {
  const picked = {};
  const omitted = _extends({}, obj);
  keys2.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked,
    omitted
  };
};
const tooltipProps = () => _extends(_extends({}, abstractTooltipProps()), {
  title: PropTypes.any
});
const ToolTip = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATooltip",
  inheritAttrs: false,
  props: initDefaultProps(tooltipProps(), {
    trigger: "hover",
    align: {},
    placement: "top",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true
  }),
  slots: Object,
  // emits: ['update:visible', 'visibleChange'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs,
      expose
    } = _ref;
    const {
      prefixCls,
      getPopupContainer,
      direction,
      rootPrefixCls
    } = useConfigInject("tooltip", props);
    const mergedOpen = computed(() => {
      var _a2;
      return (_a2 = props.open) !== null && _a2 !== void 0 ? _a2 : props.visible;
    });
    const innerOpen = ref(firstNotUndefined([props.open, props.visible]));
    const tooltip = ref();
    let rafId;
    watch(mergedOpen, (val) => {
      wrapperRaf.cancel(rafId);
      rafId = wrapperRaf(() => {
        innerOpen.value = !!val;
      });
    });
    const isNoTitle = () => {
      var _a2;
      const title = (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : slots.title;
      return !title && title !== 0;
    };
    const handleVisibleChange = (val) => {
      const noTitle = isNoTitle();
      if (mergedOpen.value === void 0) {
        innerOpen.value = noTitle ? false : val;
      }
      if (!noTitle) {
        emit("update:visible", val);
        emit("visibleChange", val);
        emit("update:open", val);
        emit("openChange", val);
      }
    };
    const getPopupDomNode = () => {
      return tooltip.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      open: innerOpen,
      forcePopupAlign: () => {
        var _a2;
        return (_a2 = tooltip.value) === null || _a2 === void 0 ? void 0 : _a2.forcePopupAlign();
      }
    });
    const tooltipPlacements = computed(() => {
      const {
        builtinPlacements,
        arrowPointAtCenter,
        autoAdjustOverflow: autoAdjustOverflow2
      } = props;
      return builtinPlacements || getPlacements({
        arrowPointAtCenter,
        autoAdjustOverflow: autoAdjustOverflow2
      });
    });
    const isTrueProps = (val) => {
      return val || val === "";
    };
    const getDisabledCompatibleChildren = (ele) => {
      const elementType = ele.type;
      if (typeof elementType === "object" && ele.props) {
        if ((elementType.__ANT_BUTTON === true || elementType === "button") && isTrueProps(ele.props.disabled) || elementType.__ANT_SWITCH === true && (isTrueProps(ele.props.disabled) || isTrueProps(ele.props.loading)) || elementType.__ANT_RADIO === true && isTrueProps(ele.props.disabled)) {
          const {
            picked,
            omitted
          } = splitObject(getStyle$1(ele), ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]);
          const spanStyle = _extends(_extends({
            display: "inline-block"
          }, picked), {
            cursor: "not-allowed",
            lineHeight: 1,
            width: ele.props && ele.props.block ? "100%" : void 0
          });
          const buttonStyle = _extends(_extends({}, omitted), {
            pointerEvents: "none"
          });
          const child = cloneElement(ele, {
            style: buttonStyle
          }, true);
          return createVNode("span", {
            "style": spanStyle,
            "class": `${prefixCls.value}-disabled-compatible-wrapper`
          }, [child]);
        }
      }
      return ele;
    };
    const getOverlay = () => {
      var _a2, _b2;
      return (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : (_b2 = slots.title) === null || _b2 === void 0 ? void 0 : _b2.call(slots);
    };
    const onPopupAlign = (domNode, align) => {
      const placements2 = tooltipPlacements.value;
      const placement = Object.keys(placements2).find((key) => {
        var _a2, _b2;
        return placements2[key].points[0] === ((_a2 = align.points) === null || _a2 === void 0 ? void 0 : _a2[0]) && placements2[key].points[1] === ((_b2 = align.points) === null || _b2 === void 0 ? void 0 : _b2[1]);
      });
      if (placement) {
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
          top: "50%",
          left: "50%"
        };
        if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
          transformOrigin.top = `${rect.height - align.offset[1]}px`;
        } else if (placement.indexOf("Top") >= 0 || placement.indexOf("bottom") >= 0) {
          transformOrigin.top = `${-align.offset[1]}px`;
        }
        if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
          transformOrigin.left = `${rect.width - align.offset[0]}px`;
        } else if (placement.indexOf("right") >= 0 || placement.indexOf("Left") >= 0) {
          transformOrigin.left = `${-align.offset[0]}px`;
        }
        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
      }
    };
    const colorInfo = computed(() => parseColor(prefixCls.value, props.color));
    const injectFromPopover = computed(() => attrs["data-popover-inject"]);
    const [wrapSSR, hashId] = useStyle$5(prefixCls, computed(() => !injectFromPopover.value));
    return () => {
      var _a2, _b2;
      const {
        openClassName,
        overlayClassName,
        overlayStyle,
        overlayInnerStyle
      } = props;
      let children = (_b2 = filterEmpty((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))) !== null && _b2 !== void 0 ? _b2 : null;
      children = children.length === 1 ? children[0] : children;
      let tempVisible = innerOpen.value;
      if (mergedOpen.value === void 0 && isNoTitle()) {
        tempVisible = false;
      }
      if (!children) {
        return null;
      }
      const child = getDisabledCompatibleChildren(isValidElement(children) && !isFragment(children) ? children : createVNode("span", null, [children]));
      const childCls = classNames({
        [openClassName || `${prefixCls.value}-open`]: true,
        [child.props && child.props.class]: child.props && child.props.class
      });
      const customOverlayClassName = classNames(overlayClassName, {
        [`${prefixCls.value}-rtl`]: direction.value === "rtl"
      }, colorInfo.value.className, hashId.value);
      const formattedOverlayInnerStyle = _extends(_extends({}, colorInfo.value.overlayStyle), overlayInnerStyle);
      const arrowContentStyle = colorInfo.value.arrowStyle;
      const vcTooltipProps = _extends(_extends(_extends({}, attrs), props), {
        prefixCls: prefixCls.value,
        getPopupContainer: getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value,
        builtinPlacements: tooltipPlacements.value,
        visible: tempVisible,
        ref: tooltip,
        overlayClassName: customOverlayClassName,
        overlayStyle: _extends(_extends({}, arrowContentStyle), overlayStyle),
        overlayInnerStyle: formattedOverlayInnerStyle,
        onVisibleChange: handleVisibleChange,
        onPopupAlign,
        transitionName: getTransitionName(rootPrefixCls.value, "zoom-big-fast", props.transitionName)
      });
      return wrapSSR(createVNode(Tooltip$1, vcTooltipProps, {
        default: () => [innerOpen.value ? cloneElement(child, {
          class: childCls
        }) : child],
        arrowContent: () => createVNode("span", {
          "class": `${prefixCls.value}-arrow-content`
        }, null),
        overlay: getOverlay
      }));
    };
  }
});
const Tooltip = withInstall(ToolTip);
function UnitNumber(_ref) {
  let {
    prefixCls,
    value,
    current,
    offset: offset2 = 0
  } = _ref;
  let style;
  if (offset2) {
    style = {
      position: "absolute",
      top: `${offset2}00%`,
      left: 0
    };
  }
  return createVNode("p", {
    "style": style,
    "class": classNames(`${prefixCls}-only-unit`, {
      current
    })
  }, [value]);
}
function getOffset$1(start, end, unit) {
  let index2 = start;
  let offset2 = 0;
  while ((index2 + 10) % 10 !== end) {
    index2 += unit;
    offset2 += unit;
  }
  return offset2;
}
const SingleNumber = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "SingleNumber",
  props: {
    prefixCls: String,
    value: String,
    count: Number
  },
  setup(props) {
    const originValue = computed(() => Number(props.value));
    const originCount = computed(() => Math.abs(props.count));
    const state = reactive({
      prevValue: originValue.value,
      prevCount: originCount.value
    });
    const onTransitionEnd = () => {
      state.prevValue = originValue.value;
      state.prevCount = originCount.value;
    };
    const timeout = ref();
    watch(originValue, () => {
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        onTransitionEnd();
      }, 1e3);
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      clearTimeout(timeout.value);
    });
    return () => {
      let unitNodes;
      let offsetStyle = {};
      const value = originValue.value;
      if (state.prevValue === value || Number.isNaN(value) || Number.isNaN(state.prevValue)) {
        unitNodes = [UnitNumber(_extends(_extends({}, props), {
          current: true
        }))];
        offsetStyle = {
          transition: "none"
        };
      } else {
        unitNodes = [];
        const end = value + 10;
        const unitNumberList = [];
        for (let index2 = value; index2 <= end; index2 += 1) {
          unitNumberList.push(index2);
        }
        const prevIndex = unitNumberList.findIndex((n2) => n2 % 10 === state.prevValue);
        unitNodes = unitNumberList.map((n2, index2) => {
          const singleUnit = n2 % 10;
          return UnitNumber(_extends(_extends({}, props), {
            value: singleUnit,
            offset: index2 - prevIndex,
            current: index2 === prevIndex
          }));
        });
        const unit = state.prevCount < originCount.value ? 1 : -1;
        offsetStyle = {
          transform: `translateY(${-getOffset$1(state.prevValue, value, unit)}00%)`
        };
      }
      return createVNode("span", {
        "class": `${props.prefixCls}-only`,
        "style": offsetStyle,
        "onTransitionend": () => onTransitionEnd()
      }, [unitNodes]);
    };
  }
});
var __rest$2 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
const scrollNumberProps = {
  prefixCls: String,
  count: PropTypes.any,
  component: String,
  title: PropTypes.any,
  show: Boolean
};
const ScrollNumber = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ScrollNumber",
  inheritAttrs: false,
  props: scrollNumberProps,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("scroll-number", props);
    return () => {
      var _a2;
      const _b2 = _extends(_extends({}, props), attrs), {
        prefixCls: customizePrefixCls,
        count,
        title,
        show,
        component: Tag = "sup",
        class: className,
        style
      } = _b2, restProps = __rest$2(_b2, ["prefixCls", "count", "title", "show", "component", "class", "style"]);
      const newProps = _extends(_extends({}, restProps), {
        style,
        "data-show": props.show,
        class: classNames(prefixCls.value, className),
        title
      });
      let numberNodes = count;
      if (count && Number(count) % 1 === 0) {
        const numberList = String(count).split("");
        numberNodes = numberList.map((num, i2) => createVNode(SingleNumber, {
          "prefixCls": prefixCls.value,
          "count": Number(count),
          "value": num,
          "key": numberList.length - i2
        }, null));
      }
      if (style && style.borderColor) {
        newProps.style = _extends(_extends({}, style), {
          boxShadow: `0 0 0 1px ${style.borderColor} inset`
        });
      }
      const children = filterEmpty((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      if (children && children.length) {
        return cloneElement(children, {
          class: classNames(`${prefixCls.value}-custom-component`)
        }, false);
      }
      return createVNode(Tag, newProps, {
        default: () => [numberNodes]
      });
    };
  }
});
const antStatusProcessing = new Keyframe("antStatusProcessing", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(2.4)",
    opacity: 0
  }
});
const antZoomBadgeIn = new Keyframe("antZoomBadgeIn", {
  "0%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1) translate(50%, -50%)"
  }
});
const antZoomBadgeOut = new Keyframe("antZoomBadgeOut", {
  "0%": {
    transform: "scale(1) translate(50%, -50%)"
  },
  "100%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  }
});
const antNoWrapperZoomBadgeIn = new Keyframe("antNoWrapperZoomBadgeIn", {
  "0%": {
    transform: "scale(0)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)"
  }
});
const antNoWrapperZoomBadgeOut = new Keyframe("antNoWrapperZoomBadgeOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0)",
    opacity: 0
  }
});
const antBadgeLoadingCircle = new Keyframe("antBadgeLoadingCircle", {
  "0%": {
    transformOrigin: "50%"
  },
  "100%": {
    transform: "translate(50%, -50%) rotate(360deg)",
    transformOrigin: "50%"
  }
});
const genSharedBadgeStyle = (token2) => {
  const {
    componentCls,
    iconCls,
    antCls,
    badgeFontHeight,
    badgeShadowSize,
    badgeHeightSm,
    motionDurationSlow,
    badgeStatusSize,
    marginXS,
    badgeRibbonOffset
  } = token2;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;
  const colorPreset = genPresetColor(token2, (colorKey, _ref) => {
    let {
      darkColor
    } = _ref;
    return {
      [`&${componentCls} ${componentCls}-color-${colorKey}`]: {
        background: darkColor,
        [`&:not(${componentCls}-count)`]: {
          color: darkColor
        }
      }
    };
  });
  const statusRibbonPreset = genPresetColor(token2, (colorKey, _ref2) => {
    let {
      darkColor
    } = _ref2;
    return {
      [`&${ribbonPrefixCls}-color-${colorKey}`]: {
        background: darkColor,
        color: darkColor
      }
    };
  });
  return {
    [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token2)), {
      position: "relative",
      display: "inline-block",
      width: "fit-content",
      lineHeight: 1,
      [`${componentCls}-count`]: {
        zIndex: token2.badgeZIndex,
        minWidth: token2.badgeHeight,
        height: token2.badgeHeight,
        color: token2.badgeTextColor,
        fontWeight: token2.badgeFontWeight,
        fontSize: token2.badgeFontSize,
        lineHeight: `${token2.badgeHeight}px`,
        whiteSpace: "nowrap",
        textAlign: "center",
        background: token2.badgeColor,
        borderRadius: token2.badgeHeight / 2,
        boxShadow: `0 0 0 ${badgeShadowSize}px ${token2.badgeShadowColor}`,
        transition: `background ${token2.motionDurationMid}`,
        a: {
          color: token2.badgeTextColor
        },
        "a:hover": {
          color: token2.badgeTextColor
        },
        "a:hover &": {
          background: token2.badgeColorHover
        }
      },
      [`${componentCls}-count-sm`]: {
        minWidth: badgeHeightSm,
        height: badgeHeightSm,
        fontSize: token2.badgeFontSizeSm,
        lineHeight: `${badgeHeightSm}px`,
        borderRadius: badgeHeightSm / 2
      },
      [`${componentCls}-multiple-words`]: {
        padding: `0 ${token2.paddingXS}px`
      },
      [`${componentCls}-dot`]: {
        zIndex: token2.badgeZIndex,
        width: token2.badgeDotSize,
        minWidth: token2.badgeDotSize,
        height: token2.badgeDotSize,
        background: token2.badgeColor,
        borderRadius: "100%",
        boxShadow: `0 0 0 ${badgeShadowSize}px ${token2.badgeShadowColor}`
      },
      [`${componentCls}-dot${numberPrefixCls}`]: {
        transition: `background ${motionDurationSlow}`
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        transform: "translate(50%, -50%)",
        transformOrigin: "100% 0%",
        [`&${iconCls}-spin`]: {
          animationName: antBadgeLoadingCircle,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }
      },
      [`&${componentCls}-status`]: {
        lineHeight: "inherit",
        verticalAlign: "baseline",
        [`${componentCls}-status-dot`]: {
          position: "relative",
          top: -1,
          display: "inline-block",
          width: badgeStatusSize,
          height: badgeStatusSize,
          verticalAlign: "middle",
          borderRadius: "50%"
        },
        [`${componentCls}-status-success`]: {
          backgroundColor: token2.colorSuccess
        },
        [`${componentCls}-status-processing`]: {
          overflow: "visible",
          color: token2.colorPrimary,
          backgroundColor: token2.colorPrimary,
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            width: "100%",
            height: "100%",
            borderWidth: badgeShadowSize,
            borderStyle: "solid",
            borderColor: "inherit",
            borderRadius: "50%",
            animationName: antStatusProcessing,
            animationDuration: token2.badgeProcessingDuration,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            content: '""'
          }
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: token2.colorTextPlaceholder
        },
        [`${componentCls}-status-error`]: {
          backgroundColor: token2.colorError
        },
        [`${componentCls}-status-warning`]: {
          backgroundColor: token2.colorWarning
        },
        [`${componentCls}-status-text`]: {
          marginInlineStart: marginXS,
          color: token2.colorText,
          fontSize: token2.fontSize
        }
      }
    }), colorPreset), {
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animationName: antZoomBadgeIn,
        animationDuration: token2.motionDurationSlow,
        animationTimingFunction: token2.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`${componentCls}-zoom-leave`]: {
        animationName: antZoomBadgeOut,
        animationDuration: token2.motionDurationSlow,
        animationTimingFunction: token2.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animationName: antNoWrapperZoomBadgeIn,
          animationDuration: token2.motionDurationSlow,
          animationTimingFunction: token2.motionEaseOutBack
        },
        [`${componentCls}-zoom-leave`]: {
          animationName: antNoWrapperZoomBadgeOut,
          animationDuration: token2.motionDurationSlow,
          animationTimingFunction: token2.motionEaseOutBack
        },
        [`&:not(${componentCls}-status)`]: {
          verticalAlign: "middle"
        },
        [`${numberPrefixCls}-custom-component, ${componentCls}-count`]: {
          transform: "none"
        },
        [`${numberPrefixCls}-custom-component, ${numberPrefixCls}`]: {
          position: "relative",
          top: "auto",
          display: "block",
          transformOrigin: "50% 50%"
        }
      },
      [`${numberPrefixCls}`]: {
        overflow: "hidden",
        [`${numberPrefixCls}-only`]: {
          position: "relative",
          display: "inline-block",
          height: token2.badgeHeight,
          transition: `all ${token2.motionDurationSlow} ${token2.motionEaseOutBack}`,
          WebkitTransformStyle: "preserve-3d",
          WebkitBackfaceVisibility: "hidden",
          [`> p${numberPrefixCls}-only-unit`]: {
            height: token2.badgeHeight,
            margin: 0,
            WebkitTransformStyle: "preserve-3d",
            WebkitBackfaceVisibility: "hidden"
          }
        },
        [`${numberPrefixCls}-symbol`]: {
          verticalAlign: "top"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl",
        [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
          transform: "translate(-50%, -50%)"
        }
      }
    }),
    [`${ribbonWrapperPrefixCls}`]: {
      position: "relative"
    },
    [`${ribbonPrefixCls}`]: _extends(_extends(_extends(_extends({}, resetComponent(token2)), {
      position: "absolute",
      top: marginXS,
      padding: `0 ${token2.paddingXS}px`,
      color: token2.colorPrimary,
      lineHeight: `${badgeFontHeight}px`,
      whiteSpace: "nowrap",
      backgroundColor: token2.colorPrimary,
      borderRadius: token2.borderRadiusSM,
      [`${ribbonPrefixCls}-text`]: {
        color: token2.colorTextLightSolid
      },
      [`${ribbonPrefixCls}-corner`]: {
        position: "absolute",
        top: "100%",
        width: badgeRibbonOffset,
        height: badgeRibbonOffset,
        color: "currentcolor",
        border: `${badgeRibbonOffset / 2}px solid`,
        transform: token2.badgeRibbonCornerTransform,
        transformOrigin: "top",
        filter: token2.badgeRibbonCornerFilter
      }
    }), statusRibbonPreset), {
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: -badgeRibbonOffset,
        borderEndEndRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderInlineEndColor: "transparent",
          borderBlockEndColor: "transparent"
        }
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: -badgeRibbonOffset,
        borderEndStartRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderBlockEndColor: "transparent",
          borderInlineStartColor: "transparent"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
const useStyle$4 = genComponentStyleHook("Badge", (token2) => {
  const {
    fontSize,
    lineHeight,
    fontSizeSM,
    lineWidth,
    marginXS,
    colorBorderBg
  } = token2;
  const badgeFontHeight = Math.round(fontSize * lineHeight);
  const badgeShadowSize = lineWidth;
  const badgeZIndex = "auto";
  const badgeHeight = badgeFontHeight - 2 * badgeShadowSize;
  const badgeTextColor = token2.colorBgContainer;
  const badgeFontWeight = "normal";
  const badgeFontSize = fontSizeSM;
  const badgeColor = token2.colorError;
  const badgeColorHover = token2.colorErrorHover;
  const badgeHeightSm = fontSize;
  const badgeDotSize = fontSizeSM / 2;
  const badgeFontSizeSm = fontSizeSM;
  const badgeStatusSize = fontSizeSM / 2;
  const badgeToken = merge(token2, {
    badgeFontHeight,
    badgeShadowSize,
    badgeZIndex,
    badgeHeight,
    badgeTextColor,
    badgeFontWeight,
    badgeFontSize,
    badgeColor,
    badgeColorHover,
    badgeShadowColor: colorBorderBg,
    badgeHeightSm,
    badgeDotSize,
    badgeFontSizeSm,
    badgeStatusSize,
    badgeProcessingDuration: "1.2s",
    badgeRibbonOffset: marginXS,
    // Follow token just by Design. Not related with token
    badgeRibbonCornerTransform: "scaleY(0.75)",
    badgeRibbonCornerFilter: `brightness(75%)`
  });
  return [genSharedBadgeStyle(badgeToken)];
});
var __rest$1 = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
const ribbonProps = () => ({
  prefix: String,
  color: {
    type: String
  },
  text: PropTypes.any,
  placement: {
    type: String,
    default: "end"
  }
});
const Ribbon = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ABadgeRibbon",
  inheritAttrs: false,
  props: ribbonProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("ribbon", props);
    const [wrapSSR, hashId] = useStyle$4(prefixCls);
    const colorInPreset = computed(() => isPresetColor(props.color, false));
    const ribbonCls = computed(() => [prefixCls.value, `${prefixCls.value}-placement-${props.placement}`, {
      [`${prefixCls.value}-rtl`]: direction.value === "rtl",
      [`${prefixCls.value}-color-${props.color}`]: colorInPreset.value
    }]);
    return () => {
      var _a2, _b2;
      const {
        class: className,
        style
      } = attrs, restAttrs = __rest$1(attrs, ["class", "style"]);
      const colorStyle = {};
      const cornerColorStyle = {};
      if (props.color && !colorInPreset.value) {
        colorStyle.background = props.color;
        cornerColorStyle.color = props.color;
      }
      return wrapSSR(createVNode("div", _objectSpread2$1({
        "class": `${prefixCls.value}-wrapper ${hashId.value}`
      }, restAttrs), [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots), createVNode("div", {
        "class": [ribbonCls.value, className, hashId.value],
        "style": _extends(_extends({}, colorStyle), style)
      }, [createVNode("span", {
        "class": `${prefixCls.value}-text`
      }, [props.text || ((_b2 = slots.text) === null || _b2 === void 0 ? void 0 : _b2.call(slots))]), createVNode("div", {
        "class": `${prefixCls.value}-corner`,
        "style": cornerColorStyle
      }, null)])]));
    };
  }
});
const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
const badgeProps = () => ({
  /** Number to show in badge */
  count: PropTypes.any.def(null),
  showZero: {
    type: Boolean,
    default: void 0
  },
  /** Max count to show */
  overflowCount: {
    type: Number,
    default: 99
  },
  /** whether to show red dot without number */
  dot: {
    type: Boolean,
    default: void 0
  },
  prefixCls: String,
  scrollNumberPrefixCls: String,
  status: {
    type: String
  },
  size: {
    type: String,
    default: "default"
  },
  color: String,
  text: PropTypes.any,
  offset: Array,
  numberStyle: {
    type: Object,
    default: void 0
  },
  title: String
});
const Badge = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ABadge",
  Ribbon,
  inheritAttrs: false,
  props: badgeProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("badge", props);
    const [wrapSSR, hashId] = useStyle$4(prefixCls);
    const numberedDisplayCount = computed(() => {
      return props.count > props.overflowCount ? `${props.overflowCount}+` : props.count;
    });
    const isZero = computed(() => numberedDisplayCount.value === "0" || numberedDisplayCount.value === 0);
    const ignoreCount = computed(() => props.count === null || isZero.value && !props.showZero);
    const hasStatus = computed(() => (props.status !== null && props.status !== void 0 || props.color !== null && props.color !== void 0) && ignoreCount.value);
    const showAsDot = computed(() => props.dot && !isZero.value);
    const mergedCount = computed(() => showAsDot.value ? "" : numberedDisplayCount.value);
    const isHidden = computed(() => {
      const isEmpty2 = mergedCount.value === null || mergedCount.value === void 0 || mergedCount.value === "";
      return (isEmpty2 || isZero.value && !props.showZero) && !showAsDot.value;
    });
    const livingCount = ref(props.count);
    const displayCount = ref(mergedCount.value);
    const isDotRef = ref(showAsDot.value);
    watch([() => props.count, mergedCount, showAsDot], () => {
      if (!isHidden.value) {
        livingCount.value = props.count;
        displayCount.value = mergedCount.value;
        isDotRef.value = showAsDot.value;
      }
    }, {
      immediate: true
    });
    const isInternalColor = computed(() => isPresetColor(props.color, false));
    const statusCls = computed(() => ({
      [`${prefixCls.value}-status-dot`]: hasStatus.value,
      [`${prefixCls.value}-status-${props.status}`]: !!props.status,
      [`${prefixCls.value}-color-${props.color}`]: isInternalColor.value
    }));
    const statusStyle = computed(() => {
      if (props.color && !isInternalColor.value) {
        return {
          background: props.color,
          color: props.color
        };
      } else {
        return {};
      }
    });
    const scrollNumberCls = computed(() => ({
      [`${prefixCls.value}-dot`]: isDotRef.value,
      [`${prefixCls.value}-count`]: !isDotRef.value,
      [`${prefixCls.value}-count-sm`]: props.size === "small",
      [`${prefixCls.value}-multiple-words`]: !isDotRef.value && displayCount.value && displayCount.value.toString().length > 1,
      [`${prefixCls.value}-status-${props.status}`]: !!props.status,
      [`${prefixCls.value}-color-${props.color}`]: isInternalColor.value
    }));
    return () => {
      var _a2, _b2;
      const {
        offset: offset2,
        title,
        color
      } = props;
      const style = attrs.style;
      const text = getPropsSlot(slots, props, "text");
      const pre = prefixCls.value;
      const count = livingCount.value;
      let children = flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      children = children.length ? children : null;
      const visible = !!(!isHidden.value || slots.count);
      const mergedStyle = (() => {
        if (!offset2) {
          return _extends({}, style);
        }
        const offsetStyle = {
          marginTop: isNumeric(offset2[1]) ? `${offset2[1]}px` : offset2[1]
        };
        if (direction.value === "rtl") {
          offsetStyle.left = `${parseInt(offset2[0], 10)}px`;
        } else {
          offsetStyle.right = `${-parseInt(offset2[0], 10)}px`;
        }
        return _extends(_extends({}, offsetStyle), style);
      })();
      const titleNode = title !== null && title !== void 0 ? title : typeof count === "string" || typeof count === "number" ? count : void 0;
      const statusTextNode = visible || !text ? null : createVNode("span", {
        "class": `${pre}-status-text`
      }, [text]);
      const displayNode = typeof count === "object" || count === void 0 && slots.count ? cloneElement(count !== null && count !== void 0 ? count : (_b2 = slots.count) === null || _b2 === void 0 ? void 0 : _b2.call(slots), {
        style: mergedStyle
      }, false) : null;
      const badgeClassName = classNames(pre, {
        [`${pre}-status`]: hasStatus.value,
        [`${pre}-not-a-wrapper`]: !children,
        [`${pre}-rtl`]: direction.value === "rtl"
      }, attrs.class, hashId.value);
      if (!children && hasStatus.value) {
        const statusTextColor = mergedStyle.color;
        return wrapSSR(createVNode("span", _objectSpread2$1(_objectSpread2$1({}, attrs), {}, {
          "class": badgeClassName,
          "style": mergedStyle
        }), [createVNode("span", {
          "class": statusCls.value,
          "style": statusStyle.value
        }, null), createVNode("span", {
          "style": {
            color: statusTextColor
          },
          "class": `${pre}-status-text`
        }, [text])]));
      }
      const transitionProps = getTransitionProps(children ? `${pre}-zoom` : "", {
        appear: false
      });
      let scrollNumberStyle = _extends(_extends({}, mergedStyle), props.numberStyle);
      if (color && !isInternalColor.value) {
        scrollNumberStyle = scrollNumberStyle || {};
        scrollNumberStyle.background = color;
      }
      return wrapSSR(createVNode("span", _objectSpread2$1(_objectSpread2$1({}, attrs), {}, {
        "class": badgeClassName
      }), [children, createVNode(Transition, transitionProps, {
        default: () => [withDirectives(createVNode(ScrollNumber, {
          "prefixCls": props.scrollNumberPrefixCls,
          "show": visible,
          "class": scrollNumberCls.value,
          "count": displayCount.value,
          "title": titleNode,
          "style": scrollNumberStyle,
          "key": "scrollNumber"
        }, {
          default: () => [displayNode]
        }), [[vShow, visible]])]
      }), statusTextNode]));
    };
  }
});
Badge.install = function(app) {
  app.component(Badge.name, Badge);
  app.component(Ribbon.name, Ribbon);
  return app;
};
const genWaveStyle = (token2) => {
  const {
    componentCls,
    colorPrimary
  } = token2;
  return {
    [componentCls]: {
      position: "absolute",
      background: "transparent",
      pointerEvents: "none",
      boxSizing: "border-box",
      color: `var(--wave-color, ${colorPrimary})`,
      boxShadow: `0 0 0 0 currentcolor`,
      opacity: 0.2,
      // =================== Motion ===================
      "&.wave-motion-appear": {
        transition: [`box-shadow 0.4s ${token2.motionEaseOutCirc}`, `opacity 2s ${token2.motionEaseOutCirc}`].join(","),
        "&-active": {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: 0
        }
      }
    }
  };
};
const useStyle$3 = genComponentStyleHook("Wave", (token2) => [genWaveStyle(token2)]);
const WaveEffect = defineComponent({
  props: {
    target: objectType(),
    className: String
  },
  setup(props) {
    const divRef = shallowRef(null);
    const [color, setWaveColor] = useState(null);
    const [borderRadius, setBorderRadius] = useState([]);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [enabled, setEnabled] = useState(false);
    const removeDom = () => {
      var _a2;
      const holder = (_a2 = divRef.value) === null || _a2 === void 0 ? void 0 : _a2.parentElement;
      if (holder) {
        render(null, holder);
        if (holder.parentElement) {
          holder.parentElement.removeChild(holder);
        }
      }
    };
    const onTransitionend = (e2) => {
      if (e2.propertyName === "opacity") {
        removeDom();
      }
    };
    return () => {
      if (!enabled.value) {
        return null;
      }
      const waveStyle = {
        left: `${left.value}px`,
        top: `${top.value}px`,
        width: `${width.value}px`,
        height: `${height.value}px`,
        borderRadius: borderRadius.value.map((radius) => `${radius}px`).join(" ")
      };
      if (color) {
        waveStyle["--wave-color"] = color.value;
      }
      return createVNode(Transition, {
        "appear": true,
        "name": "wave-motion",
        "appearFromClass": "wave-motion-appear",
        "appearActiveClass": "wave-motion-appear",
        "appearToClass": "wave-motion-appear wave-motion-appear-active"
      }, {
        default: () => [createVNode("div", {
          "ref": divRef,
          "class": props.className,
          "style": waveStyle,
          "onTransitionend": onTransitionend
        }, null)]
      });
    };
  }
});
function showWaveEffect(node2, className) {
  const holder = (void 0).createElement("div");
  holder.style.position = "absolute";
  holder.style.left = `0px`;
  holder.style.top = `0px`;
  node2 === null || node2 === void 0 ? void 0 : node2.insertBefore(holder, node2 === null || node2 === void 0 ? void 0 : node2.firstChild);
  render(createVNode(WaveEffect, {
    "target": node2,
    "className": className
  }, null), holder);
}
function useWave(instance, className, wave) {
  function showWave() {
    var _a2;
    const node2 = findDOMNode(instance);
    if (((_a2 = wave === null || wave === void 0 ? void 0 : wave.value) === null || _a2 === void 0 ? void 0 : _a2.disabled) || !node2) {
      return;
    }
    showWaveEffect(node2, className.value);
  }
  return showWave;
}
const Wave = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Wave",
  props: {
    disabled: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const instance = getCurrentInstance();
    const {
      prefixCls,
      wave
    } = useConfigInject("wave", props);
    const [, hashId] = useStyle$3(prefixCls);
    useWave(instance, computed(() => classNames(prefixCls.value, hashId.value)), wave);
    return () => {
      var _a2;
      const children = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)[0];
      return children;
    };
  }
});
const buttonProps = () => ({
  prefixCls: String,
  type: String,
  htmlType: {
    type: String,
    default: "button"
  },
  shape: {
    type: String
  },
  size: {
    type: String
  },
  loading: {
    type: [Boolean, Object],
    default: () => false
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  ghost: {
    type: Boolean,
    default: void 0
  },
  block: {
    type: Boolean,
    default: void 0
  },
  danger: {
    type: Boolean,
    default: void 0
  },
  icon: PropTypes.any,
  href: String,
  target: String,
  title: String,
  onClick: eventType(),
  onMousedown: eventType()
});
const getCollapsedWidth = (node2) => {
  if (node2) {
    node2.style.width = "0px";
    node2.style.opacity = "0";
    node2.style.transform = "scale(0)";
  }
};
const getRealWidth = (node2) => {
  nextTick(() => {
    if (node2) {
      node2.style.width = `${node2.scrollWidth}px`;
      node2.style.opacity = "1";
      node2.style.transform = "scale(1)";
    }
  });
};
const resetStyle = (node2) => {
  if (node2 && node2.style) {
    node2.style.width = null;
    node2.style.opacity = null;
    node2.style.transform = null;
  }
};
const LoadingIcon = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LoadingIcon",
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup(props) {
    return () => {
      const {
        existIcon,
        prefixCls,
        loading
      } = props;
      if (existIcon) {
        return createVNode("span", {
          "class": `${prefixCls}-loading-icon`
        }, [createVNode(LoadingOutlined$1, null, null)]);
      }
      const visible = !!loading;
      return createVNode(Transition, {
        "name": `${prefixCls}-loading-icon-motion`,
        "onBeforeEnter": getCollapsedWidth,
        "onEnter": getRealWidth,
        "onAfterEnter": resetStyle,
        "onBeforeLeave": getRealWidth,
        "onLeave": (node2) => {
          setTimeout(() => {
            getCollapsedWidth(node2);
          });
        },
        "onAfterLeave": resetStyle
      }, {
        default: () => [visible ? createVNode("span", {
          "class": `${prefixCls}-loading-icon`
        }, [createVNode(LoadingOutlined$1, null, null)]) : null]
      });
    };
  }
});
const genButtonBorderStyle = (buttonTypeCls, borderColor) => ({
  // Border
  [`> span, > ${buttonTypeCls}`]: {
    "&:not(:last-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineEndColor: borderColor
        }
      }
    },
    "&:not(:first-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineStartColor: borderColor
        }
      }
    }
  }
});
const genGroupStyle = (token2) => {
  const {
    componentCls,
    fontSize,
    lineWidth,
    colorPrimaryHover,
    colorErrorHover
  } = token2;
  return {
    [`${componentCls}-group`]: [
      {
        position: "relative",
        display: "inline-flex",
        // Border
        [`> span, > ${componentCls}`]: {
          "&:not(:last-child)": {
            [`&, & > ${componentCls}`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0
            }
          },
          "&:not(:first-child)": {
            marginInlineStart: -lineWidth,
            [`&, & > ${componentCls}`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0
            }
          }
        },
        [componentCls]: {
          position: "relative",
          zIndex: 1,
          [`&:hover,
          &:focus,
          &:active`]: {
            zIndex: 2
          },
          "&[disabled]": {
            zIndex: 0
          }
        },
        [`${componentCls}-icon-only`]: {
          fontSize
        }
      },
      // Border Color
      genButtonBorderStyle(`${componentCls}-primary`, colorPrimaryHover),
      genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
    ]
  };
};
const genGroupStyle$1 = genGroupStyle;
function compactItemVerticalBorder(token2, parentCls) {
  return {
    // border collapse
    [`&-item:not(${parentCls}-last-item)`]: {
      marginBottom: -token2.lineWidth
    },
    "&-item": {
      "&:hover,&:focus,&:active": {
        zIndex: 2
      },
      "&[disabled]": {
        zIndex: 0
      }
    }
  };
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
      borderRadius: 0
    },
    [`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  };
}
function genCompactItemVerticalStyle(token2) {
  const compactCls = `${token2.componentCls}-compact-vertical`;
  return {
    [compactCls]: _extends(_extends({}, compactItemVerticalBorder(token2, compactCls)), compactItemBorderVerticalRadius(token2.componentCls, compactCls))
  };
}
const genSharedButtonStyle = (token2) => {
  const {
    componentCls,
    iconCls
  } = token2;
  return {
    [componentCls]: {
      outline: "none",
      position: "relative",
      display: "inline-block",
      fontWeight: 400,
      whiteSpace: "nowrap",
      textAlign: "center",
      backgroundImage: "none",
      backgroundColor: "transparent",
      border: `${token2.lineWidth}px ${token2.lineType} transparent`,
      cursor: "pointer",
      transition: `all ${token2.motionDurationMid} ${token2.motionEaseInOut}`,
      userSelect: "none",
      touchAction: "manipulation",
      lineHeight: token2.lineHeight,
      color: token2.colorText,
      "> span": {
        display: "inline-block"
      },
      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token2.marginXS
      },
      "> a": {
        color: "currentColor"
      },
      "&:not(:disabled)": _extends({}, genFocusStyle(token2)),
      // make `btn-icon-only` not too narrow
      [`&-icon-only${componentCls}-compact-item`]: {
        flex: "none"
      },
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]: {
          position: "relative",
          "&:before": {
            position: "absolute",
            top: -token2.lineWidth,
            insetInlineStart: -token2.lineWidth,
            display: "inline-block",
            width: token2.lineWidth,
            height: `calc(100% + ${token2.lineWidth * 2}px)`,
            backgroundColor: token2.colorPrimaryHover,
            content: '""'
          }
        }
      },
      // Special styles for Primary Button
      "&-compact-vertical-item": {
        [`&${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]: {
            position: "relative",
            "&:before": {
              position: "absolute",
              top: -token2.lineWidth,
              insetInlineStart: -token2.lineWidth,
              display: "inline-block",
              width: `calc(100% + ${token2.lineWidth * 2}px)`,
              height: token2.lineWidth,
              backgroundColor: token2.colorPrimaryHover,
              content: '""'
            }
          }
        }
      }
    }
  };
};
const genHoverActiveButtonStyle = (hoverStyle, activeStyle) => ({
  "&:not(:disabled)": {
    "&:hover": hoverStyle,
    "&:active": activeStyle
  }
});
const genCircleButtonStyle = (token2) => ({
  minWidth: token2.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: "50%"
});
const genRoundButtonStyle = (token2) => ({
  borderRadius: token2.controlHeight,
  paddingInlineStart: token2.controlHeight / 2,
  paddingInlineEnd: token2.controlHeight / 2
});
const genDisabledStyle = (token2) => ({
  cursor: "not-allowed",
  borderColor: token2.colorBorder,
  color: token2.colorTextDisabled,
  backgroundColor: token2.colorBgContainerDisabled,
  boxShadow: "none"
});
const genGhostButtonStyle = (btnCls, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({
  [`&${btnCls}-background-ghost`]: _extends(_extends({
    color: textColor || void 0,
    backgroundColor: "transparent",
    borderColor: borderColor || void 0,
    boxShadow: "none"
  }, genHoverActiveButtonStyle(_extends({
    backgroundColor: "transparent"
  }, hoverStyle), _extends({
    backgroundColor: "transparent"
  }, activeStyle))), {
    "&:disabled": {
      cursor: "not-allowed",
      color: textColorDisabled || void 0,
      borderColor: borderColorDisabled || void 0
    }
  })
});
const genSolidDisabledButtonStyle = (token2) => ({
  "&:disabled": _extends({}, genDisabledStyle(token2))
});
const genSolidButtonStyle = (token2) => _extends({}, genSolidDisabledButtonStyle(token2));
const genPureDisabledButtonStyle = (token2) => ({
  "&:disabled": {
    cursor: "not-allowed",
    color: token2.colorTextDisabled
  }
});
const genDefaultButtonStyle = (token2) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token2)), {
  backgroundColor: token2.colorBgContainer,
  borderColor: token2.colorBorder,
  boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.controlTmpOutline}`
}), genHoverActiveButtonStyle({
  color: token2.colorPrimaryHover,
  borderColor: token2.colorPrimaryHover
}, {
  color: token2.colorPrimaryActive,
  borderColor: token2.colorPrimaryActive
})), genGhostButtonStyle(token2.componentCls, token2.colorBgContainer, token2.colorBgContainer, token2.colorTextDisabled, token2.colorBorder)), {
  [`&${token2.componentCls}-dangerous`]: _extends(_extends(_extends({
    color: token2.colorError,
    borderColor: token2.colorError
  }, genHoverActiveButtonStyle({
    color: token2.colorErrorHover,
    borderColor: token2.colorErrorBorderHover
  }, {
    color: token2.colorErrorActive,
    borderColor: token2.colorErrorActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder)), genSolidDisabledButtonStyle(token2))
});
const genPrimaryButtonStyle = (token2) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token2)), {
  color: token2.colorTextLightSolid,
  backgroundColor: token2.colorPrimary,
  boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.controlOutline}`
}), genHoverActiveButtonStyle({
  color: token2.colorTextLightSolid,
  backgroundColor: token2.colorPrimaryHover
}, {
  color: token2.colorTextLightSolid,
  backgroundColor: token2.colorPrimaryActive
})), genGhostButtonStyle(token2.componentCls, token2.colorPrimary, token2.colorPrimary, token2.colorTextDisabled, token2.colorBorder, {
  color: token2.colorPrimaryHover,
  borderColor: token2.colorPrimaryHover
}, {
  color: token2.colorPrimaryActive,
  borderColor: token2.colorPrimaryActive
})), {
  [`&${token2.componentCls}-dangerous`]: _extends(_extends(_extends({
    backgroundColor: token2.colorError,
    boxShadow: `0 ${token2.controlOutlineWidth}px 0 ${token2.colorErrorOutline}`
  }, genHoverActiveButtonStyle({
    backgroundColor: token2.colorErrorHover
  }, {
    backgroundColor: token2.colorErrorActive
  })), genGhostButtonStyle(token2.componentCls, token2.colorError, token2.colorError, token2.colorTextDisabled, token2.colorBorder, {
    color: token2.colorErrorHover,
    borderColor: token2.colorErrorHover
  }, {
    color: token2.colorErrorActive,
    borderColor: token2.colorErrorActive
  })), genSolidDisabledButtonStyle(token2))
});
const genDashedButtonStyle = (token2) => _extends(_extends({}, genDefaultButtonStyle(token2)), {
  borderStyle: "dashed"
});
const genLinkButtonStyle = (token2) => _extends(_extends(_extends({
  color: token2.colorLink
}, genHoverActiveButtonStyle({
  color: token2.colorLinkHover
}, {
  color: token2.colorLinkActive
})), genPureDisabledButtonStyle(token2)), {
  [`&${token2.componentCls}-dangerous`]: _extends(_extends({
    color: token2.colorError
  }, genHoverActiveButtonStyle({
    color: token2.colorErrorHover
  }, {
    color: token2.colorErrorActive
  })), genPureDisabledButtonStyle(token2))
});
const genTextButtonStyle = (token2) => _extends(_extends(_extends({}, genHoverActiveButtonStyle({
  color: token2.colorText,
  backgroundColor: token2.colorBgTextHover
}, {
  color: token2.colorText,
  backgroundColor: token2.colorBgTextActive
})), genPureDisabledButtonStyle(token2)), {
  [`&${token2.componentCls}-dangerous`]: _extends(_extends({
    color: token2.colorError
  }, genPureDisabledButtonStyle(token2)), genHoverActiveButtonStyle({
    color: token2.colorErrorHover,
    backgroundColor: token2.colorErrorBg
  }, {
    color: token2.colorErrorHover,
    backgroundColor: token2.colorErrorBg
  }))
});
const genDisabledButtonStyle = (token2) => _extends(_extends({}, genDisabledStyle(token2)), {
  [`&${token2.componentCls}:hover`]: _extends({}, genDisabledStyle(token2))
});
const genTypeButtonStyle = (token2) => {
  const {
    componentCls
  } = token2;
  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token2),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token2),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token2),
    [`${componentCls}-link`]: genLinkButtonStyle(token2),
    [`${componentCls}-text`]: genTextButtonStyle(token2),
    [`${componentCls}-disabled`]: genDisabledButtonStyle(token2)
  };
};
const genSizeButtonStyle = function(token2) {
  let sizePrefixCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  const {
    componentCls,
    iconCls,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    buttonPaddingHorizontal
  } = token2;
  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth;
  const iconOnlyCls = `${componentCls}-icon-only`;
  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius,
        [`&${iconOnlyCls}`]: {
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          [`&${componentCls}-round`]: {
            width: "auto"
          },
          "> span": {
            transform: "scale(1.143)"
            // 14px -> 16px
          }
        },
        // Loading
        [`&${componentCls}-loading`]: {
          opacity: token2.opacityLoading,
          cursor: "default"
        },
        [`${componentCls}-loading-icon`]: {
          transition: `width ${token2.motionDurationSlow} ${token2.motionEaseInOut}, opacity ${token2.motionDurationSlow} ${token2.motionEaseInOut}`
        },
        [`&:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]: {
          marginInlineEnd: token2.marginXS
        }
      }
    },
    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token2)
    },
    {
      [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token2)
    }
  ];
};
const genSizeBaseButtonStyle = (token2) => genSizeButtonStyle(token2);
const genSizeSmallButtonStyle = (token2) => {
  const smallToken = merge(token2, {
    controlHeight: token2.controlHeightSM,
    padding: token2.paddingXS,
    buttonPaddingHorizontal: 8,
    borderRadius: token2.borderRadiusSM
  });
  return genSizeButtonStyle(smallToken, `${token2.componentCls}-sm`);
};
const genSizeLargeButtonStyle = (token2) => {
  const largeToken = merge(token2, {
    controlHeight: token2.controlHeightLG,
    fontSize: token2.fontSizeLG,
    borderRadius: token2.borderRadiusLG
  });
  return genSizeButtonStyle(largeToken, `${token2.componentCls}-lg`);
};
const genBlockButtonStyle = (token2) => {
  const {
    componentCls
  } = token2;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: "100%"
      }
    }
  };
};
const useStyle$2 = genComponentStyleHook("Button", (token2) => {
  const {
    controlTmpOutline,
    paddingContentHorizontal
  } = token2;
  const buttonToken = merge(token2, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal
  });
  return [
    // Shared
    genSharedButtonStyle(buttonToken),
    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),
    // Block
    genBlockButtonStyle(buttonToken),
    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),
    // Button Group
    genGroupStyle$1(buttonToken),
    // Space Compact
    genCompactItemStyle(token2, {
      focus: false
    }),
    genCompactItemVerticalStyle(token2)
  ];
});
const buttonGroupProps = () => ({
  prefixCls: String,
  size: {
    type: String
  }
});
const GroupSizeContext = createContext();
const ButtonGroup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButtonGroup",
  props: buttonGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("btn-group", props);
    const [, , hashId] = useToken();
    GroupSizeContext.useProvide(reactive({
      size: computed(() => props.size)
    }));
    const classes = computed(() => {
      const {
        size
      } = props;
      let sizeCls = "";
      switch (size) {
        case "large":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          devWarning(!size, "Button.Group", "Invalid prop `size`.");
      }
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-${sizeCls}`]: sizeCls,
        [`${prefixCls.value}-rtl`]: direction.value === "rtl",
        [hashId.value]: true
      };
    });
    return () => {
      var _a2;
      return createVNode("div", {
        "class": classes.value
      }, [flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))]);
    };
  }
});
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isUnBorderedButtonType(type) {
  return type === "text" || type === "link";
}
const Button = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButton",
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(buttonProps(), {
    type: "default"
  }),
  slots: Object,
  // emits: ['click', 'mousedown'],
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit,
      expose
    } = _ref;
    const {
      prefixCls,
      autoInsertSpaceInButton,
      direction,
      size
    } = useConfigInject("btn", props);
    const [wrapSSR, hashId] = useStyle$2(prefixCls);
    const groupSizeContext = GroupSizeContext.useInject();
    const disabledContext = useInjectDisabled();
    const mergedDisabled = computed(() => {
      var _a2;
      return (_a2 = props.disabled) !== null && _a2 !== void 0 ? _a2 : disabledContext.value;
    });
    const buttonNodeRef = shallowRef(null);
    const delayTimeoutRef = shallowRef(void 0);
    let isNeedInserted = false;
    const innerLoading = shallowRef(false);
    const hasTwoCNChar = shallowRef(false);
    const autoInsertSpace = computed(() => autoInsertSpaceInButton.value !== false);
    const {
      compactSize,
      compactItemClassnames
    } = useCompactItemContext(prefixCls, direction);
    const loadingOrDelay = computed(() => typeof props.loading === "object" && props.loading.delay ? props.loading.delay || true : !!props.loading);
    watch(loadingOrDelay, (val) => {
      clearTimeout(delayTimeoutRef.value);
      if (typeof loadingOrDelay.value === "number") {
        delayTimeoutRef.value = setTimeout(() => {
          innerLoading.value = val;
        }, loadingOrDelay.value);
      } else {
        innerLoading.value = val;
      }
    }, {
      immediate: true
    });
    const classes = computed(() => {
      const {
        type,
        shape = "default",
        ghost,
        block,
        danger
      } = props;
      const pre = prefixCls.value;
      const sizeClassNameMap = {
        large: "lg",
        small: "sm",
        middle: void 0
      };
      const sizeFullname = compactSize.value || (groupSizeContext === null || groupSizeContext === void 0 ? void 0 : groupSizeContext.size) || size.value;
      const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
      return [compactItemClassnames.value, {
        [hashId.value]: true,
        [`${pre}`]: true,
        [`${pre}-${shape}`]: shape !== "default" && shape,
        [`${pre}-${type}`]: type,
        [`${pre}-${sizeCls}`]: sizeCls,
        [`${pre}-loading`]: innerLoading.value,
        [`${pre}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
        [`${pre}-two-chinese-chars`]: hasTwoCNChar.value && autoInsertSpace.value,
        [`${pre}-block`]: block,
        [`${pre}-dangerous`]: !!danger,
        [`${pre}-rtl`]: direction.value === "rtl"
      }];
    });
    const fixTwoCNChar = () => {
      const node2 = buttonNodeRef.value;
      if (!node2 || autoInsertSpaceInButton.value === false) {
        return;
      }
      const buttonText = node2.textContent;
      if (isNeedInserted && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value) {
          hasTwoCNChar.value = true;
        }
      } else if (hasTwoCNChar.value) {
        hasTwoCNChar.value = false;
      }
    };
    const handleClick = (event) => {
      if (innerLoading.value || mergedDisabled.value) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    const handleMousedown = (event) => {
      emit("mousedown", event);
    };
    const insertSpace = (child, needInserted) => {
      const SPACE = needInserted ? " " : "";
      if (child.type === Text) {
        let text = child.children.trim();
        if (isTwoCNChar(text)) {
          text = text.split("").join(SPACE);
        }
        return createVNode("span", null, [text]);
      }
      return child;
    };
    watchEffect(() => {
      devWarning(!(props.ghost && isUnBorderedButtonType(props.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    });
    onUpdated(fixTwoCNChar);
    const focus = () => {
      var _a2;
      (_a2 = buttonNodeRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      (_a2 = buttonNodeRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur();
    };
    expose({
      focus,
      blur
    });
    return () => {
      var _a2, _b2;
      const {
        icon = (_a2 = slots.icon) === null || _a2 === void 0 ? void 0 : _a2.call(slots)
      } = props;
      const children = flattenChildren((_b2 = slots.default) === null || _b2 === void 0 ? void 0 : _b2.call(slots));
      isNeedInserted = children.length === 1 && !icon && !isUnBorderedButtonType(props.type);
      const {
        type,
        htmlType,
        href,
        title,
        target
      } = props;
      const iconType = innerLoading.value ? "loading" : icon;
      const buttonProps2 = _extends(_extends({}, attrs), {
        title,
        disabled: mergedDisabled.value,
        class: [classes.value, attrs.class, {
          [`${prefixCls.value}-icon-only`]: children.length === 0 && !!iconType
        }],
        onClick: handleClick,
        onMousedown: handleMousedown
      });
      if (!mergedDisabled.value) {
        delete buttonProps2.disabled;
      }
      const iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
        "existIcon": !!icon,
        "prefixCls": prefixCls.value,
        "loading": !!innerLoading.value
      }, null);
      const kids = children.map((child) => insertSpace(child, isNeedInserted && autoInsertSpace.value));
      if (href !== void 0) {
        return wrapSSR(createVNode("a", _objectSpread2$1(_objectSpread2$1({}, buttonProps2), {}, {
          "href": href,
          "target": target,
          "ref": buttonNodeRef
        }), [iconNode, kids]));
      }
      let buttonNode = createVNode("button", _objectSpread2$1(_objectSpread2$1({}, buttonProps2), {}, {
        "ref": buttonNodeRef,
        "type": htmlType
      }), [iconNode, kids]);
      if (!isUnBorderedButtonType(type)) {
        const _buttonNode = /* @__PURE__ */ function() {
          return buttonNode;
        }();
        buttonNode = createVNode(Wave, {
          "ref": "wave",
          "disabled": !!innerLoading.value
        }, {
          default: () => [_buttonNode]
        });
      }
      return wrapSSR(buttonNode);
    };
  }
});
Button.Group = ButtonGroup;
Button.install = function(app) {
  app.component(Button.name, Button);
  app.component(ButtonGroup.name, ButtonGroup);
  return app;
};
var FileTextOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" } }] }, "name": "file-text", "theme": "outlined" };
const FileTextOutlinedSvg = FileTextOutlined$2;
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var FileTextOutlined = function FileTextOutlined2(props, context) {
  var p = _objectSpread$2({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$2({}, p, {
    "icon": FileTextOutlinedSvg
  }), null);
};
FileTextOutlined.displayName = "FileTextOutlined";
FileTextOutlined.inheritAttrs = false;
const FileTextOutlined$1 = FileTextOutlined;
const floatButtonProps = () => {
  return {
    prefixCls: String,
    description: PropTypes.any,
    type: stringType("default"),
    shape: stringType("circle"),
    tooltip: PropTypes.any,
    href: String,
    target: functionType(),
    badge: objectType(),
    onClick: functionType()
  };
};
const floatButtonContentProps = () => {
  return {
    prefixCls: stringType()
  };
};
const floatButtonGroupProps = () => {
  return _extends(_extends({}, floatButtonProps()), {
    // 包含的 Float Button
    // 触发方式 (有触发方式为菜单模式）
    trigger: stringType(),
    // 受控展开
    open: booleanType(),
    // 展开收起的回调
    onOpenChange: functionType(),
    "onUpdate:open": functionType()
  });
};
const backTopProps = () => {
  return _extends(_extends({}, floatButtonProps()), {
    prefixCls: String,
    duration: Number,
    target: functionType(),
    visibilityHeight: Number,
    onClick: functionType()
  });
};
const FloatButtonContent = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AFloatButtonContent",
  inheritAttrs: false,
  props: floatButtonContentProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    return () => {
      var _a2;
      const {
        prefixCls
      } = props;
      const description = filterEmpty((_a2 = slots.description) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      return createVNode("div", _objectSpread2$1(_objectSpread2$1({}, attrs), {}, {
        "class": [attrs.class, `${prefixCls}-content`]
      }), [slots.icon || description.length ? createVNode(Fragment, null, [slots.icon && createVNode("div", {
        "class": `${prefixCls}-icon`
      }, [slots.icon()]), description.length ? createVNode("div", {
        "class": `${prefixCls}-description`
      }, [description]) : null]) : createVNode("div", {
        "class": `${prefixCls}-icon`
      }, [createVNode(FileTextOutlined$1, null, null)])]);
    };
  }
});
const Content = FloatButtonContent;
const contextKey = Symbol("floatButtonGroupContext");
const useProvideFloatButtonGroupContext = (props) => {
  provide(contextKey, props);
  return props;
};
const useInjectFloatButtonGroupContext = () => {
  return inject(contextKey, {
    shape: ref()
  });
};
const getOffset = (radius) => {
  if (radius === 0) {
    return 0;
  }
  return radius - Math.sqrt(Math.pow(radius, 2) / 2);
};
const initFloatButtonGroupMotion = (token2) => {
  const {
    componentCls,
    floatButtonSize,
    motionDurationSlow,
    motionEaseInOutCirc
  } = token2;
  const groupPrefixCls = `${componentCls}-group`;
  const moveDownIn = new Keyframe("antFloatButtonMoveDownIn", {
    "0%": {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    }
  });
  const moveDownOut = new Keyframe("antFloatButtonMoveDownOut", {
    "0%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    },
    "100%": {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    }
  });
  return [{
    [`${groupPrefixCls}-wrap`]: _extends({}, initMotion(`${groupPrefixCls}-wrap`, moveDownIn, moveDownOut, motionDurationSlow, true))
  }, {
    [`${groupPrefixCls}-wrap`]: {
      [`
          &${groupPrefixCls}-wrap-enter,
          &${groupPrefixCls}-wrap-appear
        `]: {
        opacity: 0,
        animationTimingFunction: motionEaseInOutCirc
      },
      [`&${groupPrefixCls}-wrap-leave`]: {
        animationTimingFunction: motionEaseInOutCirc
      }
    }
  }];
};
const floatButtonGroupStyle = (token2) => {
  const {
    antCls,
    componentCls,
    floatButtonSize,
    margin,
    borderRadiusLG,
    borderRadiusSM,
    badgeOffset,
    floatButtonBodyPadding
  } = token2;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: _extends(_extends({}, resetComponent(token2)), {
      zIndex: 99,
      display: "block",
      border: "none",
      position: "fixed",
      width: floatButtonSize,
      height: "auto",
      boxShadow: "none",
      minHeight: floatButtonSize,
      insetInlineEnd: token2.floatButtonInsetInlineEnd,
      insetBlockEnd: token2.floatButtonInsetBlockEnd,
      borderRadius: borderRadiusLG,
      [`${groupPrefixCls}-wrap`]: {
        zIndex: -1,
        display: "block",
        position: "relative",
        marginBottom: margin
      },
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [componentCls]: {
        position: "static"
      }
    }),
    [`${groupPrefixCls}-circle`]: {
      [`${componentCls}-circle:not(:last-child)`]: {
        marginBottom: token2.margin,
        [`${componentCls}-body`]: {
          width: floatButtonSize,
          height: floatButtonSize,
          borderRadius: "50%"
        }
      }
    },
    [`${groupPrefixCls}-square`]: {
      [`${componentCls}-square`]: {
        borderRadius: 0,
        padding: 0,
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG
        },
        "&:last-child": {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        },
        "&:not(:last-child)": {
          borderBottom: `${token2.lineWidth}px ${token2.lineType} ${token2.colorSplit}`
        },
        [`${antCls}-badge`]: {
          [`${antCls}-badge-count`]: {
            top: -(floatButtonBodyPadding + badgeOffset),
            insetInlineEnd: -(floatButtonBodyPadding + badgeOffset)
          }
        }
      },
      [`${groupPrefixCls}-wrap`]: {
        display: "block",
        borderRadius: borderRadiusLG,
        boxShadow: token2.boxShadowSecondary,
        [`${componentCls}-square`]: {
          boxShadow: "none",
          marginTop: 0,
          borderRadius: 0,
          padding: floatButtonBodyPadding,
          "&:first-child": {
            borderStartStartRadius: borderRadiusLG,
            borderStartEndRadius: borderRadiusLG
          },
          "&:last-child": {
            borderEndStartRadius: borderRadiusLG,
            borderEndEndRadius: borderRadiusLG
          },
          "&:not(:last-child)": {
            borderBottom: `${token2.lineWidth}px ${token2.lineType} ${token2.colorSplit}`
          },
          [`${componentCls}-body`]: {
            width: token2.floatButtonBodySize,
            height: token2.floatButtonBodySize
          }
        }
      }
    },
    [`${groupPrefixCls}-circle-shadow`]: {
      boxShadow: "none"
    },
    [`${groupPrefixCls}-square-shadow`]: {
      boxShadow: token2.boxShadowSecondary,
      [`${componentCls}-square`]: {
        boxShadow: "none",
        padding: floatButtonBodyPadding,
        [`${componentCls}-body`]: {
          width: token2.floatButtonBodySize,
          height: token2.floatButtonBodySize,
          borderRadius: borderRadiusSM
        }
      }
    }
  };
};
const sharedFloatButtonStyle = (token2) => {
  const {
    antCls,
    componentCls,
    floatButtonBodyPadding,
    floatButtonIconSize,
    floatButtonSize,
    borderRadiusLG,
    badgeOffset,
    dotOffsetInSquare,
    dotOffsetInCircle
  } = token2;
  return {
    [componentCls]: _extends(_extends({}, resetComponent(token2)), {
      border: "none",
      position: "fixed",
      cursor: "pointer",
      zIndex: 99,
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token2.floatButtonInsetInlineEnd,
      insetBlockEnd: token2.floatButtonInsetBlockEnd,
      boxShadow: token2.boxShadowSecondary,
      // Pure Panel
      "&-pure": {
        position: "relative",
        inset: "auto"
      },
      "&:empty": {
        display: "none"
      },
      [`${antCls}-badge`]: {
        width: "100%",
        height: "100%",
        [`${antCls}-badge-count`]: {
          transform: "translate(0, 0)",
          transformOrigin: "center",
          top: -badgeOffset,
          insetInlineEnd: -badgeOffset
        }
      },
      [`${componentCls}-body`]: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: `all ${token2.motionDurationMid}`,
        [`${componentCls}-content`]: {
          overflow: "hidden",
          textAlign: "center",
          minHeight: floatButtonSize,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: `${floatButtonBodyPadding / 2}px ${floatButtonBodyPadding}px`,
          [`${componentCls}-icon`]: {
            textAlign: "center",
            margin: "auto",
            width: floatButtonIconSize,
            fontSize: floatButtonIconSize,
            lineHeight: 1
          }
        }
      }
    }),
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: "50%",
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInCircle,
          insetInlineEnd: dotOffsetInCircle
        }
      },
      [`${componentCls}-body`]: {
        borderRadius: "50%"
      }
    },
    [`${componentCls}-square`]: {
      height: "auto",
      minHeight: floatButtonSize,
      borderRadius: borderRadiusLG,
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInSquare,
          insetInlineEnd: dotOffsetInSquare
        }
      },
      [`${componentCls}-body`]: {
        height: "auto",
        borderRadius: borderRadiusLG
      }
    },
    [`${componentCls}-default`]: {
      backgroundColor: token2.floatButtonBackgroundColor,
      transition: `background-color ${token2.motionDurationMid}`,
      [`${componentCls}-body`]: {
        backgroundColor: token2.floatButtonBackgroundColor,
        transition: `background-color ${token2.motionDurationMid}`,
        "&:hover": {
          backgroundColor: token2.colorFillContent
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token2.colorText
          },
          [`${componentCls}-description`]: {
            display: "flex",
            alignItems: "center",
            lineHeight: `${token2.fontSizeLG}px`,
            color: token2.colorText,
            fontSize: token2.fontSizeSM
          }
        }
      }
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token2.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token2.colorPrimary,
        transition: `background-color ${token2.motionDurationMid}`,
        "&:hover": {
          backgroundColor: token2.colorPrimaryHover
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token2.colorTextLightSolid
          },
          [`${componentCls}-description`]: {
            display: "flex",
            alignItems: "center",
            lineHeight: `${token2.fontSizeLG}px`,
            color: token2.colorTextLightSolid,
            fontSize: token2.fontSizeSM
          }
        }
      }
    }
  };
};
const useStyle$1 = genComponentStyleHook("FloatButton", (token2) => {
  const {
    colorTextLightSolid,
    colorBgElevated,
    controlHeightLG,
    marginXXL,
    marginLG,
    fontSize,
    fontSizeIcon,
    controlItemBgHover,
    paddingXXS,
    borderRadiusLG
  } = token2;
  const floatButtonToken = merge(token2, {
    floatButtonBackgroundColor: colorBgElevated,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: fontSizeIcon * 1.5,
    floatButtonSize: controlHeightLG,
    floatButtonInsetBlockEnd: marginXXL,
    floatButtonInsetInlineEnd: marginLG,
    floatButtonBodySize: controlHeightLG - paddingXXS * 2,
    // 这里的 paddingXXS 是简写，完整逻辑是 (controlHeightLG - (controlHeightLG - paddingXXS * 2)) / 2,
    floatButtonBodyPadding: paddingXXS,
    badgeOffset: paddingXXS * 1.5,
    dotOffsetInCircle: getOffset(controlHeightLG / 2),
    dotOffsetInSquare: getOffset(borderRadiusLG)
  });
  return [floatButtonGroupStyle(floatButtonToken), sharedFloatButtonStyle(floatButtonToken), initFadeMotion(token2), initFloatButtonGroupMotion(floatButtonToken)];
});
var __rest = function(s2, e2) {
  var t2 = {};
  for (var p in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
      t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
      if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
        t2[p[i2]] = s2[p[i2]];
    }
  return t2;
};
const floatButtonPrefixCls = "float-btn";
const FloatButton = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AFloatButton",
  inheritAttrs: false,
  props: initDefaultProps(floatButtonProps(), {
    type: "default",
    shape: "circle"
  }),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject(floatButtonPrefixCls, props);
    const [wrapSSR, hashId] = useStyle$1(prefixCls);
    const {
      shape: groupShape
    } = useInjectFloatButtonGroupContext();
    const floatButtonRef = ref(null);
    const mergeShape = computed(() => {
      return (groupShape === null || groupShape === void 0 ? void 0 : groupShape.value) || props.shape;
    });
    return () => {
      var _a2;
      const {
        prefixCls: customPrefixCls,
        type = "default",
        shape = "circle",
        description = (_a2 = slots.description) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
        tooltip,
        badge = {}
      } = props, restProps = __rest(props, ["prefixCls", "type", "shape", "description", "tooltip", "badge"]);
      const classString = classNames(prefixCls.value, `${prefixCls.value}-${type}`, `${prefixCls.value}-${mergeShape.value}`, {
        [`${prefixCls.value}-rtl`]: direction.value === "rtl"
      }, attrs.class, hashId.value);
      const buttonNode = createVNode(Tooltip, {
        "placement": "left"
      }, {
        title: slots.tooltip || tooltip ? () => slots.tooltip && slots.tooltip() || tooltip : void 0,
        default: () => createVNode(Badge, badge, {
          default: () => [createVNode("div", {
            "class": `${prefixCls.value}-body`
          }, [createVNode(Content, {
            "prefixCls": prefixCls.value
          }, {
            icon: slots.icon,
            description: () => description
          })])]
        })
      });
      return wrapSSR(props.href ? createVNode("a", _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({
        "ref": floatButtonRef
      }, attrs), restProps), {}, {
        "class": classString
      }), [buttonNode]) : createVNode("button", _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({
        "ref": floatButtonRef
      }, attrs), restProps), {}, {
        "class": classString,
        "type": "button"
      }), [buttonNode]));
    };
  }
});
const FloatButton$1 = FloatButton;
const FloatButtonGroup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AFloatButtonGroup",
  inheritAttrs: false,
  props: initDefaultProps(floatButtonGroupProps(), {
    type: "default",
    shape: "circle"
  }),
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject(floatButtonPrefixCls, props);
    const [wrapSSR, hashId] = useStyle$1(prefixCls);
    const [open, setOpen] = useMergedState(false, {
      value: computed(() => props.open)
    });
    const floatButtonGroupRef = ref(null);
    const floatButtonRef = ref(null);
    useProvideFloatButtonGroupContext({
      shape: computed(() => props.shape)
    });
    const hoverTypeAction = {
      onMouseenter() {
        var _a2;
        setOpen(true);
        emit("update:open", true);
        (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, true);
      },
      onMouseleave() {
        var _a2;
        setOpen(false);
        emit("update:open", false);
        (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, false);
      }
    };
    const hoverAction = computed(() => {
      return props.trigger === "hover" ? hoverTypeAction : {};
    });
    watch(computed(() => props.trigger), (value) => {
      {
        return;
      }
    }, {
      immediate: true
    });
    return () => {
      var _a2;
      const {
        shape = "circle",
        type = "default",
        tooltip,
        description,
        trigger
      } = props;
      const groupPrefixCls = `${prefixCls.value}-group`;
      const groupCls = classNames(groupPrefixCls, hashId.value, attrs.class, {
        [`${groupPrefixCls}-rtl`]: direction.value === "rtl",
        [`${groupPrefixCls}-${shape}`]: shape,
        [`${groupPrefixCls}-${shape}-shadow`]: !trigger
      });
      const wrapperCls = classNames(hashId.value, `${groupPrefixCls}-wrap`);
      const transitionProps = getTransitionProps(`${groupPrefixCls}-wrap`);
      return wrapSSR(createVNode("div", _objectSpread2$1(_objectSpread2$1({
        "ref": floatButtonGroupRef
      }, attrs), {}, {
        "class": groupCls
      }, hoverAction.value), [trigger && ["click", "hover"].includes(trigger) ? createVNode(Fragment, null, [createVNode(Transition, transitionProps, {
        default: () => [withDirectives(createVNode("div", {
          "class": wrapperCls
        }, [slots.default && slots.default()]), [[vShow, open.value]])]
      }), createVNode(FloatButton$1, {
        "ref": floatButtonRef,
        "type": type,
        "shape": shape,
        "tooltip": tooltip,
        "description": description
      }, {
        icon: () => {
          var _a22, _b2;
          return open.value ? ((_a22 = slots.closeIcon) === null || _a22 === void 0 ? void 0 : _a22.call(slots)) || createVNode(CloseOutlined$1, null, null) : ((_b2 = slots.icon) === null || _b2 === void 0 ? void 0 : _b2.call(slots)) || createVNode(FileTextOutlined$1, null, null);
        },
        tooltip: slots.tooltip,
        description: slots.description
      })]) : (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]));
    };
  }
});
const FloatButtonGroup$1 = FloatButtonGroup;
var VerticalAlignTopOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" } }] }, "name": "vertical-align-top", "theme": "outlined" };
const VerticalAlignTopOutlinedSvg = VerticalAlignTopOutlined$2;
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var VerticalAlignTopOutlined = function VerticalAlignTopOutlined2(props, context) {
  var p = _objectSpread$1({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread$1({}, p, {
    "icon": VerticalAlignTopOutlinedSvg
  }), null);
};
VerticalAlignTopOutlined.displayName = "VerticalAlignTopOutlined";
VerticalAlignTopOutlined.inheritAttrs = false;
const VerticalAlignTopOutlined$1 = VerticalAlignTopOutlined;
const BackTop = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ABackTop",
  inheritAttrs: false,
  props: initDefaultProps(backTopProps(), {
    visibilityHeight: 400,
    target: () => void 0,
    duration: 450,
    type: "default",
    shape: "circle"
  }),
  // emits: ['click'],
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject(floatButtonPrefixCls, props);
    const [wrapSSR] = useStyle$1(prefixCls);
    const domRef = ref();
    const state = reactive({
      visible: props.visibilityHeight === 0,
      scrollEvent: null
    });
    const getDefaultTarget = () => domRef.value && domRef.value.ownerDocument ? domRef.value.ownerDocument : void 0;
    const scrollToTop = (e2) => {
      const {
        target = getDefaultTarget,
        duration
      } = props;
      scrollTo(0, {
        getContainer: target,
        duration
      });
      emit("click", e2);
    };
    const handleScroll = throttleByAnimationFrame((e2) => {
      const {
        visibilityHeight
      } = props;
      const scrollTop = getScroll$1(e2.target);
      state.visible = scrollTop >= visibilityHeight;
    });
    const bindScrollEvent = () => {
      const {
        target
      } = props;
      const getTarget = target || getDefaultTarget;
      const container = getTarget();
      handleScroll({
        target: container
      });
      container === null || container === void 0 ? void 0 : container.addEventListener("scroll", handleScroll);
    };
    const scrollRemove = () => {
      const {
        target
      } = props;
      const getTarget = target || getDefaultTarget;
      const container = getTarget();
      handleScroll.cancel();
      container === null || container === void 0 ? void 0 : container.removeEventListener("scroll", handleScroll);
    };
    watch(() => props.target, () => {
      scrollRemove();
      nextTick(() => {
        bindScrollEvent();
      });
    });
    const floatButtonGroupContext = useInjectFloatButtonGroupContext();
    return () => {
      const {
        description,
        type,
        shape,
        tooltip,
        badge
      } = props;
      const floatButtonProps2 = _extends(_extends({}, attrs), {
        shape: (floatButtonGroupContext === null || floatButtonGroupContext === void 0 ? void 0 : floatButtonGroupContext.shape.value) || shape,
        onClick: scrollToTop,
        class: {
          [`${prefixCls.value}`]: true,
          [`${attrs.class}`]: attrs.class,
          [`${prefixCls.value}-rtl`]: direction.value === "rtl"
        },
        description,
        type,
        tooltip,
        badge
      });
      const transitionProps = getTransitionProps("fade");
      return wrapSSR(createVNode(Transition, transitionProps, {
        default: () => [withDirectives(createVNode(FloatButton$1, _objectSpread2$1(_objectSpread2$1({}, floatButtonProps2), {}, {
          "ref": domRef
        }), {
          icon: () => {
            var _a2;
            return ((_a2 = slots.icon) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || createVNode(VerticalAlignTopOutlined$1, null, null);
          }
        }), [[vShow, state.visible]])]
      }));
    };
  }
});
const __unplugin_components_0$1 = BackTop;
FloatButton$1.Group = FloatButtonGroup$1;
FloatButton$1.BackTop = __unplugin_components_0$1;
FloatButton$1.install = function(app) {
  app.component(FloatButton$1.name, FloatButton$1);
  app.component(FloatButtonGroup$1.name, FloatButtonGroup$1);
  app.component(__unplugin_components_0$1.name, __unplugin_components_0$1);
  return app;
};
var WarningFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "warning", "theme": "filled" };
const WarningFilledSvg = WarningFilled$2;
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? Object(arguments[i2]) : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys2.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var WarningFilled = function WarningFilled2(props, context) {
  var p = _objectSpread({}, props, context.attrs);
  return createVNode(AntdIcon, _objectSpread({}, p, {
    "icon": WarningFilledSvg
  }), null);
};
WarningFilled.displayName = "WarningFilled";
WarningFilled.inheritAttrs = false;
const WarningFilled$1 = WarningFilled;
const NoFound = () => {
  return createVNode("svg", {
    "width": "252",
    "height": "294"
  }, [createVNode("defs", null, [createVNode("path", {
    "d": "M0 .387h251.772v251.772H0z"
  }, null)]), createVNode("g", {
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("g", {
    "transform": "translate(0 .012)"
  }, [createVNode("mask", {
    "fill": "#fff"
  }, null), createVNode("path", {
    "d": "M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321",
    "fill": "#E4EBF7",
    "mask": "url(#b)"
  }, null)]), createVNode("path", {
    "d": "M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "d": "M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "d": "M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "stroke": "#FFF",
    "stroke-width": "2",
    "d": "M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39"
  }, null), createVNode("path", {
    "d": "M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48",
    "fill": "#1890FF"
  }, null), createVNode("path", {
    "d": "M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88",
    "fill": "#FFB594"
  }, null), createVNode("path", {
    "d": "M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165",
    "fill": "#7BB2F9"
  }, null), createVNode("path", {
    "d": "M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M107.275 222.1s2.773-1.11 6.102-3.884",
    "stroke": "#648BD8",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z",
    "fill": "#520038"
  }, null), createVNode("path", {
    "d": "M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254",
    "fill": "#552950"
  }, null), createVNode("path", {
    "stroke": "#DB836E",
    "stroke-width": "1.118",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "d": "M110.13 74.84l-.896 1.61-.298 4.357h-2.228"
  }, null), createVNode("path", {
    "d": "M110.846 74.481s1.79-.716 2.506.537",
    "stroke": "#5C2552",
    "stroke-width": "1.118",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67",
    "stroke": "#DB836E",
    "stroke-width": "1.118",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M103.287 72.93s1.83 1.113 4.137.954",
    "stroke": "#5C2552",
    "stroke-width": "1.118",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639",
    "stroke": "#DB836E",
    "stroke-width": "1.118",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206",
    "stroke": "#E4EBF7",
    "stroke-width": "1.101",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M129.405 122.865s-5.272 7.403-9.422 10.768",
    "stroke": "#E4EBF7",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M119.306 107.329s.452 4.366-2.127 32.062",
    "stroke": "#E4EBF7",
    "stroke-width": "1.101",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01",
    "fill": "#F2D7AD"
  }, null), createVNode("path", {
    "d": "M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92",
    "fill": "#F4D19D"
  }, null), createVNode("path", {
    "d": "M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z",
    "fill": "#F2D7AD"
  }, null), createVNode("path", {
    "fill": "#CC9B6E",
    "d": "M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z"
  }, null), createVNode("path", {
    "d": "M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83",
    "fill": "#F4D19D"
  }, null), createVNode("path", {
    "fill": "#CC9B6E",
    "d": "M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z"
  }, null), createVNode("path", {
    "fill": "#CC9B6E",
    "d": "M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z"
  }, null), createVNode("path", {
    "d": "M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044",
    "stroke": "#DB836E",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617",
    "stroke": "#DB836E",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754",
    "stroke": "#DB836E",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647",
    "fill": "#5BA02E"
  }, null), createVNode("path", {
    "d": "M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647",
    "fill": "#92C110"
  }, null), createVNode("path", {
    "d": "M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187",
    "fill": "#F2D7AD"
  }, null), createVNode("path", {
    "d": "M88.979 89.48s7.776 5.384 16.6 2.842",
    "stroke": "#E4EBF7",
    "stroke-width": "1.101",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null)])]);
};
const noFound = NoFound;
const ServerError = () => {
  return createVNode("svg", {
    "width": "254",
    "height": "294"
  }, [createVNode("defs", null, [createVNode("path", {
    "d": "M0 .335h253.49v253.49H0z"
  }, null), createVNode("path", {
    "d": "M0 293.665h253.49V.401H0z"
  }, null)]), createVNode("g", {
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("g", {
    "transform": "translate(0 .067)"
  }, [createVNode("mask", {
    "fill": "#fff"
  }, null), createVNode("path", {
    "d": "M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134",
    "fill": "#E4EBF7",
    "mask": "url(#b)"
  }, null)]), createVNode("path", {
    "d": "M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "d": "M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68",
    "fill": "#FF603B"
  }, null), createVNode("path", {
    "d": "M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487",
    "fill": "#FFB594"
  }, null), createVNode("path", {
    "d": "M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246",
    "fill": "#FFB594"
  }, null), createVNode("path", {
    "d": "M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z",
    "fill": "#520038"
  }, null), createVNode("path", {
    "d": "M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26",
    "fill": "#552950"
  }, null), createVNode("path", {
    "stroke": "#DB836E",
    "stroke-width": "1.063",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "d": "M99.206 73.644l-.9 1.62-.3 4.38h-2.24"
  }, null), createVNode("path", {
    "d": "M99.926 73.284s1.8-.72 2.52.54",
    "stroke": "#5C2552",
    "stroke-width": "1.117",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68",
    "stroke": "#DB836E",
    "stroke-width": "1.117",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M92.326 71.724s1.84 1.12 4.16.96",
    "stroke": "#5C2552",
    "stroke-width": "1.117",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954",
    "stroke": "#DB836E",
    "stroke-width": "1.063",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044",
    "stroke": "#E4EBF7",
    "stroke-width": "1.136",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51",
    "stroke": "#E4EBF7",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69",
    "fill": "#7BB2F9"
  }, null), createVNode("path", {
    "d": "M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034",
    "stroke": "#648BD8",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M96.973 219.373s2.882-1.153 6.34-4.034",
    "stroke": "#648BD8",
    "stroke-width": "1.032",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07",
    "stroke": "#648BD8",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513",
    "stroke": "#648BD8",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72",
    "stroke": "#E4EBF7",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593",
    "stroke": "#DB836E",
    "stroke-width": ".774",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762",
    "stroke": "#E59788",
    "stroke-width": ".774",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12",
    "stroke": "#E59788",
    "stroke-width": ".774",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M109.278 112.533s3.38-3.613 7.575-4.662",
    "stroke": "#E4EBF7",
    "stroke-width": "1.085",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M107.375 123.006s9.697-2.745 11.445-.88",
    "stroke": "#E59788",
    "stroke-width": ".774",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955",
    "stroke": "#BFCDDD",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01",
    "fill": "#A3B4C6"
  }, null), createVNode("path", {
    "d": "M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813",
    "fill": "#A3B4C6"
  }, null), createVNode("mask", {
    "fill": "#fff"
  }, null), createVNode("path", {
    "fill": "#A3B4C6",
    "mask": "url(#d)",
    "d": "M154.098 190.096h70.513v-84.617h-70.513z"
  }, null), createVNode("path", {
    "d": "M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208",
    "fill": "#BFCDDD",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802",
    "fill": "#FFF",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209",
    "fill": "#BFCDDD",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751",
    "stroke": "#7C90A5",
    "stroke-width": "1.124",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802",
    "fill": "#FFF",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407",
    "fill": "#BFCDDD",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M177.259 207.217v11.52M201.05 207.217v11.52",
    "stroke": "#A3B4C6",
    "stroke-width": "1.124",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422",
    "fill": "#5BA02E",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423",
    "fill": "#92C110",
    "mask": "url(#d)"
  }, null), createVNode("path", {
    "d": "M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209",
    "fill": "#F2D7AD",
    "mask": "url(#d)"
  }, null)])]);
};
const serverError = ServerError;
const Unauthorized = () => {
  return createVNode("svg", {
    "width": "251",
    "height": "294"
  }, [createVNode("g", {
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("path", {
    "d": "M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023",
    "fill": "#E4EBF7"
  }, null), createVNode("path", {
    "d": "M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "d": "M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "d": "M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z",
    "stroke": "#FFF",
    "stroke-width": "2"
  }, null), createVNode("path", {
    "stroke": "#FFF",
    "stroke-width": "2",
    "d": "M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668"
  }, null), createVNode("path", {
    "d": "M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321",
    "fill": "#A26EF4"
  }, null), createVNode("path", {
    "d": "M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61",
    "fill": "#5BA02E"
  }, null), createVNode("path", {
    "d": "M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611",
    "fill": "#92C110"
  }, null), createVNode("path", {
    "d": "M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17",
    "fill": "#F2D7AD"
  }, null), createVNode("path", {
    "d": "M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367",
    "fill": "#FFB594"
  }, null), createVNode("path", {
    "d": "M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M78.18 94.656s.911 7.41-4.914 13.078",
    "stroke": "#E4EBF7",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437",
    "stroke": "#E4EBF7",
    "stroke-width": ".932",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91",
    "fill": "#FFB594"
  }, null), createVNode("path", {
    "d": "M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103",
    "fill": "#5C2552"
  }, null), createVNode("path", {
    "d": "M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "stroke": "#DB836E",
    "stroke-width": "1.145",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "d": "M100.843 77.099l1.701-.928-1.015-4.324.674-1.406"
  }, null), createVNode("path", {
    "d": "M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32",
    "fill": "#552950"
  }, null), createVNode("path", {
    "d": "M91.132 86.786s5.269 4.957 12.679 2.327",
    "stroke": "#DB836E",
    "stroke-width": "1.145",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25",
    "fill": "#DB836E"
  }, null), createVNode("path", {
    "d": "M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073",
    "stroke": "#5C2552",
    "stroke-width": "1.526",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254",
    "stroke": "#DB836E",
    "stroke-width": "1.145",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008",
    "stroke": "#E4EBF7",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M66.508 86.763s-1.598 8.83-6.697 14.078",
    "stroke": "#E4EBF7",
    "stroke-width": "1.114",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M128.31 87.934s3.013 4.121 4.06 11.785",
    "stroke": "#E4EBF7",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M64.09 84.816s-6.03 9.912-13.607 9.903",
    "stroke": "#DB836E",
    "stroke-width": ".795",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73",
    "fill": "#FFC6A0"
  }, null), createVNode("path", {
    "d": "M130.532 85.488s4.588 5.757 11.619 6.214",
    "stroke": "#DB836E",
    "stroke-width": ".75",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M121.708 105.73s-.393 8.564-1.34 13.612",
    "stroke": "#E4EBF7",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M115.784 161.512s-3.57-1.488-2.678-7.14",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z",
    "fill": "#CBD1D1"
  }, null), createVNode("path", {
    "d": "M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078",
    "fill": "#2B0849"
  }, null), createVNode("path", {
    "d": "M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15",
    "fill": "#A4AABA"
  }, null), createVNode("path", {
    "d": "M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954",
    "fill": "#7BB2F9"
  }, null), createVNode("path", {
    "d": "M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M108.459 220.905s2.759-1.104 6.07-3.863",
    "stroke": "#648BD8",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null), createVNode("path", {
    "d": "M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806",
    "fill": "#FFF"
  }, null), createVNode("path", {
    "d": "M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64",
    "fill": "#192064"
  }, null), createVNode("path", {
    "d": "M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956",
    "stroke": "#648BD8",
    "stroke-width": "1.051",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null)])]);
};
const unauthorized = Unauthorized;
const genBaseStyle = (token2) => {
  const {
    componentCls,
    lineHeightHeading3,
    iconCls,
    padding,
    paddingXL,
    paddingXS,
    paddingLG,
    marginXS,
    lineHeight
  } = token2;
  return {
    // Result
    [componentCls]: {
      padding: `${paddingLG * 2}px ${paddingXL}px`,
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    },
    // Exception Status image
    [`${componentCls} ${componentCls}-image`]: {
      width: token2.imageWidth,
      height: token2.imageHeight,
      margin: "auto"
    },
    [`${componentCls} ${componentCls}-icon`]: {
      marginBottom: paddingLG,
      textAlign: "center",
      [`& > ${iconCls}`]: {
        fontSize: token2.resultIconFontSize
      }
    },
    [`${componentCls} ${componentCls}-title`]: {
      color: token2.colorTextHeading,
      fontSize: token2.resultTitleFontSize,
      lineHeight: lineHeightHeading3,
      marginBlock: marginXS,
      textAlign: "center"
    },
    [`${componentCls} ${componentCls}-subtitle`]: {
      color: token2.colorTextDescription,
      fontSize: token2.resultSubtitleFontSize,
      lineHeight,
      textAlign: "center"
    },
    [`${componentCls} ${componentCls}-content`]: {
      marginTop: paddingLG,
      padding: `${paddingLG}px ${padding * 2.5}px`,
      backgroundColor: token2.colorFillAlter
    },
    [`${componentCls} ${componentCls}-extra`]: {
      margin: token2.resultExtraMargin,
      textAlign: "center",
      "& > *": {
        marginInlineEnd: paddingXS,
        "&:last-child": {
          marginInlineEnd: 0
        }
      }
    }
  };
};
const genStatusIconStyle = (token2) => {
  const {
    componentCls,
    iconCls
  } = token2;
  return {
    [`${componentCls}-success ${componentCls}-icon > ${iconCls}`]: {
      color: token2.resultSuccessIconColor
    },
    [`${componentCls}-error ${componentCls}-icon > ${iconCls}`]: {
      color: token2.resultErrorIconColor
    },
    [`${componentCls}-info ${componentCls}-icon > ${iconCls}`]: {
      color: token2.resultInfoIconColor
    },
    [`${componentCls}-warning ${componentCls}-icon > ${iconCls}`]: {
      color: token2.resultWarningIconColor
    }
  };
};
const genResultStyle = (token2) => [genBaseStyle(token2), genStatusIconStyle(token2)];
const getStyle = (token2) => genResultStyle(token2);
const useStyle = genComponentStyleHook("Result", (token2) => {
  const {
    paddingLG,
    fontSizeHeading3
  } = token2;
  const resultSubtitleFontSize = token2.fontSize;
  const resultExtraMargin = `${paddingLG}px 0 0 0`;
  const resultInfoIconColor = token2.colorInfo;
  const resultErrorIconColor = token2.colorError;
  const resultSuccessIconColor = token2.colorSuccess;
  const resultWarningIconColor = token2.colorWarning;
  const resultToken = merge(token2, {
    resultTitleFontSize: fontSizeHeading3,
    resultSubtitleFontSize,
    resultIconFontSize: fontSizeHeading3 * 3,
    resultExtraMargin,
    resultInfoIconColor,
    resultErrorIconColor,
    resultSuccessIconColor,
    resultWarningIconColor
  });
  return [getStyle(resultToken)];
}, {
  imageWidth: 250,
  imageHeight: 295
});
const IconMap = {
  success: CheckCircleFilled$1,
  error: CloseCircleFilled$1,
  info: ExclamationCircleFilled$1,
  warning: WarningFilled$1
};
const ExceptionMap = {
  "404": noFound,
  "500": serverError,
  "403": unauthorized
};
const ExceptionStatus = Object.keys(ExceptionMap);
const resultProps = () => ({
  prefixCls: String,
  icon: PropTypes.any,
  status: {
    type: [Number, String],
    default: "info"
  },
  title: PropTypes.any,
  subTitle: PropTypes.any,
  extra: PropTypes.any
});
const renderIcon = (prefixCls, _ref) => {
  let {
    status,
    icon
  } = _ref;
  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status];
    return createVNode("div", {
      "class": `${prefixCls}-icon ${prefixCls}-image`
    }, [createVNode(SVGComponent, null, null)]);
  }
  const IconComponent = IconMap[status];
  const iconNode = icon || createVNode(IconComponent, null, null);
  return createVNode("div", {
    "class": `${prefixCls}-icon`
  }, [iconNode]);
};
const renderExtra = (prefixCls, extra) => extra && createVNode("div", {
  "class": `${prefixCls}-extra`
}, [extra]);
const Result = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AResult",
  inheritAttrs: false,
  props: resultProps(),
  slots: Object,
  setup(props, _ref2) {
    let {
      slots,
      attrs
    } = _ref2;
    const {
      prefixCls,
      direction
    } = useConfigInject("result", props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const className = computed(() => classNames(prefixCls.value, hashId.value, `${prefixCls.value}-${props.status}`, {
      [`${prefixCls.value}-rtl`]: direction.value === "rtl"
    }));
    return () => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h;
      const title = (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : (_b2 = slots.title) === null || _b2 === void 0 ? void 0 : _b2.call(slots);
      const subTitle = (_c = props.subTitle) !== null && _c !== void 0 ? _c : (_d = slots.subTitle) === null || _d === void 0 ? void 0 : _d.call(slots);
      const icon = (_e = props.icon) !== null && _e !== void 0 ? _e : (_f = slots.icon) === null || _f === void 0 ? void 0 : _f.call(slots);
      const extra = (_g = props.extra) !== null && _g !== void 0 ? _g : (_h = slots.extra) === null || _h === void 0 ? void 0 : _h.call(slots);
      const pre = prefixCls.value;
      return wrapSSR(createVNode("div", _objectSpread2$1(_objectSpread2$1({}, attrs), {}, {
        "class": [className.value, attrs.class]
      }), [renderIcon(pre, {
        status: props.status,
        icon
      }), createVNode("div", {
        "class": `${pre}-title`
      }, [title]), subTitle && createVNode("div", {
        "class": `${pre}-subtitle`
      }, [subTitle]), renderExtra(pre, extra), slots.default && createVNode("div", {
        "class": `${pre}-content`
      }, [slots.default()])]));
    };
  }
});
Result.PRESENTED_IMAGE_403 = ExceptionMap[403];
Result.PRESENTED_IMAGE_404 = ExceptionMap[404];
Result.PRESENTED_IMAGE_500 = ExceptionMap[500];
Result.install = function(app) {
  app.component(Result.name, Result);
  return app;
};
const __unplugin_components_0 = Result;
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = /* @__PURE__ */ useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el2 = void 0;
      const elRef = void 0;
      return () => {
        var _a2, _b2;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h$1(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h$1("a", { ref: el2, href, rel, target }, (_b2 = slots.default) == null ? void 0 : _b2.call(slots));
      };
    }
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$4 = {
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const list = [
      {
        title: "首页",
        url: "/"
      },
      {
        title: "日志",
        url: "/article"
      },
      {
        title: "发布",
        url: "/admin"
      },
      {
        title: "关于",
        url: "/about"
      }
      // {
      //   title: 'test',
      //   url: '/test'
      // }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "h-12 w-full" }, _attrs))}><div id="nav" class="w-full fixed top-0 left-0 shadow-md bg-white" style="${ssrRenderStyle({ "z-index": "999" })}"><ul class="mx-auto max-w-3xl flex justify-end space-x-5 px-5 h-12 items-center"><!--[-->`);
      ssrRenderList(list, (item) => {
        _push(`<li class="flex space-x-28">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.url,
          class: "active:text-blue"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></nav>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Header = _sfc_main$4;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-16 w-full" }, _attrs))}><div class="flex items-center justify-center w-full h-full p-5"><span>始于2024</span></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "金潇的天空之城",
      meta: [
        { name: "description", content: "一个普通的前端工程师,憧憬美好的生活！" },
        {
          name: "keywords",
          content: "java node javascript mysql tailtindcss 全栈 技术 博客 日志"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0$1;
      const _component_a_back_top = __unplugin_components_0$1;
      _push(`<!--[--><section class="bg-gray-light bg-opacity-5"><section class="flex flex-col min-h-screen mx-auto items-center">`);
      _push(ssrRenderComponent(Header, { class: "max-w-3xl" }, null, _parent));
      _push(`<section class="container flex-grow">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(Footer, { class: "bg-blue-200" }, null, _parent));
      _push(`</section></section>`);
      _push(ssrRenderComponent(_component_a_back_top, { "visibility-height": 500 }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = _sfc_main$2;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const handleBackHome = () => clearError({ redirect: "/" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_result = __unplugin_components_0;
      const _component_a_button = Button;
      _push(ssrRenderComponent(_component_a_result, mergeProps({
        status: _ctx.error.statusCode,
        title: _ctx.error.statusCode,
        "sub-title": _ctx.error.message
      }, _attrs), {
        extra: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_button, {
              type: "primary",
              onClick: handleBackHome
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`回到首页`);
                } else {
                  return [
                    createTextVNode("回到首页")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_button, {
                type: "primary",
                onClick: handleBackHome
              }, {
                default: withCtx(() => [
                  createTextVNode("回到首页")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.59.2_floating-vue@5.2.2_sass@1.75.0_unocss@0.59.2_vite@5.2.8/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { On as O, _export_sfc as _, useRuntimeConfig as a, useHead as b, __nuxt_component_0 as c, withoutTrailingSlash as d, entry$1 as default, useNuxtApp as e, withBase as f, withLeadingSlash as g, hasProtocol as h, asyncDataDefaults as i, joinURL as j, createError as k, destr as l, br as m, useRoute as u, withTrailingSlash as w };
//# sourceMappingURL=server.mjs.map
