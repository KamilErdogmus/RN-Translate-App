import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Voice from "@react-native-voice/voice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "./hooks/UseTheme";

export default function Speech() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Event Listeners'ları ayarla
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      // Component unmount olduğunda Voice'u destroy et
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    console.log("Speech started");
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
    console.log("Speech ended");
  };

  const onSpeechResults = (e: any) => {
    setText(e.value[0]);
  };

  const onSpeechError = (e: any) => {
    setError(e.error?.message);
  };

  const startRecording = async () => {
    try {
      await Voice.start("tr-TR"); // Türkçe için
      setIsRecording(true);
      setError("");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
      <MaterialCommunityIcons
        name="microphone"
        size={26}
        color={isRecording ? "green" : isDarkMode ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}
