import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";
import { useTheme as usePaperTheme } from "react-native-paper";

const SwapButton = ({ onSwap }: { onSwap: () => void }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const currentSwapColor = isDarkMode
    ? paperTheme.colors.surface
    : paperTheme.colors.background;

  const swapButtonColor = isPressed ? "blue" : currentSwapColor;

  const handlePress = () => {
    setIsPressed(true);
    onSwap();
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.swapBTN,
        {
          borderColor: paperTheme.colors.text,
          backgroundColor: swapButtonColor,
          color: paperTheme.colors.onSecondary,
        },
      ]}
    >
      <Text style={{ color: paperTheme.colors.text }} variant="headlineMedium">
        SWAP
      </Text>
    </TouchableOpacity>
  );
};

export default SwapButton;

const styles = StyleSheet.create({
  swapBTN: {
    alignItems: "center",
    padding: 2,
    margin: 8,
    marginVertical: 20,
    borderWidth: 1,
  },
});
