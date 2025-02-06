"use strict";
exports.__esModule = true;
var ConfigPlugins;
try {
    ConfigPlugins = require("@expo/config-plugins");
}
catch (_a) {
    // Expo is not installed
}
var withDeepLinkNow = function (config, props) {
    if (props === void 0) { props = {}; }
    if (!ConfigPlugins) {
        // Return unmodified config if Expo is not installed
        return config;
    }
    var withPlugins = ConfigPlugins.withPlugins, withInfoPlist = ConfigPlugins.withInfoPlist, withAndroidManifest = ConfigPlugins.withAndroidManifest, AndroidConfig = ConfigPlugins.AndroidConfig;
    return withPlugins(config, [
        // iOS
        [
            withInfoPlist,
            function (config) {
                config.modResults.NSPasteboardUsageDescription =
                    "We need access to the clipboard to check for deep links";
                return config;
            },
        ],
        // Android
        [
            withAndroidManifest,
            function (config) {
                var mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
                // Add permissions if needed
                mainApplication.permission = mainApplication.permission || [];
                // Add any necessary Android configuration
                return config;
            },
        ],
    ]);
};
exports["default"] = withDeepLinkNow;
