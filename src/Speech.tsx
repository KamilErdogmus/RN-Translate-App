import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "./hooks/UseTheme";
import { Text } from "react-native-paper";

export default function Speech({ onTextReceived }: { onTextReceived: any }) {
  const [isListening, setIsListening] = useState(false);
  const recognizedTextRef = useRef<string>("");
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

  const speechResultsHandler = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      const text = e.value[0];
      recognizedTextRef.current = text;
      onTextReceived?.(text);
    }
  };

  const onSpeechStart = () => {
    console.log("Speech started");
  };

  const onSpeechEnd = () => {
    setIsListening(false);
    console.log("Speech ended");
    console.log(text);
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
      setIsListening(true);
      setError("");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={isListening ? stopRecording : startRecording}>
        <MaterialCommunityIcons
          name="microphone"
          size={26}
          color={isListening ? "green" : isDarkMode ? "white" : "black"}
        />
      </TouchableOpacity>
      {text && <Text>Recognized Text: {text}</Text>}
    </>
  );
}
