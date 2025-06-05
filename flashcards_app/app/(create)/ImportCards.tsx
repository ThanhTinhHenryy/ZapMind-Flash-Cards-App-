import Header from "@/components/common/Header";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import ImportComp from "@/components/ui/ImportComp";
import { COLORS } from "@/constants/theme";
import { createCard, createSet } from "@/data/apiCard";
import { getUser } from "@/data/userStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type CardItem = {
  id: string;
  front: string;
  back: string;
  image?: {
    uri: string;
    name: string;
    type: string;
  };
};

const ImportCards = () => {
  const [cards, setCards] = useState<CardItem[]>([
    { id: Date.now().toString(), front: "", back: "", image: undefined },
  ]);

  // * Nhập mặt trước
  const [set, setSet] = useState("");
  const [des, setDes] = useState("");

  // * Chọn ảnh cho từng card
  const handlePickImage = async (cardId: string) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Bạn cần cấp quyền truy cập ảnh để chọn ảnh.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId
            ? {
                ...card,
                image: {
                  uri: asset.uri,
                  name: `card_${Date.now()}.jpg`,
                  type: "image/jpeg",
                },
              }
            : card
        )
      );
    }
  };

  // * Cập nhật front/back
  const updateCardText = (
    cardId: string,
    field: "front" | "back",
    value: string
  ) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  // * Thêm card mới
  const onPressAddMore = () => {
    const newCard: CardItem = {
      id: Date.now().toString(),
      front: "",
      back: "",
      image: undefined,
    };
    setCards((prev) => [...prev, newCard]);
  };

  // * Xóa card
  const onPressRemove = (cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleCreateDeck = async () => {
    if (!set.trim()) {
      alert("Vui lòng nhập tên deck!");
      return;
    }
    if (!des.trim()) {
      alert("Vui lòng nhập mô tả deck!");
      return;
    }
    if (cards.length === 0) {
      alert("Vui lòng thêm ít nhất 1 card!");
      return;
    }
    if (cards.some((card) => !card.front.trim() || !card.back.trim())) {
      alert("Vui lòng nhập đủ mặt trước và mặt sau cho tất cả card!");
      return;
    }

    try {
      // 1. Gọi API tạo deck
      const deckRes = await createSet({
        userId: getUser().id,
        setName: set,
        description: des,
        isPrivate: false, // Giả sử là public
        imageUri: null,
      });
      if (!deckRes || !deckRes.id) {
        alert("Tạo deck thất bại!");
        return;
      }
      const deckId = deckRes.id;

      // 2. Gọi API tạo từng card
      for (const card of cards) {
        await createCard(deckId, card.front, card.back, card.image);
      }

      alert("Tạo deck thành công!");
      router.push({
        pathname: "/(set)/CardPreview",
        params: { setId: deckId, setTitle: set },
      });
    } catch (error: any) {
      alert("Lỗi tạo deck: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Import" />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <InputPlace
          placeholder="Nhập tên deck"
          value={set}
          onChangeText={setSet}
          // onChangeText={() => {}}
        />
        <InputPlace
          placeholder="Nhập mô tả cho deck"
          value={des}
          onChangeText={setDes}
          // onChangeText={() => {}}
        />

        {cards.map((card, idx) => (
          <View key={card.id} style={{ width: "100%", marginBottom: 16 }}>
            <ImportComp
              front={card.front}
              back={card.back}
              setFront={(val) => updateCardText(card.id, "front", val)}
              setBack={(val) => updateCardText(card.id, "back", val)}
              imageUrl={card.image?.uri}
              onPickImage={() => handlePickImage(card.id)}
            />
            {/* {card.image?.uri && (
              <Image
                source={{ uri: card.image.uri }}
                style={{ width: 100, height: 100 }}
              />
            )} */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onPressRemove(card.id)}
            >
              <Ionicons name="remove-circle-outline" size={28} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={onPressAddMore}>
          <Ionicons
            name="add-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </ScrollView>

      <LoginButton
        title="Tạo Deck"
        onPress={handleCreateDeck}
        style={{ marginBottom: 16, width: "90%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  addButton: {
    marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
});

export default ImportCards;
