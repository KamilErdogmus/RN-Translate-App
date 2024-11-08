import { atom } from "recoil";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import uuid from "react-native-uuid";
export type ThemeType = "light" | "dark";

export const themeState = atom<ThemeType>({
  key: uuid.v4().toString(),
  default: "dark",
});

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4646B5",
    secondary: "#03dac6",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
    tabActive: "#4646B5",
    tabInactive: "#757575",
    tabBackground: "#ffffff",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#4646B5",
    secondary: "#03dac6",
    background: "#121212",
    surface: "#121212",
    text: "#ffffff",
    tabActive: "#4646B5",
    tabInactive: "#bb1b1",
    tabBackground: "#121212",
  },
};
