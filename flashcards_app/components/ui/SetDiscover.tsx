// ** component của 1 set
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  titleSet: string;
  creator: string;
  cards: number;
  onPressAdd: () => void;
  imageUrl?: string;
};

const SetDiscover = ({
  titleSet,
  creator,
  cards,
  onPressAdd,
  imageUrl,
}: Props) => {
  return (
    <View style={styles.cardContainer}>
      {imageUrl && (
        <Image
          // !! nếu là string || imageUrl
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          style={styles.image}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{titleSet}</Text>
        <Text style={styles.creator}>Tác giả: {creator}</Text>
        <Text style={styles.cards}>{cards} thẻ</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
        <Ionicons name="add-circle-outline" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default SetDiscover; // 👈 đã đổi cho khớp tên component

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
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
  addButton: {
    padding: 4,
    marginLeft: 8,
  },
});
