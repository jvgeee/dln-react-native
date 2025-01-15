package com.deeplinknow.reactnative

import android.net.Uri
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.deeplinknow.*

class DeepLinkNowModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "DeepLinkNowModule"

    @ReactMethod
    fun initialize(apiKey: String) {
        DeepLinkNow.initialize(reactContext, apiKey)
    }

    @ReactMethod
    fun createDeepLink(
        path: String,
        customParameters: ReadableMap?,
        promise: Promise
    ) {
        try {
            val params = customParameters?.toHashMap()?.let { map ->
                DLNCustomParameters().apply {
                    map.forEach { (key, value) ->
                        this[key] = value
                    }
                }
            }

            val deepLink = DeepLinkNow.getInstance().createDeepLink(
                path = path,
                customParameters = params
            )

            promise.resolve(deepLink.toString())
        } catch (e: Exception) {
            promise.reject("CREATE_DEEP_LINK_ERROR", e)
        }
    }

    @ReactMethod
    fun parseDeepLink(url: String, promise: Promise) {
        try {
            val uri = Uri.parse(url)
            val result = DeepLinkNow.getInstance().parseDeepLink(uri)
            
            val params = Arguments.createMap().apply {
                result.parameters.toMap().forEach { (key, value) ->
                    when (value) {
                        is String -> putString(key, value)
                        is Int -> putInt(key, value)
                        is Boolean -> putBoolean(key, value)
                    }
                }
            }

            val response = Arguments.createMap().apply {
                putString("path", result.path)
                putMap("parameters", params)
            }

            promise.resolve(response)
        } catch (e: Exception) {
            promise.reject("PARSE_DEEP_LINK_ERROR", e)
        }
    }

    @ReactMethod
    fun checkClipboard(promise: Promise) {
        try {
            val clipboardContent = DeepLinkNow.getInstance().checkClipboard()
            promise.resolve(clipboardContent)
        } catch (e: Exception) {
            promise.reject("CLIPBOARD_ERROR", e)
        }
    }

    @ReactMethod
    fun checkDeferredDeepLink(promise: Promise) {
        DeepLinkNow.getInstance().checkDeferredDeepLink { uri, attribution ->
            val response = Arguments.createMap().apply {
                putString("url", uri?.toString())
                attribution?.let { attr ->
                    putMap("attribution", Arguments.createMap().apply {
                        putString("channel", attr.channel)
                        putString("campaign", attr.campaign)
                        putString("medium", attr.medium)
                        putString("source", attr.source)
                        putDouble("clickTimestamp", attr.clickTimestamp?.time?.toDouble() ?: 0.0)
                        putDouble("installTimestamp", attr.installTimestamp.time.toDouble())
                    })
                }
            }
            promise.resolve(response)
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
} 