import React from "react";
import Router from "./src/router/Router";
import { PaperProvider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useTheme } from "./src/hooks/UseTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { useInitializeLibrary } from "./src/hooks/useInıtializeLibrary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContent = () => {
  const { getCurrentTheme, isDarkMode } = useTheme();
  const isLoading = useInitializeLibrary();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PaperProvider theme={getCurrentTheme()}>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          <Router />
          <Toast />
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const App = () => (
  <RecoilRoot>
    <AppContent />
  </RecoilRoot>
);

export default App;

LogBox.ignoreLogs([
  "`new NativeEventEmitter()`",
  "Warning: `new NativeEventEmitter()`",
]);
