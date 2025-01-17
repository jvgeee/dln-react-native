export const __esModule: boolean;
export default DeepLinkNow;
declare class DeepLinkNow {
    static initialize(apiKey: any): void;
    static createDeepLink(path: any, customParameters: any): any;
    static parseDeepLink(url: any): any;
    static checkClipboard(): any;
    static checkDeferredDeepLink(): any;
    static addDeepLinkListener(listener: any): () => any;
}
