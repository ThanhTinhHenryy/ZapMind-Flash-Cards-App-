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

const SERPAPI_KEY =
  "4dbefae955808f70535704e830c7e4570e1c1bcb8f59fc10ffc174d0b9221f2d"; // Đừng quên thay bằng key thật

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
        `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
          frontText
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

  const handleNextImage = () => {
    if (images.length === 0) return;
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (images.length === 0) return;
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
        <>
          <Image source={{ uri: images[imageIndex] }} style={styles.image} />
          <Text style={styles.counterText}>
            {imageIndex + 1} / {images.length}
          </Text>
        </>
      ) : (
        <View style={styles.placeholderImage}>
          <Text>Chưa có ảnh</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Button
          title="← Back"
          onPress={handlePrevImage}
          disabled={images.length === 0}
        />
        <Button title="Tải ảnh " onPress={fetchImages} />
        <Button
          title="Next →"
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
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
  counterText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
});
