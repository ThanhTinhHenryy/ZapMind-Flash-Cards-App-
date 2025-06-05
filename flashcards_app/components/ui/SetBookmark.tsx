// ** component của 1 set
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  titleSet: string;
  creator: string;
  cards: number;
  onPressAdd: () => void;
  onPressPreview: () => void;
  imageUrl?: string;
};

const SetBookmark = ({
  titleSet,
  creator,
  cards,
  onPressAdd,
  onPressPreview,
  imageUrl,
}: Props) => {
  return (
    <ImageBackground
      source={imageUrl ? { uri: imageUrl } : undefined}
      style={styles.cardContainer}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{titleSet}</Text>
        <Text style={styles.creator}>Tác giả: {creator}</Text>
        <Text style={styles.cards}>Thẻ: {cards}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton} onPress={onPressPreview}>
            <Ionicons name="eye-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
            <Ionicons name="bookmark" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  creator: {
    fontSize: 13,
    color: COLORS.grey,
  },
  cards: {
    fontSize: 13,
    color: COLORS.grey,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  addButton: {
    padding: 4,
    marginHorizontal: 8,
  },
});

export default SetBookmark;
