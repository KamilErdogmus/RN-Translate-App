import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/UseTheme";

export default function STT({
  onTextReceived,
  language,
}: {
  onTextReceived: (text: string) => void;
  language?: string;
}) {
  const [isListening, setIsListening] = useState(false);
  const recognizedTextRef = useRef<string>("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {};

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      const recognizedText = e.value[0];
      setText(recognizedText);
      recognizedTextRef.current = recognizedText;
      onTextReceived(recognizedText);
    }
  };

  const onSpeechError = (e: any) => {
    setError(e.error?.message);
  };

  const startRecording = async () => {
    try {
      const localeMap: { [key: string]: string } = {
        en: "en-US",
        tr: "tr-TR",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        pt: "pt-PT",
        ru: "ru-RU",
        zh: "zh-CN",
        ja: "ja-JP",
        ko: "ko-KR",
      };

      const locale = language
        ? localeMap[language] || `${language}-${language.toUpperCase()}`
        : "en-US";

      await Voice.start(locale);
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
    <TouchableOpacity onPress={isListening ? stopRecording : startRecording}>
      <MaterialCommunityIcons
        name="microphone"
        size={26}
        color={isListening ? "green" : isDarkMode ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}
