import ButtonAns from "@/components/button/ButtonAns";
import Header from "@/components/common/Header";
import { COLORS } from "@/constants/theme";
import { sampleCards } from "@/data/data.test";
import { useNavigation } from "@react-navigation/native";
import { shuffle } from "lodash";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// * Tao cau hoi
type Card = {
  id: number;
  id_set: number;
  word: string;
  meaning: string;
  image: string;
  pronun?: string; // Đánh dấu đây là một thuộc tính tùy chọn, có thể là string hoặc không có
};
// const generateQuestion = (cards: Card[], index: number) => {
//   const current = cards[index];
//   const otherCards = cards.filter((_, i) => i !== index);
//   const wrongAnswers = shuffle(otherCards)
//     .slice(0, 3)
//     .map((c) => c.meaning);

//   const allAnswers = shuffle([current.meaning, ...wrongAnswers]);

//   return {
//     image: current.image,
//     correctAnswer: current.meaning,
//     options: allAnswers,
//     word: current.word,
//     pronun: current.pronun,
//   };
// };

const generateQuestion = (cards: Card[], index: number) => {
  const current = cards[index];
  const otherCards = cards.filter((_, i) => i !== index);
  const wrongAnswers = shuffle(otherCards)
    .slice(0, 3)
    .map((c) => c.meaning);

  const allAnswers = shuffle([current.meaning, ...wrongAnswers]);

  return {
    image: current.image,
    correctAnswer: current.meaning,
    options: allAnswers,
    word: current.word,
    pronun: current.pronun || "", // Nếu không có pronun, có thể gán giá trị mặc định là chuỗi rỗng
  };
};

const TestSetCard = () => {
  // ! HARD CODE
  const setId = 11;
  const setTitle = "Animals Basic";
  const cards = sampleCards.filter((card) => card.id_set === setId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [question, setQuestion] = useState(generateQuestion(cards, 0));
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setQuestion(generateQuestion(cards, nextIndex));
    } else {
      setIsFinished(true);
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    handleNext();
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setQuestion(generateQuestion(cards, prevIndex));
    } else {
      alert("Đây là câu hỏi đầu tiên.");
    }
  };
  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={setTitle} />
      <View style={styles.notHeader}>
        {isFinished ? (
          <View style={[styles.testSet, styles.completedContainer]}>
            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ✅ Hoàn thành!
            </Text>
            <Text style={{ marginTop: 10, fontSize: 18 }}>
              Điểm số: {score} / {cards.length}
            </Text> */}
            <Text style={styles.completedText}>✅ Hoàn thành!</Text>
            <Text style={styles.scoreText}>
              Điểm số: {score} / {cards.length}
            </Text>
          </View>
        ) : (
          <View style={styles.testSet}>
            <Text
              style={{
                alignSelf: "center",
                color: COLORS.white,
                fontFamily: "JetbrainsMono-Medium",
                fontSize: 20,
              }}
            >
              Nghĩa của hình này ?
            </Text>
            {/* <Image source={{ uri: question.image }} style={styles.image} /> */}
            <Image
              source={
                typeof question.image === "string"
                  ? { uri: question.image }
                  : question.image
              }
              style={styles.image}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.answerRow}>
                <View style={styles.answerButton}>
                  <ButtonAns
                    nameAns="A"
                    context={question.options[0]}
                    onPress={() => handleAnswer(question.options[0])}
                  />
                </View>
                <View style={styles.answerButton}>
                  <ButtonAns
                    nameAns="B"
                    context={question.options[1]}
                    onPress={() => handleAnswer(question.options[1])}
                  />
                </View>
              </View>

              <View style={styles.answerRow}>
                <View style={styles.answerButton}>
                  <ButtonAns
                    nameAns="C"
                    context={question.options[2]}
                    onPress={() => handleAnswer(question.options[2])}
                  />
                </View>
                <View style={styles.answerButton}>
                  <ButtonAns
                    nameAns="D"
                    context={question.options[3]}
                    onPress={() => handleAnswer(question.options[3])}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
        {/* Back, next */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Câu Tiếp</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.buttonText}>Thoát</Text>
        </TouchableOpacity>
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
    padding: 20,
  },

  testSet: {
    width: "95%", // hoặc width: 320,
    height: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "flex-start",
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  backButton: {
    width: "48%", // Giảm lại thay vì flex: 1
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  nextButton: {
    width: "48%", // Giảm lại thay vì flex: 1
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
  buttonContainer: {
    gap: 12,
  },

  answerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  answerButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  completedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71", // Màu xanh lá cho phần hoàn thành
    textAlign: "center",
    marginBottom: 10,
    // alignSelf: "center",
  },

  scoreText: {
    fontSize: 20,
    color: "#f39c12", // Màu vàng cho điểm số
    textAlign: "center",
  },
  completedContainer: {
    backgroundColor: "#2c3e50", // Màu nền hơi tối cho phần hoàn thành
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  exitButton: {
    marginTop: 10,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default TestSetCard;
