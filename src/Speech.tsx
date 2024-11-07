import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";
import "./global.css";

export default function Speech() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Kaydı Durdur" : "Kayda Başla"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.text}>Söylenen: {text}</Text>
      {error ? <Text style={styles.errorText}>Hata: {error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});
