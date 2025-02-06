let ConfigPlugins;

try {
  ConfigPlugins = require("@expo/config-plugins");
} catch {
  // Expo is not installed
}

const withDeepLinkNow = (config, props = {}) => {
  if (!ConfigPlugins) {
    // Return unmodified config if Expo is not installed
    return config;
  }

  const { withPlugins, withInfoPlist, withAndroidManifest, AndroidConfig } =
    ConfigPlugins;

  return withPlugins(config, [
    // iOS
    [
      withInfoPlist,
      (config) => {
        config.modResults.NSPasteboardUsageDescription =
          "We need access to the clipboard to check for deep links";
        return config;
      },
    ],
    // Android
    [
      withAndroidManifest,
      (config) => {
        const mainApplication =
          AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

        // Add permissions if needed
        mainApplication.permission = mainApplication.permission || [];

        // Add any necessary Android configuration
        return config;
      },
    ],
  ]);
};

module.exports = withDeepLinkNow;
