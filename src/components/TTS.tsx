import * as Speech from "expo-speech";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/UseTheme";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useState } from "react";
import Toast from "react-native-toast-message";

interface SpeechProps {
  text: string;
  language: string;
}

const TTS: React.FC<SpeechProps> = ({ text, language }) => {
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const speak = async () => {
    try {
      if (!text) {
        Toast.show({
          type: "info",
          text1: "No Text",
          text2: "There is no text to speak",
          position: "bottom",
        });
        return;
      }

      setIsPlaying(true);
      const isSpeaking = await Speech.isSpeakingAsync();

      if (isSpeaking) {
        await Speech.stop();
        setIsPlaying(false);
        return;
      }

      await Speech.speak(text, {
        language,
        pitch: 1.0,
        rate: 0.9,
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
        onError: (error) => {
          console.error("Speech error:", error);
          setIsPlaying(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to play speech",
            position: "bottom",
          });
        },
      });
    } catch (error) {
      console.error("Speech error:", error);
      setIsPlaying(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to play speech",
        position: "bottom",
      });
    }
  };

  return (
    <TouchableOpacity onPress={speak}>
      <MaterialCommunityIcons
        name="volume-high"
        size={26}
        color={
          isDarkMode ? paperTheme.colors.primary : paperTheme.colors.onSurface
        }
      />
    </TouchableOpacity>
  );
};

export default TTS;
