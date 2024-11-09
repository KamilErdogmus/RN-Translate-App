import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
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
import Speech from "../Speech";
import { useRecoilValue } from "recoil";
import Toast from "react-native-toast-message";
import Clipboard from "expo-clipboard";

interface IProps {
  bookmark?: boolean;
  mic?: boolean;
  disabled?: boolean;
  onSpeechResult?: (text: string) => void;
  initialText?: string;
}

const InputArea = ({
  bookmark,
  mic,
  disabled,
  onSpeechResult,
  initialText = "",
}: IProps) => {
  const [text, setText] = useState<string>(initialText);
  const [value, setValue] = useState(null);
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const languageState = useRecoilValue(languagesAtom);

  const textInputRef = useRef(null);

  const handleTextChange = useCallback(
    (newText: string) => {
      setText(newText);
      onSpeechResult?.(newText);
    },
    [onSpeechResult]
  );

  const handleCopy = async () => {
    if (text) {
      await Clipboard.setStringAsync(text);
      Toast.show({
        type: "success",
        text1: "Copied",
        text2: "Text copied to clipboard",
        position: "bottom",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "No Text",
        text2: "There is no text to copy",
        position: "bottom",
      });
    }
  };

  const addLibrary = () => {
    if (text) {
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

  const handleSpeechResult = useCallback(
    (recognizedText: string) => {
      textInputRef.current?.focus();

      handleTextChange(recognizedText);
    },
    [handleTextChange]
  );

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
                  : paperTheme.colors.text
                : isSelected
                ? paperTheme.colors.background
                : paperTheme.colors.text,
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
          { color: paperTheme.colors.text },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {
            backgroundColor: paperTheme.colors.background,
            color: paperTheme.colors.text,
          },
        ]}
        iconStyle={styles.iconStyle}
        data={languageState}
        search
        maxHeight={300}
        labelField="name"
        searchPlaceholderTextColor={paperTheme.colors.onSurface}
        valueField="language"
        placeholder="Select Language"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.language);
        }}
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
        <TextInput
          multiline
          style={{
            backgroundColor: disabled
              ? isDarkMode
                ? paperTheme.colors.disabled
                : "lightgray"
              : "transparent",
            color: paperTheme.colors.text,
          }}
          placeholderTextColor={paperTheme.colors.onSurface}
          disabled={disabled}
          numberOfLines={10}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Enter or speak text..."
        />

        <View style={styles.btnGroup}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            {mic && <Speech onTextReceived={handleSpeechResult} />}
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="volume-high"
                size={26}
                color={
                  isDarkMode
                    ? paperTheme.colors.primary
                    : paperTheme.colors.onSurface
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopy}
              accessibilityLabel="Copy text"
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={26}
                color={
                  isDarkMode
                    ? paperTheme.colors.primary
                    : paperTheme.colors.onSurface
                }
              />
            </TouchableOpacity>
            {bookmark && (
              <TouchableOpacity onPress={addLibrary}>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
