import Header from "@/components/common/Header";
import { COLORS } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { transcribeAudio } from "data/apiVoice"; // Đảm bảo đúng đường dẫn tới voiceApi.js
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const speakWord = (text: string) => {
  if (!text) return;
  Speech.speak(text, {
    language: "en-US",
    pitch: 1.0,
    rate: 0.9,
  });
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const LearnCard = () => {
  interface Card {
    id: number;
    deck_id: number;
    front_text: string;
    back_text: string;
    image_url: string;
    created_at: string;
  }
  const recordingOptions = {
    android: {
      extension: ".m4a",
      outputFormat: 2,
      audioEncoder: 3,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".caf",
      audioQuality: 12727,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  };

  const route = useLocalSearchParams();
  const title = route.title || "Học thẻ";
  const cards: Card[] = JSON.parse(route.cards as string);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [spokenText, setSpokenText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);

  // Animation
  const [flipAnim] = useState(new Animated.Value(0));
  const flipToValue = useRef(0);

  // Slide animation
  const [slideAnim] = useState(new Animated.Value(0)); // 0 là giữa

  const currentCard = cards[currentIndex];
  const correctAnswer = currentCard.front_text.trim().toLowerCase();
  const isCorrect = spokenText === correctAnswer;

  useEffect(() => {
    // Request microphone permissions on mount
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Microphone permission is required.");
      }
    })();

    return () => {
      // Cleanup recording if any
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setSpokenText("");
      setIsRecording(true);

      // Prepare recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);

      await recording.startAsync();

      recordingRef.current = recording;
    } catch (error) {
      console.error("Failed to start recording", error);
      Alert.alert("Error", "Không thể bắt đầu ghi âm.");
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      setIsRecording(false);
      setLoading(true);

      await recordingRef.current.stopAndUnloadAsync();

      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      if (!uri) {
        Alert.alert("Error", "Không lấy được file ghi âm.");
        setLoading(false);
        return;
      }

      // Tạo object audioFile để truyền sang transcribeAudio
      const audioFile = {
        uri,
        name: uri.split("/").pop() || "audio.wav",
        type: "audio/wav", // hoặc "audio/x-m4a" nếu là m4a, tùy platform
      };

      // Gọi API mới
      const transcript = await transcribeAudio(audioFile);
      console.log("client Transcript:", transcript);

      if (transcript) {
        const spoken = transcript.trim().toLowerCase();
        setSpokenText(spoken);
      } else {
        Alert.alert("Lỗi", "Không nhận được kết quả từ API.");
      }
    } catch (error) {
      console.error("Stop recording error", error);
      Alert.alert("Lỗi", "Không thể xử lý ghi âm.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: đọc file local thành base64 (expo-file-system)
  const fileToBase64 = async (uri: string): Promise<string> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (e) {
      console.error("File to base64 error:", e);
      return "";
    }
  };

  const handleFlip = () => {
    const toValue = flipToValue.current === 0 ? 180 : 0;
    Animated.timing(flipAnim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      setIsFront(toValue === 0);
      flipToValue.current = toValue;
      setSpokenText(""); // Reset kết quả khi lật thẻ
    });
  };

  // Hiệu ứng slide khi chuyển thẻ
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 150, // Giảm thời gian xuống
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFront(true);
        setSpokenText("");
        slideAnim.setValue(SCREEN_WIDTH);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150, // Giảm thời gian xuống
          useNativeDriver: true,
        }).start();
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start(() => {
          flipToValue.current = 0;
        });
      });
    } else {
      Alert.alert("Thông báo", "Bạn đã học hết các thẻ!");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 150, // Giảm thời gian xuống
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFront(true);
        setSpokenText("");
        slideAnim.setValue(-SCREEN_WIDTH);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150, // Giảm thời gian xuống
          useNativeDriver: true,
        }).start();
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start(() => {
          flipToValue.current = 0;
        });
      });
    } else {
      Alert.alert("Thông báo", "Đây là thẻ đầu tiên.");
    }
  };

  // Animation interpolate
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Header title={title.toString()} />
      <View style={styles.notHeader}>
        <View style={styles.card}>
          {/* Card front */}
          <Animated.View
            style={[
              styles.card,
              {
                backfaceVisibility: "hidden",
                transform: [
                  { rotateY: frontInterpolate },
                  { translateX: slideAnim },
                ],
                position: "absolute",
                width: "100%",
                height: "100%",
              },
            ]}
            onTouchEnd={handleFlip} // Giữ lại dòng này
          >
            <Image
              source={{
                uri: "http://192.168.26.121:5000" + currentCard.image_url,
              }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.word}>{currentCard.front_text}</Text>
            {/* Nút phát âm */}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => speakWord(currentCard.front_text)}
            >
              <MaterialCommunityIcons
                name="volume-high"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {/* Nút micro */}
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
              style={{ marginTop: 16 }}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name={isRecording ? "microphone-off" : "microphone"}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                size="small"
                color={COLORS.primary}
                style={{ marginTop: 12 }}
              />
            )}
            {spokenText !== "" && !loading && (
              <Text
                style={{ marginTop: 12, color: isCorrect ? "green" : "red" }}
              >
                {isCorrect ? "✔️ Bạn nói đúng!" : `❌ Bạn nói: "${spokenText}"`}
              </Text>
            )}
          </Animated.View>
          {/* Card back */}
          <Animated.View
            style={[
              styles.card,
              {
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                transform: [
                  { rotateY: backInterpolate },
                  { translateX: slideAnim },
                ],
              },
            ]}
            onTouchEnd={handleFlip} // Giữ lại dòng này
          >
            <Image
              source={{
                uri: "http://192.168.26.121:5000" + currentCard.image_url,
              }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.meaning}>{currentCard.back_text}</Text>
            <Text style={styles.pronun}>{""}</Text>
            {/* Nút phát âm */}
            <TouchableOpacity onPress={() => speakWord(currentCard.front_text)}>
              <MaterialCommunityIcons
                name="volume-high"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {/* Nút micro */}
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
              style={{ marginTop: 12 }}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name={isRecording ? "microphone-off" : "microphone"}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                size="small"
                color={COLORS.primary}
                style={{ marginTop: 12 }}
              />
            )}
            {spokenText !== "" && !loading && (
              <Text
                style={{ marginTop: 12, color: isCorrect ? "green" : "red" }}
              >
                {isCorrect ? "✔️ Bạn nói đúng!" : `❌ Bạn nói: "${spokenText}"`}
              </Text>
            )}
          </Animated.View>
        </View>
        {/* Nút back/next */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Đã học</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  notHeader: {
    padding: 16,
    flex: 1,
  },
  card: {
    flex: 1,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 40,
    height: 400,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  meaning: {
    fontSize: 20,
    color: COLORS.primary,
  },
  pronun: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#6da733",
  },
  flipButton: {
    alignItems: "center",
    marginVertical: 16,
  },
  flip: {
    backgroundColor: COLORS.grey,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  flipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    flex: 1,
    backgroundColor: "#e74c3c",
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#2ecc71",
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default LearnCard;
