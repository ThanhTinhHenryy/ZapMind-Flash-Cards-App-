import Header from "@/components/common/Header";
import { COLORS } from "@/constants/theme";
import { sampleCards } from "@/data/data.test";
import React, { useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LearnCard = () => {
  // const [setTitle, setSetTitle] = useState("");

  const setId = 5;
  const setTitle = "Essential Words";
  const cards = sampleCards.filter((card) => card.id_set === setId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handleNext = () => {
    setIsFront(true);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Bạn đã học hết các thẻ!");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFront(true);
    } else {
      alert("Đây là thẻ đầu tiên.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title={setTitle} />
      {/* Card */}
      <View style={styles.notHeader}>
        <View style={styles.card}>
          <Image
            source={{ uri: currentCard.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {isFront ? (
            <Text style={styles.word}>{currentCard.word}</Text>
          ) : (
            <>
              <Text style={styles.meaning}>{currentCard.meaning}</Text>
              <Text style={styles.pronun}>{currentCard.pronun}</Text>
            </>
          )}
        </View>
        {/* flip se co 2 mat, neu mat la true thi la mat truoc, mean la mat sau se hien thi nghia va phien am */}
        <View style={styles.flipButton}>
          <TouchableOpacity style={styles.flip} onPress={handleFlip}>
            <Text style={styles.flipText}>Lật thẻ</Text>
          </TouchableOpacity>
        </View>
        {/* 2 nut back voi next */}
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
    // backgroundColor: COLORS.,
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
  cardText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  pronounce: {
    fontSize: 18,
    color: COLORS.grey,
    marginTop: 8,
    fontStyle: "italic",
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
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  pronun: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#6da733",
    // marginTop: 6,
  },
  meaning: {
    fontSize: 20,
    color: COLORS.primary,
  },
});

export default LearnCard;
