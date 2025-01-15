import { NativeModules, Platform, NativeEventEmitter } from "react-native";

const { DeepLinkNowModule } = NativeModules;

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

class DeepLinkNow {
  private static eventEmitter = new NativeEventEmitter(DeepLinkNowModule);

  static initialize(apiKey: string): void {
    DeepLinkNowModule.initialize(apiKey);
  }

  static createDeepLink(
    path: string,
    customParameters?: DLNCustomParameters
  ): Promise<string> {
    return DeepLinkNowModule.createDeepLink(path, customParameters);
  }

  static parseDeepLink(url: string): Promise<DeepLinkData> {
    return DeepLinkNowModule.parseDeepLink(url);
  }

  static checkClipboard(): Promise<string | null> {
    return DeepLinkNowModule.checkClipboard();
  }

  static checkDeferredDeepLink(): Promise<{
    url: string | null;
    attribution: DLNAttribution | null;
  }> {
    return DeepLinkNowModule.checkDeferredDeepLink();
  }

  static addDeepLinkListener(
    listener: (data: DeepLinkData) => void
  ): () => void {
    const subscription = this.eventEmitter.addListener("onDeepLink", listener);
    return () => subscription.remove();
  }
}

export default DeepLinkNow;
