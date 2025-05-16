// import Header from "@/components/common/Header";
import { COLORS } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import { Header } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Gọi hàm này khi cần phát âm từ
const speakWord = (text: string) => {
  if (!text) return;
  Speech.speak(text, {
    language: "en-US",
    pitch: 1.0,
    rate: 0.9,
  });
};

const LearnCard = () => {
  interface Card {
    id: number;
    deck_id: number;
    front_text: string;
    back_text: string;
    image_url: string;
    created_at: string;
  }

  const route = useLocalSearchParams();
  const setTitle = route.setTitle;
  const cards: Card[] = JSON.parse(route.cards as string);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const currentCard = cards[currentIndex];

  // So sánh từ người dùng nói với từ đúng
  const isCorrect =
    spokenText.trim().toLowerCase() ===
    currentCard.back_text.trim().toLowerCase();

  useEffect(() => {
    Voice.onSpeechResults = (result) => {
      if (result.value && result.value.length > 0) {
        setSpokenText(result.value[0]);
        setIsListening(false);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setSpokenText("");
      setIsListening(true);
      await Voice.start("en-US");
    } catch (e) {
      console.error("Voice start error:", e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error("Voice stop error:", e);
    }
  };

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handleNext = () => {
    setIsFront(true);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSpokenText(""); // reset kết quả
    } else {
      alert("Bạn đã học hết các thẻ!");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFront(true);
      setSpokenText("");
    } else {
      alert("Đây là thẻ đầu tiên.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title={setTitle.toString()} />
      <View style={styles.notHeader}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "http://192.168.193.121:5000" + currentCard.image_url,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          {isFront ? (
            <Text style={styles.word}>{currentCard.front_text}</Text>
          ) : (
            <>
              <Text style={styles.meaning}>{currentCard.back_text}</Text>
              <Text style={styles.pronun}>{""}</Text>
            </>
          )}

          {/* Nút phát âm */}
          <TouchableOpacity onPress={() => speakWord(currentCard.front_text)}>
            <MaterialCommunityIcons
              name="volume-high"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {/* Nút micro */}
          <TouchableOpacity onPress={startListening}>
            <MaterialCommunityIcons
              name="microphone"
              size={24}
              color={COLORS.primary}
              style={{ marginTop: 12 }}
            />
          </TouchableOpacity>

          {/* Hiển thị kết quả */}
          {spokenText !== "" && (
            <Text style={{ marginTop: 12, color: isCorrect ? "green" : "red" }}>
              {isCorrect ? "✔️ Bạn nói đúng!" : `❌ Bạn nói: "${spokenText}"`}
            </Text>
          )}
        </View>

        {/* Nút lật thẻ */}
        <View style={styles.flipButton}>
          <TouchableOpacity style={styles.flip} onPress={handleFlip}>
            <Text style={styles.flipText}>Lật thẻ</Text>
          </TouchableOpacity>
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
  },
  image: {
    width: 180,
    height: 180,
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
