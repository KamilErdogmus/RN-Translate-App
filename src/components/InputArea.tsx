import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Divider,
  TextInput,
  useTheme as usePaperTheme,
} from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../hooks/UseTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { languagesAtom } from "../atoms/languagesAtom";
import STT from "./STT";
import { useRecoilValue } from "recoil";
import TTS from "./TTS";
import CopyButton from "./CopyButton";

interface IProps {
  bookmark?: boolean;
  mic?: boolean;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  text?: string;
  onSpeechResult?: (text: string) => void;
  initialText?: string;
  translatedText?: string;
  handleAdd?: () => void;
  onLanguageSelect?: (language: string) => void;
  selectedLanguage: string;
  isLoading?: boolean;
}

const InputArea = ({
  bookmark,
  mic,
  onLanguageSelect,
  handleAdd,
  disabled,
  isLoading,
  onSpeechResult,
  translatedText,
  onChangeText,
  selectedLanguage,
  text,
}: IProps) => {
  const [value, setValue] = useState(selectedLanguage || null);
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const languageState = useRecoilValue(languagesAtom);

  useEffect(() => {
    setValue(selectedLanguage || null);
  }, [selectedLanguage]);

  const handleTextChange = useCallback(
    (newText: string) => {
      onChangeText?.(newText);
      onSpeechResult?.(newText);
    },
    [onChangeText, onSpeechResult]
  );
  const handleLanguageChange = useCallback(
    (item: any) => {
      setValue(item.language);
      onLanguageSelect?.(item.language);
    },
    [onLanguageSelect]
  );

  const handleSpeechResult = (text: string) => {
    handleTextChange(text);
  };

  const renderItem = (item: any) => {
    const isSelected = item.language === value;
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor: isDarkMode
              ? isSelected
                ? paperTheme.colors.primary
                : "#333"
              : isSelected
              ? paperTheme.colors.primary
              : "white",
          },
        ]}
      >
        <Text
          style={[
            styles.textItem,
            {
              color: isDarkMode
                ? isSelected
                  ? paperTheme.colors.background
                  : paperTheme.colors.onSurface
                : isSelected
                ? paperTheme.colors.background
                : paperTheme.colors.onSurface,
            },
          ]}
        >
          {item.name}
        </Text>
        {isSelected && (
          <AntDesign
            style={styles.icon}
            color={paperTheme.colors.background}
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          {
            backgroundColor: paperTheme.colors.surface,
            borderColor: isDarkMode
              ? paperTheme.colors.outline
              : paperTheme.colors.primary,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: paperTheme.colors.onSurface },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: paperTheme.colors.onSurface },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {
            backgroundColor: paperTheme.colors.background,
            color: paperTheme.colors.onSurface,
          },
        ]}
        iconStyle={styles.iconStyle}
        data={languageState}
        search
        maxHeight={300}
        labelField="name"
        valueField="language"
        placeholder="Select Language"
        searchPlaceholder="Search..."
        value={value}
        onChange={handleLanguageChange}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={
              isDarkMode
                ? paperTheme.colors.primary
                : paperTheme.colors.onSurface
            }
            name="flag"
            size={20}
          />
        )}
        renderItem={renderItem}
      />

      <View
        style={[
          styles.input,
          {
            borderColor: isDarkMode
              ? paperTheme.colors.outline
              : paperTheme.colors.primary,
          },
        ]}
      >
        <Divider bold />

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={paperTheme.colors.primary} />
            <Text
              style={[styles.loadingText, { color: paperTheme.colors.onSurface }]}
            >
              Translating...
            </Text>
          </View>
        )}
        <TextInput
          multiline
          textColor={disabled ? "#000" : isDarkMode ? "#FFFFFF" : "#000000"}
          style={{
            backgroundColor: disabled
              ? isDarkMode
                ? paperTheme.colors.surfaceDisabled
                : "lightgray"
              : "transparent",
            fontSize: 20,
            opacity: isLoading ? 0.5 : 1,
          }}
          placeholderTextColor={paperTheme.colors.onSurface}
          disabled={disabled || isLoading}
          numberOfLines={10}
          value={translatedText || text}
          onChangeText={handleTextChange}
          placeholder={mic ? "Enter or speak text..." : ""}
        />

        <View style={styles.btnGroup}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {mic ? (
              <STT
                language={selectedLanguage}
                onTextReceived={handleSpeechResult}
              />
            ) : (
              <View />
            )}
            <View style={{ flexDirection: "row", columnGap: 10 }}>
              <TTS
                text={translatedText || text || ""}
                language={value || "en"}
              />
              <CopyButton text={translatedText || text || ""} />
              {bookmark && (
                <TouchableOpacity onPress={handleAdd}>
                  <MaterialCommunityIcons
                    name="bookmark"
                    size={26}
                    color={
                      isDarkMode
                        ? paperTheme.colors.primary
                        : paperTheme.colors.onSurface
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    zIndex: 1000,
  },
  input: {
    position: "relative",
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 8,
  },
  btnGroup: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    bottom: 8,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderRadius: 6,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
