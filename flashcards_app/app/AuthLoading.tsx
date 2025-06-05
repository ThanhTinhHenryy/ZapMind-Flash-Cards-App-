import { setUser } from "@/data/userStore";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLoading = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("jwt");
      if (token) {
        const userStr = await SecureStore.getItemAsync("user");
        if (userStr) {
          const userObj = JSON.parse(userStr);
          setUser(userObj); // Set user vào store
        }
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/signin");
      }
    };
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoading;
