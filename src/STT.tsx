import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface STTProps {
  onTextReceived?: (text: string) => void;
}

const STT: React.FC<STTProps> = ({ onTextReceived }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Voice event listeners'ları ayarla
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Cleanup function
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    console.log("Speech recognition started");
    setError("");
  };

  const onSpeechEnd = () => {
    console.log("Speech recognition ended");
    setIsListening(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      const text = e.value[0];
      setRecognizedText(text);
      onTextReceived?.(text);
      console.log("Recognized Text:", text);
    }
  };

  const onSpeechError = (e: any) => {
    console.error("Speech recognition error:", e);
    setError(e.error?.message || "An error occurred");
    setIsListening(false);
  };

  const startRecording = async () => {
    try {
      setError("");
      const isAvailable = await Voice.isAvailable();

      if (!isAvailable) {
        setError("Voice recognition is not available");
        return;
      }

      await Voice.start("tr-TR"); // Türkçe için
      setIsListening(true);
    } catch (e: any) {
      console.error("Error starting recording:", e);
      setError(e.message || "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e: any) {
      console.error("Error stopping recording:", e);
      setError(e.message || "Failed to stop recording");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isListening ? stopRecording : startRecording}
      >
        <MaterialCommunityIcons
          name="microphone"
          size={30}
          color={isListening ? "#ff4444" : "#444444"}
        />
      </TouchableOpacity>

      {recognizedText ? (
        <Text style={styles.recognizedText}>{recognizedText}</Text>
      ) : null}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.status}>
        {isListening ? "Listening..." : "Tap to speak"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recognizedText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333333",
  },
  errorText: {
    marginTop: 10,
    color: "#ff4444",
    fontSize: 14,
    textAlign: "center",
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    color: "#666666",
  },
});

export default STT;
