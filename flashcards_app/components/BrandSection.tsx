import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/auth.style";

const BrandSection = () => {
  const router = useRouter();
  return (
    <View style={styles.brandSection}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/(auth)/welcome")} // 👈 Chuyển về trang welcome
        activeOpacity={0.7}
      >
        <Ionicons name="leaf" size={32} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.appName}>ZapMind</Text>
      <Text style={styles.tagline}>
        App học từ vựng bằng phương pháp flashcard
      </Text>
      <Text style={styles.tenThanhVien}>
        Thanh Tịnh - Tấn Thành - Hoàng Minh
      </Text>
    </View>
  );
};

export default BrandSection;
