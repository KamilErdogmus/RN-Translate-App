import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, useTheme as usePaperTheme } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../hooks/UseTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { languagesAtom } from "../atoms/languagesAtom";
import Speech from "../Speech";
import { useRecoilValue } from "recoil";

interface IProps {
  bookmark?: boolean;
  mic?: boolean;
}

const InputArea = ({ bookmark, mic }: IProps) => {
  const [text, setText] = useState<string>("");
  const { isDarkMode } = useTheme();
  const languageState = useRecoilValue(languagesAtom);
  const handleCopy = () => {};
  const addLibrary = () => {};
  return (
    <View>
      <SelectDropdown
        search
        data={languageState}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.name) || "Language"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#7B89FF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator
        dropdownStyle={styles.dropdownMenuStyle}
      />

      <View style={styles.input}>
        <TextInput
          multiline
          numberOfLines={10}
          value={text}
          onChangeText={(text) => setText(text)}
        />

        <View style={styles.btnGroup}>
          {mic ? <Speech /> : <View />}
          <View style={{ flexDirection: "row", columnGap: 4 }}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="volume-high"
                size={26}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCopy}>
              <MaterialCommunityIcons
                name="content-copy"
                size={26}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
            {bookmark && (
              <TouchableOpacity onPress={addLibrary}>
                <MaterialCommunityIcons
                  name="bookmark"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
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
  input: { position: "relative", marginBottom: 20 },
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
  dropdownButtonStyle: {
    width: "100%",
    height: 40,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
