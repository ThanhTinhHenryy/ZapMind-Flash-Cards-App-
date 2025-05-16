import BrandSection from "@/components/BrandSection";
import DontHaveAccount from "@/components/DontHaveAccount";
import HeroSection from "@/components/HeroSection";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import Term from "@/components/Term";
import Title from "@/components/common/Title";
import { COLORS } from "@/constants/theme";
import { setUser } from "@/data/userStore";
import { loginUser } from "data/apiUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const handleLogin = async () => {
  //   console.log(JSON.stringify({ email, password }));

  //   try {
  //     const res = await fetch("http://192.168.18.121:5000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message || "Đăng nhập thất bại");
  //     }

  //     console.log("Đăng nhập thành công:", data);

  //     // TODO: Lưu token nếu cần
  //     // Chuyển sang màn hình chính
  //     router.replace("/");
  //   } catch (err: any) {
  //     console.error("Lỗi đăng nhập:", err);
  //     Alert.alert("Lỗi", err.message);
  //   }
  // };
  const handleLogin = async () => {
    console.log("goi login");

    try {
      const data = await loginUser({ email, password });
      console.log("Đăng nhập thành công:", data);
      const user = data.user;
      const token = data.token;
      console.log(user);
      setUser(user);
      // TODO: Lưu token nếu cần
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      Alert.alert("Lỗi", err.message);
    }
  };

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
        <LoginButton title="Đăng Nhập" onPress={handleLogin} />
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
