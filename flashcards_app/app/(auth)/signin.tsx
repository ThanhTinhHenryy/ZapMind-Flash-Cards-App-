import BrandSection from "@/components/BrandSection";
import DontHaveAccount from "@/components/DontHaveAccount";
import HeroSection from "@/components/HeroSection";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import Term from "@/components/Term";
import Title from "@/components/common/Title";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Title textTitle="Đăng Nhập" />
      <BrandSection />
      <View style={styles.loginSection}>
        <InputPlace
          placeholder="Nhập Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputPlace
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <HeroSection />
        <LoginButton title="Đăng Nhập" />
        <DontHaveAccount />
        <Term />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginSection: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 20,
    flexGrow: 1,
  },
});
export default Signin;
