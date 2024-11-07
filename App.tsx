import React from "react";
import "./global.css";
import Router from "./src/router/Router";
import { PaperProvider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar style="dark" backgroundColor="white" />
          <Router />
          <Toast />
        </PaperProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
