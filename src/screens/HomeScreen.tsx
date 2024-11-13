import { StyleSheet, ScrollView, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme as usePaperTheme } from "react-native-paper";
import InputArea from "../components/InputArea";
import { getLanguages, translateQuery } from "../services/api";
import { useSetRecoilState } from "recoil";
import { languagesAtom } from "../atoms/languagesAtom";
import Header from "../components/Header";
import { useDebounce } from "../hooks/DebounceFnc";
import SwapButton from "../components/SwapButton";
import ResetButton from "../components/ResetButton";
import Toast from "react-native-toast-message";
import { libraryAtom } from "../atoms/libraryAtom";
import uuid from "react-native-uuid";
import { saveLibraryToStorage } from "../utils/asyncStorage";

interface TranslationState {
  inputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatedText: string;
}

const HomeScreen = () => {
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  const setLanguages = useSetRecoilState(languagesAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const paperTheme = usePaperTheme();

  const [translationState, setTranslationState] = useState<TranslationState>({
    inputText: "",
    sourceLanguage: "",
    targetLanguage: "",
    translatedText: "",
  });

  const { inputText, sourceLanguage, targetLanguage, translatedText } =
    translationState;
  const debouncedInputText = useDebounce(inputText, 1000);

  const handleSwap = useCallback(() => {
    setTranslationState((prev) => ({
      ...prev,
      sourceLanguage: prev.targetLanguage,
      targetLanguage: prev.sourceLanguage,
      inputText: prev.translatedText,
      translatedText: prev.inputText,
    }));
  }, []);
  const handleReset = useCallback(() => {
    setTranslationState((prev) => ({
      ...prev,
      sourceLanguage: "",
      targetLanguage: "",
      inputText: "",
      translatedText: "",
    }));

    Toast.show({
      type: "success",
      text1: "Reset",
      text2: "All fields have been cleared",
      position: "bottom",
    });
  }, []);

  useEffect(() => {
    const performTranslation = async () => {
      if (
        debouncedInputText !== "" &&
        sourceLanguage !== "" &&
        targetLanguage !== ""
      ) {
        try {
          setIsTranslating(true);
          const result = await translateQuery(
            debouncedInputText,
            sourceLanguage,
            targetLanguage
          );
          setTranslationState((prev) => ({ ...prev, translatedText: result }));
        } catch (error) {
          console.error(error);
        } finally {
          setIsTranslating(false);
        }
      }
    };

    performTranslation();
  }, [debouncedInputText, sourceLanguage, targetLanguage]);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsInitializing(true);
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [setLanguages]);

  const addLibrary = () => {
    if (
      inputText !== "" &&
      translatedText !== "" &&
      sourceLanguage !== "" &&
      targetLanguage !== ""
    ) {
      const newEntry = {
        id: uuid.v4(),
        inputText,
        translatedText,
        sourceLanguage,
        targetLanguage,
        created_at: new Date().toISOString(),
      };

      setLibrary((prev) => {
        const newState = {
          entries: [...prev.entries, newEntry],
        };
        saveLibraryToStorage(newState);
        return newState;
      });

      Toast.show({
        type: "success",
        text1: "Added",
        text2: "Text added to library",
        position: "bottom",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "No Text",
        text2: "There is no text to add",
        position: "bottom",
      });
    }
  };

  const handleInputChange = useCallback((text: string) => {
    setTranslationState((prev) => ({ ...prev, inputText: text }));
  }, []);

  const handleSourceLanguageSelect = useCallback((language: string) => {
    setTranslationState((prev) => ({ ...prev, sourceLanguage: language }));
  }, []);

  const handleTargetLanguageSelect = useCallback((language: string) => {
    setTranslationState((prev) => ({ ...prev, targetLanguage: language }));
  }, []);

  return (
    <SafeAreaView
      style={
        (styles.container,
        {
          backgroundColor: paperTheme.colors.background,
        })
      }
    >
      <Header />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 8 }}>
        <InputArea
          mic
          onChangeText={handleInputChange}
          onSpeechResult={handleInputChange}
          text={inputText}
          isLoading={isInitializing}
          selectedLanguage={sourceLanguage}
          onLanguageSelect={handleSourceLanguageSelect}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginVertical: 20,
            flex: 1,
          }}
        >
          <SwapButton onSwap={handleSwap} />
          <ResetButton handleReset={handleReset} />
        </View>

        <InputArea
          bookmark
          isLoading={isTranslating}
          disabled
          handleAdd={addLibrary}
          onLanguageSelect={handleTargetLanguageSelect}
          translatedText={translatedText}
          selectedLanguage={targetLanguage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
