# Translator App in React Native-Expo

## Description

Translator App is a cross-platform mobile application developed with React Native and Expo, designed to translate text between languages seamlessly. It provides a responsive and intuitive user interface, powered by a range of essential libraries for efficient performance and functionality. Below is an overview of the key libraries utilized in this project.

## Libraries and Tools

- **@expo/vector-icons**: Provides a wide array of customizable icons, enhancing the app’s visual elements and improving the user interface.
- **@react-native-async-storage/async-storage**: Enables local storage of user preferences, translation history, and other data, allowing the app to retain data even when offline.
- **@react-native-voice/voice**: Integrates voice recognition to capture and process spoken input, allowing users to speak text directly for translation.
- **@react-navigation/material-bottom-tabs**: Adds a Material Design-style bottom navigation, making it easy for users to switch between different sections of the app.
- **@react-navigation/native**: Supplies the foundational navigation system, managing screen transitions and user flow across the app.
- **axios**: Used to make HTTP requests to translation APIs, handling data fetching and submission to backend services.
- **expo**: The core Expo framework, which facilitates easy access to native functionality and supports the app's development, testing, and deployment processes.
- **expo-clipboard**: Allows users to copy translated text directly to the clipboard, providing a quick way to transfer translated content for other uses.
- **expo-speech**: Enables text-to-speech capabilities, allowing users to hear translations spoken aloud in the target language.
- **expo-status-bar**: Provides control over the appearance of the status bar, ensuring it matches the app’s color scheme and enhances overall design coherence.
- **expo-system-ui**: Manages system-wide UI settings, ensuring compatibility and consistency with various devices and operating systems.
- **react-native-dotenv**: Manages environment variables securely, protecting API keys and other sensitive data used by the app.
- **react-native-dropdown-picker**: Implements dropdown menus for user input, such as selecting source and target languages, improving the app’s usability.
- **react-native-element-dropdown**: A customizable dropdown component that supports enhanced dropdown selections, useful for language selection.
- **react-native-gesture-handler**: Enhances gesture handling for smooth user interactions, providing support for swipes, taps, and other gestures.
- **react-native-paper**: Provides pre-styled, Material Design-compliant UI components, helping build a consistent, polished interface.
- **react-native-reanimated**: Supplies performant animations and interactions, allowing the app to handle transitions and animated components smoothly.
- **react-native-safe-area-context**: Ensures content is displayed within safe boundaries on devices with notches and special screen layouts.
- **react-native-screens**: Optimizes navigation performance by using native screen management, making screen transitions smoother and more efficient.
- **react-native-select-dropdown**: Offers a dropdown component with an intuitive selection UI, useful for language and other options.
- **react-native-toast-message**: Displays non-intrusive toast notifications for immediate feedback on actions, such as translation success or error notifications.
- **react-native-uuid**: Generates unique identifiers, useful for tagging items like saved translations or session information.
- **react-native-vector-icons**: A complementary icon library providing more icon options for customization.
- **recoil**: Manages app-wide state efficiently, especially useful for handling global states like selected languages or translation history.

These libraries collectively empower the Translator App to offer a responsive, feature-rich experience, combining efficient data handling, intuitive navigation, and interactive features to make language translation easy and enjoyable.

## Preview

<img src="assets/TRANSLATER.gif" height="500" />

## API

[Translate-API](https://rapidapi.com/gatzuma/api/deep-translate1)

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-Translate-App
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

### If you want to use Voice please run this code

#### Using npm

```bash
npx expo run android
```

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
