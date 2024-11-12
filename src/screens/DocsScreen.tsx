import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { libraryAtom } from "../atoms/libraryAtom";
import { useTheme as usePaperTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LibraryCard from "../components/LibraryCard";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debugStorage } from "../utils/asyncStorage";

const DocsScreen = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const navigation = useNavigation();
  const route = useRoute();
  const libraryData = useRecoilValue(libraryAtom);
  const setLibrary = useSetRecoilState(libraryAtom);
  const paperTheme = usePaperTheme();
  const flatListRef = React.useRef(null);

  const refreshList = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const refreshLibrary = async () => {
        try {
          const savedData = await AsyncStorage.getItem("translator_library");
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log("Refreshing library with data:", parsedData);
            setLibrary(parsedData);
            refreshList();
          }
        } catch (error) {
          console.error("Error refreshing library:", error);
        }
      };

      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }

      refreshLibrary();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (route.name === "Docs") {
        e.preventDefault();
        setRefreshKey((prev) => prev + 1);
        navigation.navigate("Docs");
      }
    });

    return unsubscribe;
  }, [navigation, route]);

  const renderItem = React.useCallback(
    ({ item, index }) => (
      <LibraryCard item={item} index={index} key={`${item.id}-${refreshKey}`} />
    ),
    [refreshKey]
  );

  return (
    <SafeAreaView style={styles.container}>
      {libraryData.entries.length > 0 ? (
        <FlatList
          ref={flatListRef}
          key={refreshKey}
          data={libraryData.entries}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          onScrollToIndexFailed={() => {}}
          extraData={refreshKey}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${refreshKey}`}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: paperTheme.colors.text }]}>
            No saved translations yet
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default DocsScreen;
