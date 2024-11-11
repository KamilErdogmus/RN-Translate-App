import { View, Pressable } from "react-native";
import React from "react";
import { Appbar, Text } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const themeHandler = () => {
    toggleTheme();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        justifyContent: "space-between",
      }}
    >
      <Text variant="headlineMedium">TRANSLATER</Text>
      <Pressable
        onPress={themeHandler}
        style={{ marginVertical: 6, alignItems: "flex-end" }}
      >
        <Appbar.Action
          size={32}
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
        />
      </Pressable>
    </View>
  );
};

export default Header;
