import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  placeholder: string; // Nội dung placeholder
  value: string; // Giá trị của input
  onChangeText: (text: string) => void; // Hàm xử lý khi thay đổi giá trị
  secureTextEntry?: boolean; // Optional, dùng khi nhập mật khẩu
}

const InputPlace: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.grey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  input: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default InputPlace;
