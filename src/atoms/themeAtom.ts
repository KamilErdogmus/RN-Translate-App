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
    primary: "#0D92F4",
    secondary: "#03dac6",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
    disabled: "#999",
    onSurface: "#000000",
    outline: "#79747E",
    tabActive: "#0D92F4",
    tabInactive: "#757575",
    tabBackground: "#ffffff",
    inputBackground: "#3a3a3a",
    black: "#000",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0D92F4",
    secondary: "#03dac6",
    background: "#121212",
    surface: "#121212",
    text: "#ffffff",
    disabled: "#B4B4B8",
    onSurface: "#ffffff",
    outline: "#938F99",
    tabActive: "#a2a",
    tabInactive: "#bb1b1",
    tabBackground: "#121212",
    inputBackground: "#3a3a3a",
    black: "#000",
  },
};
