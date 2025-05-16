// ** component cua 1 card preview
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  word: string;
  meaning: string;
  image: string;
  onPress: () => void;
};

const CardInSetDiscover = ({ word, meaning, image, onPress }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContent}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.meaning}>{meaning}</Text>
      </View>
      <TouchableOpacity style={styles.setting} onPress={onPress}>
        <Ionicons name="settings-outline" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default CardInSetDiscover;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    padding: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderColor: COLORS.grey,
    borderWidth: 0.5,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 8,
  },
  textContent: {
    flex: 1,
  },
  word: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.white,
  },
  meaning: {
    color: COLORS.grey,
    fontSize: 14,
  },
  setting: {},
});
