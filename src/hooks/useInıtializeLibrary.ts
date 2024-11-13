import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { libraryAtom } from "../atoms/libraryAtom";
import { loadLibraryFromStorage } from "../utils/asyncStorage";

export const useInitializeLibrary = () => {
  const setLibrary = useSetRecoilState(libraryAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLibrary = async () => {
      try {
        setIsLoading(true);
        const savedLibrary = await loadLibraryFromStorage();
        setLibrary(savedLibrary);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLibrary();
  }, []);

  return isLoading;
};
