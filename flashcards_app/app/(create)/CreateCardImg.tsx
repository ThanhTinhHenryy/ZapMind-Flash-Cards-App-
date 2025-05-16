// app/(set)/CreateCardScreen.tsx
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const UNSPLASH_ACCESS_KEY = "USg9jZS0nV6-oOwVFhz6V0wYIlseYpSgmkT0KBOxOcs"; // Thay bằng key thật

export default function CreateCardScreen() {
  const [frontText, setFrontText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!frontText) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${frontText}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      const urls = data.results.map((item: any) => item.urls.small);
      setImages(urls);
      setImageIndex(0);
    } catch (error) {
      console.error("Lỗi gọi Unsplash:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    if (images.length === 0) return;
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mặt trước:</Text>
      <TextInput
        style={styles.input}
        value={frontText}
        onChangeText={setFrontText}
        placeholder="Nhập từ..."
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : images.length > 0 ? (
        <Image source={{ uri: images[imageIndex] }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>Chưa có ảnh</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button title="Tạo ảnh" onPress={fetchImages} />
        <Button
          title="Đổi ảnh"
          onPress={handleNextImage}
          disabled={images.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  label: { fontSize: 18, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  placeholderImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
