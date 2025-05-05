import BrandSection from "@/components/BrandSection";
import DontHaveAccount from "@/components/DontHaveAccount";
import Illustration from "@/components/Illustration";
import LoginButton from "@/components/LoginButton";
import Title from "@/components/common/Title";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Welcome = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/(auth)/signin");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Title textTitle="Welcome" />
      <BrandSection />
      <Illustration />
      <LoginButton
        title="Đăng Nhập"
        style={{ marginTop: 70, marginBottom: 26, marginHorizontal: 73 }}
        onPress={handleLogin}
      />
      <DontHaveAccount />
    </View>
  );
};

export default Welcome;
