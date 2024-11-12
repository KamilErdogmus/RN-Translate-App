import { atom } from "recoil";

export interface LibraryEntry {
  id: string;
  inputText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  created_at: string;
}

export interface LibraryState {
  entries: LibraryEntry[];
}

export const libraryAtom = atom<LibraryState>({
  key: "library_atom",
  default: {
    entries: [],
  },
});
