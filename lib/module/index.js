function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { NativeModules, NativeEventEmitter } from "react-native";
const {
  DeepLinkNowModule
} = NativeModules;
class DeepLinkNow {
  static initialize(apiKey) {
    DeepLinkNowModule.initialize(apiKey);
  }
  static createDeepLink(path, customParameters) {
    return DeepLinkNowModule.createDeepLink(path, customParameters);
  }
  static parseDeepLink(url) {
    return DeepLinkNowModule.parseDeepLink(url);
  }
  static checkClipboard() {
    return DeepLinkNowModule.checkClipboard();
  }
  static checkDeferredDeepLink() {
    return DeepLinkNowModule.checkDeferredDeepLink();
  }
  static addDeepLinkListener(listener) {
    const subscription = this.eventEmitter.addListener("onDeepLink", listener);
    return () => subscription.remove();
  }
}
_defineProperty(DeepLinkNow, "eventEmitter", new NativeEventEmitter(DeepLinkNowModule));
export default DeepLinkNow;
//# sourceMappingURL=index.js.map