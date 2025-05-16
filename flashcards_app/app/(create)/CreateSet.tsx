import Header from "@/components/common/Header";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import { COLORS } from "@/constants/theme";
import { createSet } from "@/data/apiCard";
import { getUser } from "@/data/userStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  imageUrl?: string;
};

const CreateSet = ({ imageUrl }: Props) => {
  const [setName, setSetName] = useState("");
  const [discription, setDiscription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [pickedImage, setPickedImage] = useState<string | null>(
    imageUrl ?? null
  );

  // * Tạo set
  const handleCreate = async () => {
    console.log(setName, discription, isPrivate);

    if (!setName.trim()) {
      alert("Tên set không được để trống");
      return;
    }

    try {
      const newSet = await createSet({
        userId: getUser().id,
        setName,
        description: discription,
        isPrivate,
        imageUri: pickedImage,
      });

      alert("Tạo set thành công");
      console.log("Set:", newSet);
      router.replace("/(tabs)/create");
    } catch (error) {
      alert("Tạo set thất bại");
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
  // *

  return (
    <View style={styles.container}>
      <Header title="Tạo Set" />

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
              placeholder="Nhập tên set"
              value={setName}
              onChangeText={setSetName}
            />
            <InputPlace
              placeholder="Nhập mô tả"
              value={discription}
              onChangeText={setDiscription}
            />
            {/* Private */}
            <TouchableOpacity
              style={styles.togglePrivate}
              onPress={() => setIsPrivate((prev) => !prev)}
            >
              <MaterialCommunityIcons
                name={isPrivate ? "lock-outline" : "lock-open-outline"}
                size={20}
                color={isPrivate ? "red" : "green"}
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: COLORS.grey }}>
                {isPrivate ? "Riêng tư" : "Công khai"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton
            title="Tạo Set"
            onPress={() => handleCreate()}
            style={styles.createButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  togglePrivate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Căn giữa nội dung
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 10, // Giảm padding ngang
    paddingVertical: 6, // Giảm padding dọc
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignSelf: "center",
  },
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
    marginBottom: 8,
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

export default CreateSet;
