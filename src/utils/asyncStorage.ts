import AsyncStorage from "@react-native-async-storage/async-storage";
import { LibraryEntry, LibraryState } from "../atoms/libraryAtom";

const LIBRARY_STORAGE_KEY = "translator_library";

// Storage'dan veri okuma yardımcı fonksiyonu
const getStorageData = async (): Promise<LibraryState | null> => {
  try {
    const data = await AsyncStorage.getItem(LIBRARY_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading storage:", error);
    return null;
  }
};

// Storage'a veri kaydetme yardımcı fonksiyonu
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
    // Mevcut veriyi al
    const currentData = await getStorageData();
    console.log("Current data:", currentData);

    if (!currentData) {
      console.log("No data found in storage");
      return null;
    }

    // Silinecek öğe dışındakileri filtrele
    const filteredEntries = currentData.entries.filter(
      (entry: LibraryEntry) => entry.id !== itemId
    );

    // Yeni state objesi
    const newState: LibraryState = { entries: filteredEntries };

    // Storage'a kaydet
    const saveSuccess = await setStorageData(newState);

    if (!saveSuccess) {
      throw new Error("Failed to save updated data");
    }

    console.log("Successfully deleted item. New state:", newState);
    return newState;
  } catch (error) {
    console.error("Delete operation failed:", error);
    throw new Error("Failed to delete item");
  }
};

// Debug için yardımcı fonksiyon
export const debugStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(LIBRARY_STORAGE_KEY);
    console.log("Storage Debug:", {
      raw: data,
      parsed: data ? JSON.parse(data) : null,
    });
  } catch (error) {
    console.error("Debug Error:", error);
  }
};
