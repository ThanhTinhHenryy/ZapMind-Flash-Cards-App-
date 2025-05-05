import { COLORS } from "@/constants/theme";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type LoginButtonProps = {
  title: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: (event: GestureResponderEvent) => void; // cho phép truyền style từ ngoài
};

const LoginButton = ({ title, style, onPress }: LoginButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.LoginButton, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.LoginButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LoginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    borderRadius: 8,
    width: 247,
    height: 56,
  },
  LoginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.surface,
  },
});

export default LoginButton;
