export interface DLNCustomParameters {
    [key: string]: string | number | boolean;
}
export interface DLNAttribution {
    channel?: string;
    campaign?: string;
    medium?: string;
    source?: string;
    clickTimestamp?: Date;
    installTimestamp: Date;
}
export interface DeepLinkData {
    path: string;
    parameters: DLNCustomParameters;
}
declare class DeepLinkNow {
    private static eventEmitter;
    static initialize(apiKey: string): void;
    static createDeepLink(path: string, customParameters?: DLNCustomParameters): Promise<string>;
    static parseDeepLink(url: string): Promise<DeepLinkData>;
    static checkClipboard(): Promise<string | null>;
    static checkDeferredDeepLink(): Promise<{
        url: string | null;
        attribution: DLNAttribution | null;
    }>;
    static addDeepLinkListener(listener: (data: DeepLinkData) => void): () => void;
}
export default DeepLinkNow;
