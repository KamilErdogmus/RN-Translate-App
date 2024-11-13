import AsyncStorage from "@react-native-async-storage/async-storage";
import { LibraryEntry, LibraryState } from "../atoms/libraryAtom";

const LIBRARY_STORAGE_KEY = "translator_library";

const getStorageData = async (): Promise<LibraryState | null> => {
  try {
    const data = await AsyncStorage.getItem(LIBRARY_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading storage:", error);
    return null;
  }
};

const setStorageData = async (data: LibraryState): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error writing storage:", error);
    return false;
  }
};

export const saveLibraryToStorage = async (data: LibraryState) => {
  return setStorageData(data);
};

export const loadLibraryFromStorage = async (): Promise<LibraryState> => {
  const data = await getStorageData();
  return data || { entries: [] };
};

export const deleteLibraryItem = async (
  itemId: string
): Promise<LibraryState | null> => {
  try {
    const currentData = await getStorageData();

    if (!currentData) {
      return null;
    }

    const filteredEntries = currentData.entries.filter(
      (entry: LibraryEntry) => entry.id !== itemId
    );

    const newState: LibraryState = { entries: filteredEntries };

    const saveSuccess = await setStorageData(newState);

    if (!saveSuccess) {
      throw new Error("Failed to save updated data");
    }

    return newState;
  } catch (error) {
    console.error("Delete operation failed:", error);
    throw new Error("Failed to delete item");
  }
};
