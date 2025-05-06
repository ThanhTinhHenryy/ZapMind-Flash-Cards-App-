import Header from "@/components/common/Header";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import { COLORS } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  imageUrl?: string;
};

const CreateCard = ({ imageUrl }: Props) => {
  const [setName, setSetName] = useState("");
  const [discription, setDiscription] = useState("");
  const [ipa, setIpa] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(
    imageUrl ?? null
  );

  // * Tạo card
  const handleCreate = (titleName: string) => {
    console.log(`Tạo card co ten: ${titleName}`);
    // Tao xong chuyen ve trang (tabs)
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
              value={setName}
              onChangeText={setSetName}
            />
            <InputPlace
              placeholder="Nhập nghĩa"
              value={discription}
              onChangeText={setDiscription}
            />
            <InputPlace
              placeholder="Nhập phiên âm"
              value={ipa}
              onChangeText={setIpa}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton
            title="Tạo Card"
            onPress={() => handleCreate(setName)}
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
