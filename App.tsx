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

const AppContent = () => {
  const { getCurrentTheme, isDarkMode } = useTheme();
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
