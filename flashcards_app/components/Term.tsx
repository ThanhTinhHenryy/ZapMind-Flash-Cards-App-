import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

const Term = () => {
  return (
    <Text style={styles.termsText}>
      Bằng cách Tiếp Tục, Bạn đồng ý với{" "}
      <Link
        href="https://www.example.com/terms"
        style={{ color: COLORS.secondary }}
      >
        Điều khoản dịch vụ
      </Link>{" "}
      và{" "}
      <Link
        href="https://www.example.com/privacy"
        style={{ color: COLORS.secondary }}
      >
        Chính sách bảo mật
      </Link>
      .
    </Text>
  );
};

const styles = StyleSheet.create({
  termsText: {
    marginTop: 30,
    fontSize: 14,
    color: COLORS.grey,
    textAlign: "center",
    marginVertical: 12,
  },
});

export default Term;
