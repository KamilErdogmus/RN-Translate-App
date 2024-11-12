import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  Animated,
  Modal,
  Easing,
} from "react-native";
import { LibraryEntry } from "../atoms/libraryAtom";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { libraryAtom } from "../atoms/libraryAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const LibraryCard = ({
  item,
  index,
}: {
  item: LibraryEntry;
  index: number;
}) => {
  const paperTheme = usePaperTheme();
  const { isDarkMode } = useTheme();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const setLibrary = useSetRecoilState(libraryAtom);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const deleteButtonSlide = useRef(new Animated.Value(50)).current;

  const startAnimation = () => {
    fadeAnim.setValue(0);
    translateY.setValue(50);

    const delay = index * 300;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        delay,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsOpened(false);
      setModalVisible(false);
      startAnimation();
    }, [])
  );

  useEffect(() => {
    if (isOpened) {
      Animated.sequence([
        Animated.spring(deleteButtonSlide, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }),
      ]).start();
    } else {
      Animated.timing(deleteButtonSlide, {
        toValue: 50,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpened]);

  const handleDelete = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsOpened(false);
    }, 300);
  };

  const confirmDelete = async () => {
    try {
      const savedData = await AsyncStorage.getItem("translator_library");
      console.log("Current data:", savedData);

      if (savedData) {
        const currentData = JSON.parse(savedData);

        const newEntries = currentData.entries.filter(
          (entry: LibraryEntry) => entry.id !== item.id
        );

        const newState = { entries: newEntries };

        await AsyncStorage.setItem(
          "translator_library",
          JSON.stringify(newState)
        );

        setLibrary(newState);

        handleCloseModal();

        Toast.show({
          type: "success",
          text1: "Deleted",
          text2: "Translation deleted successfully",
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not delete translation",
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
            backgroundColor: isDarkMode
              ? paperTheme.colors.surface
              : paperTheme.colors.background,
            borderColor: paperTheme.colors.outline,
          },
        ]}
      >
        <Pressable
          onLongPress={() => setIsOpened(!isOpened)}
          style={{ flex: 1 }}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: paperTheme.colors.primary }]}>
              Original Text:
            </Text>
            <Text style={[styles.text, { color: paperTheme.colors.text }]}>
              {item.inputText}
            </Text>
          </View>

          <View
            style={[
              styles.textContainer,
              { borderColor: isOpened ? "red" : paperTheme.colors.outline },
            ]}
          >
            <Text style={[styles.label, { color: paperTheme.colors.primary }]}>
              Translated Text:
            </Text>
            <Text style={[styles.text, { color: paperTheme.colors.text }]}>
              {item.translatedText}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text
              style={[styles.smallText, { color: paperTheme.colors.secondary }]}
            >
              From: {item.sourceLanguage.toUpperCase()}
              <AntDesign
                name="arrowright"
                color={paperTheme.colors.secondary}
                size={16}
              />
              To: {item.targetLanguage.toUpperCase()}
            </Text>
            <Text
              style={[styles.smallText, { color: paperTheme.colors.secondary }]}
            >
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
          {isOpened && (
            <Animated.View
              style={[
                styles.deleteBtn,
                {
                  transform: [{ translateX: deleteButtonSlide }],
                  opacity: deleteButtonSlide.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            >
              <TouchableWithoutFeedback onPress={handleDelete}>
                <Ionicons name="trash-bin" size={20} color={"white"} />
              </TouchableWithoutFeedback>
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <Animated.View
            style={[
              styles.modalOverlay,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: isDarkMode
                      ? paperTheme.colors.surface
                      : paperTheme.colors.background,
                  },
                ]}
              >
                <Text
                  style={[styles.modalTitle, { color: paperTheme.colors.text }]}
                >
                  Delete Translation
                </Text>
                <Text
                  style={[styles.modalText, { color: paperTheme.colors.text }]}
                >
                  Are you sure you want to delete this translation?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={confirmDelete}
                  >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  textContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  smallText: {
    fontSize: 13,
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    top: 2,
    backgroundColor: "red",
    width: 50,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
    minWidth: 80,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LibraryCard;
