// import BrandSection from "@/components/BrandSection";
// import HaveAccount from "@/components/HaveAccount";

// import InputPlace from "@/components/InputPlace";
// import LoginButton from "@/components/LoginButton";
// import Term from "@/components/Term";
// import Title from "@/components/common/Title";
// import { COLORS } from "@/constants/theme";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <Title textTitle="Đăng Ký" />
//       <BrandSection />
//       <View style={styles.signupSection}>
//         <InputPlace
//           placeholder="Nhập Email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <InputPlace
//           placeholder="Nhập mật khẩu"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={true} // Để ẩn mật khẩu
//         />
//         <InputPlace
//           placeholder="Xác nhận mật khẩu"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry={true} // Để ẩn mật khẩu
//         />
//         <LoginButton title="Đăng Ký" />
//         <HaveAccount />
//         <Term />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   signupSection: {
//     width: "100%",
//     maxWidth: 400,
//     alignItems: "center",
//     marginTop: 20,
//     flexGrow: 1,
//   },
// });

// export default Signup;
import BrandSection from "@/components/BrandSection";
import HaveAccount from "@/components/HaveAccount";
import InputPlace from "@/components/InputPlace";
import LoginButton from "@/components/LoginButton";
import Term from "@/components/Term";
import Title from "@/components/common/Title";
import { COLORS } from "@/constants/theme";
import { registerUser } from "data/apiUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const result = await registerUser({ email, password });
      Alert.alert("Thành công", "Đăng ký thành công!");
      router.replace("/signin"); // 👈 chuyển về trang đăng nhập
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng ký thất bại.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Title textTitle="Đăng Ký" />
      <BrandSection />
      <View style={styles.signupSection}>
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
        <InputPlace
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <LoginButton title="Đăng Ký" onPress={handleSignup} />
        <HaveAccount />
        <Term />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupSection: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 20,
    flexGrow: 1,
  },
});

export default Signup;
