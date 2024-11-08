import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/UseTheme";
import { Appbar, Text, useTheme as usePaperTheme } from "react-native-paper";
import InputArea from "../components/InputArea";
import { getLanguages } from "../services/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languagesAtom } from "../atoms/languagesAtom";

const HomeScreen = () => {
  const setLanguages = useSetRecoilState(languagesAtom);

  const { isDarkMode, toggleTheme } = useTheme();
  const paperTheme = usePaperTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setIsLoading(true);
        const data = await getLanguages();
        console.log(data);
        setLanguages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguages();
  }, []);

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
        <Text>TRANSLATE-X</Text>
        <Pressable
          onPress={toggleTheme}
          style={{ paddingVertical: 6, alignItems: "flex-end" }}
        >
          <Appbar.Action
            icon={isDarkMode ? "weather-sunny" : "weather-night"}
            onPress={toggleTheme}
          />
        </Pressable>
      </View>
      <ScrollView>
        <InputArea mic />

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.swapBTN, { borderColor: paperTheme.colors.text }]}
        >
          <Text variant="headlineLarge">SWAP</Text>
        </TouchableOpacity>

        <InputArea bookmark />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  swapBTN: {
    alignItems: "center",
    padding: 2,
    marginVertical: 6,
    borderWidth: 1,
  },
});
