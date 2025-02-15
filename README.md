# react-native-deeplink-now

React Native wrapper for the DeepLinkNow SDK

## Installation

```sh
npm install react-native-deeplink-now
# or
yarn add react-native-deeplink-now
# or
bun add react-native-deeplink-now
```

## Option 1: Expo Configuration

If using Expo, add the config plugin to your app.json/app.config.js:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-deeplink-now",
        {
          "apiKey": "your-api-key-here"
        }
      ]
    ]
  }
}
```

## Option 2: Manual Installation (for non-Expo projects)

### iOS Setup

1. Add the DeepLinkNow SDK to your Podfile:

```ruby
pod 'DeepLinkNow'
```

2. Install the pods:

```sh
cd ios && pod install
```

### Android Setup

Add the DeepLinkNow SDK repository to your project's build.gradle:

```gradle
allprojects {
    repositories {
        // ... other repositories
        maven {
            url "https://your-maven-repo.com"
        }
    }
}
```

The React Native module will automatically include the native SDK dependency.

## Usage

```typescript
import DeepLinkNow from "react-native-deeplink-now";

// Initialize the SDK
DeepLinkNow.initialize("your-api-key-here");

// Create a deep link
const deepLink = await DeepLinkNow.createDeepLink("/product/123", {
  referrer: "social_share",
  is_promo: true,
  discount: 20,
});

// Parse a deep link
const parsed = await DeepLinkNow.parseDeepLink(deepLink);
console.log(parsed.path); // '/product/123'
console.log(parsed.parameters.referrer); // 'social_share'

// Check clipboard for deep links
const clipboardLink = await DeepLinkNow.checkClipboard();

// Check for deferred deep links
const deferred = await DeepLinkNow.checkDeferredDeepLink();
if (deferred.url) {
  console.log("Deferred deep link:", deferred.url);
  console.log("Attribution:", deferred.attribution);
}

// Listen for deep link events
const unsubscribe = DeepLinkNow.addDeepLinkListener((data) => {
  console.log("Deep link received:", data);
});

// Clean up listener when done
unsubscribe();
```

## License

MIT
