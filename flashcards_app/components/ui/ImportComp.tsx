import { COLORS } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import InputPlace from "../InputPlace";

type Props = {
  front: string;
  back: string;
  setFront: (text: string) => void;
  setBack: (text: string) => void;
  imageUrl?: string;
  onPickImage?: () => void; // 👈 callback pick ảnh
};

const ImportComp = ({
  front,
  back,
  setFront,
  setBack,
  imageUrl,
  onPickImage,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <InputPlace
          placeholder="Nhập mặt trước"
          value={front}
          onChangeText={setFront}
        />
        <InputPlace
          placeholder="Nhập mặt sau"
          value={back}
          onChangeText={setBack}
        />
      </View>
      <TouchableOpacity style={styles.imagePicker} onPress={onPickImage}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePickerPlaceholder}>
            <MaterialCommunityIcons
              name="image-plus"
              size={24}
              color={COLORS.primary}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImportComp;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: "#cc33",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    marginHorizontal: 14,
    marginTop: 8,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    gap: 8,
  },
  imagePicker: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imagePickerPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
