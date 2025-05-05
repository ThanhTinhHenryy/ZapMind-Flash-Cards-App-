import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons"; // Hoặc thư viện icon khác
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* View trống để cân bằng layout */}
      <View style={styles.emptyView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#074e2e99",
    marginBottom: 8,
    backgroundColor: COLORS.surfaceLight,
  },
  backButton: {
    padding: 4,
    color: COLORS.primary,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
    color: COLORS.secondary,
  },
  emptyView: {
    width: 24, // Cùng kích thước với icon back để cân bằng
  },
});

export default Header;
