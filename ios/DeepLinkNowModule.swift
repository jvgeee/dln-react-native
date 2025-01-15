import DeepLinkNow

@objc(DeepLinkNowModule)
class DeepLinkNowModule: RCTEventEmitter {
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func supportedEvents() -> [String] {
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
            params = DLNCustomParameters()
            customParams.forEach { key, value in
                params?[key] = value
            }
        }
        
        if let url = DeepLinkNow.createDeepLink(
            path: path,
            customParameters: params
        ) {
            resolve(url.absoluteString)
        } else {
            reject("CREATE_DEEP_LINK_ERROR", "Failed to create deep link", nil)
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
            reject("PARSE_DEEP_LINK_ERROR", "Failed to parse deep link", nil)
            return
        }
        
        let response: [String: Any] = [
            "path": parsed.path,
            "parameters": parsed.parameters.toMap()
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
            
            if let attr = attribution {
                response["attribution"] = [
                    "channel": attr.channel as Any,
                    "campaign": attr.campaign as Any,
                    "medium": attr.medium as Any,
                    "source": attr.source as Any,
                    "clickTimestamp": attr.clickTimestamp?.timeIntervalSince1970 as Any,
                    "installTimestamp": attr.installTimestamp.timeIntervalSince1970
                ]
            }
            
            resolve(response)
        }
    }
} 