import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { libraryAtom, LibraryEntry } from "../atoms/libraryAtom";
import { FlatList } from "react-native-gesture-handler";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const DocsScreen = () => {
  const libraryData = useRecoilValue(libraryAtom);
  const paperTheme = usePaperTheme();
  const { isDarkMode } = useTheme();
  console.log(libraryData);
  const renderItem = ({ item }: { item: LibraryEntry }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode
              ? paperTheme.colors.surface
              : paperTheme.colors.background,
            borderColor: paperTheme.colors.outline,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: paperTheme.colors.primary }]}>
            Original Text:
          </Text>
          <Text style={[styles.text, { color: paperTheme.colors.text }]}>
            {item.inputText}
          </Text>
        </View>

        <View style={styles.textContainer}>
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
            From: {item.sourceLanguage} → To: {item.targetLanguage}
          </Text>
          <Text
            style={[styles.smallText, { color: paperTheme.colors.secondary }]}
          >
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {libraryData.entries.length > 0 ? (
        <FlatList
          data={libraryData.entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  smallText: {
    fontSize: 12,
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
