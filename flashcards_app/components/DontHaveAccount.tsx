import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const HaveAccount = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          flexDirection: "row",
          marginBottom: 20,
          marginTop: 20,
          color: "white",
        }}
      >
        Chưa có tài khoản ?{" "}
        <Link href="/(auth)/signup" style={{ color: COLORS.secondary }}>
          Đăng ký
        </Link>
      </Text>
    </View>
  );
};

export default HaveAccount;
