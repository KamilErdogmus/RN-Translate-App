import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useTheme } from "../hooks/UseTheme";
import Toast from "react-native-toast-message";

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();

  const handleCopy = async () => {
    try {
      if (text) {
        setIsCopied(true);
        await Clipboard.setStringAsync(text);

        Toast.show({
          type: "success",
          text1: "Text coppied.",
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCopied(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleCopy}>
      <MaterialCommunityIcons
        name={isCopied ? "check" : "content-copy"}
        size={26}
        color={
          isDarkMode ? paperTheme.colors.primary : paperTheme.colors.onSurface
        }
      />
    </TouchableOpacity>
  );
};

export default CopyButton;
