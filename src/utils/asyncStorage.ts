import AsyncStorage from "@react-native-async-storage/async-storage";
import { LibraryEntry, LibraryState } from "../atoms/libraryAtom";

const LIBRARY_STORAGE_KEY = "translator_library";

export const saveLibraryToStorage = async (data: LibraryState) => {
  try {
    await AsyncStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving library:", error);
    return false;
  }
};

export const loadLibraryFromStorage = async (): Promise<LibraryState> => {
  try {
    const data = await AsyncStorage.getItem(LIBRARY_STORAGE_KEY);
    return data ? JSON.parse(data) : { entries: [] };
  } catch (error) {
    console.error("Error loading library:", error);
    return { entries: [] };
  }
};
