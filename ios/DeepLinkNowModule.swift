import DeepLinkNow
import React

@objc(DeepLinkNowModule)
class DeepLinkNowModule: RCTEventEmitter {
    
    override static func moduleName() -> String! {
        return "DeepLinkNowModule"
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func supportedEvents() -> [String]! {
        return ["onDeepLink"]
    }
    
    @objc
    func initialize(_ apiKey: String) {
        DeepLinkNow.initialize(apiKey: apiKey)
    }
    
    @objc
    func createDeepLink(
        _ path: String,
        customParameters: [String: Any]?,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        var params: DLNCustomParameters?
        if let customParams = customParameters {
            params = DLNCustomParameters(customParams)
        }
        
        if let url = DeepLinkNow.createDeepLink(
            path: path,
            customParameters: params
        ) {
            resolve(url.absoluteString)
        } else {
            reject("ERROR", "Could not create deep link", nil)
        }
    }
    
    @objc
    func parseDeepLink(
        _ url: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let url = URL(string: url),
              let parsed = DeepLinkNow.parseDeepLink(url) else {
            reject("ERROR", "Could not parse deep link", nil)
            return
        }
        
        let response: [String: Any] = [
            "path": parsed.path,
            "parameters": parsed.parameters.dictionary
        ]
        
        resolve(response)
    }
    
    @objc
    func checkClipboard(
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        resolve(DeepLinkNow.checkClipboard())
    }
    
    @objc
    func checkDeferredDeepLink(
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        DeepLinkNow.checkDeferredDeepLink { url, attribution in
            var response: [String: Any] = [
                "url": url?.absoluteString as Any
            ]
            
            if let attribution = attribution {
                response["attribution"] = [
                    "channel": attribution.channel as Any,
                    "campaign": attribution.campaign as Any,
                    "medium": attribution.medium as Any,
                    "source": attribution.source as Any,
                    "clickTimestamp": attribution.clickTimestamp?.timeIntervalSince1970 as Any,
                    "installTimestamp": attribution.installTimestamp.timeIntervalSince1970
                ]
            }
            
            resolve(response)
        }
    }
} 