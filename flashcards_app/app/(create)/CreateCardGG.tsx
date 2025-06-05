import Header from "@/components/common/Header";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import { COLORS } from "@/constants/theme";
import { createCard } from "@/data/apiCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const downloadImage = async (url: string): Promise<string | null> => {
  try {
    const fileUri =
      FileSystem.documentDirectory + `temp_image_${Date.now()}.jpg`;
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    return uri;
  } catch (error) {
    console.error("Lỗi tải ảnh:", error);
    return null;
  }
};

const SERPAPI_KEY =
  "4dbefae955808f70535704e830c7e4570e1c1bcb8f59fc10ffc174d0b9221f2d"; // Replace with your actual key

const CreateCardGG = () => {
  const { setId } = useLocalSearchParams();
  const [front_text, setFront_text] = useState("");
  const [back_text, setBack_text] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!front_text) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
          front_text
        )}&tbm=isch&api_key=${SERPAPI_KEY}`
      );
      const data = await res.json();
      const urls = data.images_results.map((item: any) => item.original);
      setImages(urls);
      setImageIndex(0);
    } catch (error) {
      console.error("Lỗi gọi SerpAPI:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!front_text || !back_text) {
      alert("Vui lòng nhập đầy đủ thông tin card.");
      return;
    }

    let image: any = undefined;

    if (images[imageIndex]) {
      const localUri = await downloadImage(images[imageIndex]);
      if (localUri) {
        image = {
          uri: localUri,
          name: `card_${Date.now()}.jpg`,
          type: "image/jpeg",
        };
      }
    }

    try {
      const newCard = await createCard(setId, front_text, back_text, image);
      alert("Tạo card thành công!");
      router.push("/(tabs)/create");
    } catch (err: any) {
      alert("Lỗi tạo card: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Tạo Card" />
      <View style={styles.content}>
        <View style={styles.createContainer}>
          <View style={styles.imageBox}>
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : images.length > 0 ? (
              <>
                <Image
                  source={{ uri: images[imageIndex] }}
                  style={styles.image}
                  resizeMode="contain" // Sửa lại dòng này
                />
                <Text style={styles.counterText}>
                  {imageIndex + 1} / {images.length}
                </Text>
              </>
            ) : (
              <View style={styles.imageBoxPlaceholder}>
                <MaterialCommunityIcons
                  name="image-plus"
                  size={24}
                  color={COLORS.primary}
                />
                <Text>Nhập tên card và tạo ảnh</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonRow}>
            <Button
              title="← Back"
              onPress={() =>
                setImageIndex(
                  (prev) => (prev - 1 + images.length) % images.length
                )
              }
              disabled={images.length === 0}
            />
            <Button title="Tải ảnh" onPress={fetchImages} />
            <Button
              title="Next →"
              onPress={() =>
                setImageIndex((prev) => (prev + 1) % images.length)
              }
              disabled={images.length === 0}
            />
          </View>

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
            onPress={handleCreate}
            style={styles.createButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16, justifyContent: "space-between" },
  createContainer: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  imageBox: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    overflow: "hidden", // Đảm bảo ảnh bo góc
  },
  imageBoxPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputForm: {
    paddingTop: 20,
    width: "100%",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  counterText: {
    textAlign: "center",
    marginTop: 6,
    color: "#666",
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

export default CreateCardGG;
