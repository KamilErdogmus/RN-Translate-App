import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { libraryAtom } from "../atoms/libraryAtom";

const DocsScreen = () => {
  const libraryData = useRecoilValue(libraryAtom);
  console.log(libraryData);
  return <SafeAreaView></SafeAreaView>;
};

export default DocsScreen;
