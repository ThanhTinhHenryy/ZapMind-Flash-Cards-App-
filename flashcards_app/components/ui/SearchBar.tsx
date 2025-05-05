// components/SearchBar.tsx
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Tìm kiếm...",
  value,
  onChangeText,
  onSearch,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={onSearch} // bấm enter cũng tìm
      />
      <TouchableOpacity onPress={onSearch}>
        <Ionicons name="search" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingRight: 10,
  },
});
