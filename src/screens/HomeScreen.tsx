import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/UseTheme";
import { Appbar, Text, useTheme as usePaperTheme } from "react-native-paper";
import InputArea from "../components/InputArea";
import { getLanguages } from "../services/api";
import { useSetRecoilState } from "recoil";
import { languagesAtom } from "../atoms/languagesAtom";

const HomeScreen = () => {
  const setLanguages = useSetRecoilState(languagesAtom);
  const swapRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();
  const paperTheme = usePaperTheme();
  const [inputText, setInputText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [swapColor, setSwapColor] = useState<string>(
    isDarkMode ? paperTheme.colors.background : paperTheme.colors.surface
  );

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setIsLoading(true);
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguages();
  }, []);

  const handleSpeechResult = (text: string) => {
    setSourceText(text);
  };

  const handlePressIn = () => {
    setSwapColor("blue");
  };

  const handlePressOut = () => {
    setSwapColor(paperTheme.colors.background);
  };

  const themeHandler = () => {
    toggleTheme();
    setSwapColor(
      !isDarkMode ? paperTheme.colors.background : paperTheme.colors.surface
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: paperTheme.colors.background,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="headlineMedium">TRANSLATE-X</Text>
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
      <ScrollView>
        <InputArea
          mic
          onChangeText={setInputText}
          onSpeechResult={handleSpeechResult}
          text={inputText}
        />

        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          style={[
            styles.swapBTN,
            {
              borderColor: paperTheme.colors.text,
              backgroundColor: swapColor,
              color: paperTheme.colors.onSecondary,
            },
          ]}
        >
          <Text variant="headlineMedium">SWAP</Text>
        </TouchableOpacity>

        <InputArea bookmark disabled />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  swapBTN: {
    alignItems: "center",
    padding: 2,
    margin: 8,
    marginVertical: 20,
    borderWidth: 1,
  },
});
