import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";
import { useTheme as usePaperTheme } from "react-native-paper";
const ResetButton = ({ handleReset }: { handleReset: () => void }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const currentSwapColor = isDarkMode
    ? paperTheme.colors.surface
    : paperTheme.colors.background;

  const swapButtonColor = isPressed ? "red" : currentSwapColor;

  const handlePress = () => {
    setIsPressed(true);
    handleReset();
    setTimeout(() => setIsPressed(false), 200);
  };
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.comicButton,
        isPressed && styles.comicButtonPressed,
        {
          borderColor: paperTheme.colors.primary,
          backgroundColor: swapButtonColor,
          color: paperTheme.colors.onSecondary,
        },
      ]}
    >
      <Text
        style={[
          styles.comicButtonText,
          isPressed && styles.comicButtonPressedText,
          {
            color: paperTheme.colors.text,
          },
        ]}
        variant="headlineMedium"
      >
        RESET
      </Text>
    </TouchableOpacity>
  );
};

export default ResetButton;

const styles = StyleSheet.create({
  comicButton: {
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5252",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
  },
  comicButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  comicButtonPressed: {
    backgroundColor: "#fff",
    borderColor: "#ff5252",
    shadowColor: "#ff5252",
    transform: [{ translateY: 4 }],
  },
  comicButtonPressedText: {
    color: "#ff5252",
  },
});
