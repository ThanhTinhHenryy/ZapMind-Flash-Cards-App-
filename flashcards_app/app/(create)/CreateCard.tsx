import Header from "@/components/common/Header";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import { COLORS } from "@/constants/theme";
import { createCard } from "@/data/apiCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  imageUrl?: string;
};

const CreateCard = ({ imageUrl }: Props) => {
  const { setId, setTitle } = useLocalSearchParams();
  const [front_text, setFront_text] = useState("");
  const [back_text, setBack_text] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(
    imageUrl ?? null
  );

  // * Tạo card
  // * Tạo card
  const handleCreate = async (
    deck_id: any,
    front_text: any,
    back_text: any
  ) => {
    try {
      if (!front_text || !back_text) {
        alert("Vui lòng nhập đầy đủ thông tin card.");
        return;
      }

      const image = pickedImage
        ? {
            uri: pickedImage,
            name: `card_${Date.now()}.jpg`,
            type: "image/jpeg",
          }
        : undefined;

      const newCard = await createCard(
        deck_id, // deck_id, bạn thay bằng id thật tương ứng
        front_text,
        back_text,
        image
      );

      console.log("Tạo card thành công:", newCard);
      alert("Tạo card thành công!");
      router.push("/(tabs)/create");
    } catch (error: any) {
      alert("Lỗi tạo card: " + error.message);
    }
  };

  // * Chọn ảnh
  const handlePickImage = async () => {
    console.log(`Pick anh`);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Bạn cần cấp quyền truy cập ảnh để chọn ảnh đại diện cho Set.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Tạo Card" />

      <View style={styles.content}>
        <View style={styles.createContainer}>
          {/* Chon ảnh */}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handlePickImage}
          >
            {pickedImage ? (
              <Image source={{ uri: pickedImage }} style={styles.image} />
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
          {/* Field Nhap */}
          <View style={styles.inputForm}>
            <InputPlace
              placeholder="Nhập tên card"
              value={front_text}
              onChangeText={setFront_text}
            />
            <InputPlace
              placeholder="Nhập nghĩa"
              value={back_text}
              onChangeText={setBack_text}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton
            title="Tạo Card"
            onPress={() => handleCreate(setId, front_text, back_text)}
            style={styles.createButton}
          />
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
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  createContainer: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  imagePicker: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imagePickerPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  inputForm: {
    paddingTop: 20,
    width: "100%",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  input: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 16,
    alignItems: "center",
  },
  createButton: {
    borderRadius: 10,
    height: 50,
  },
});

export default CreateCard;
