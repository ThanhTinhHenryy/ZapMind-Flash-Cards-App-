// ** style của phần (auth)
// styles/auth.styles.ts
import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // * Brand
  brandSection: {
    alignItems: "center",
    marginTop: height * 0.08,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 42,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.grey,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
  tenThanhVien: {
    fontSize: 14,
    color: COLORS.surfaceLight,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  // *Illustration
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  illustration: {
    width: width * 0.75,
    height: width * 0.75,
    maxHeight: 280,
  },
  // * Btn
  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.surface,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.grey,
    maxWidth: 280,
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginTop: 200,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  forgotPasswordText: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  socialLoginSection: {
    marginTop: 20, // Khoảng cách phía trên
    flexDirection: "row", // Sắp xếp các nút theo hàng ngang
    justifyContent: "center", // Căn giữa các nút
    alignItems: "center", // Căn giữa theo chiều dọc
    gap: 12, // Khoảng cách giữa các nút
  },
  socialButton: {
    flexDirection: "row", // Sắp xếp biểu tượng và văn bản theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingVertical: 12, // Khoảng cách phía trên và dưới nút
    paddingHorizontal: 20, // Khoảng cách trái và phải nút
    backgroundColor: COLORS.primary, // Màu nền của nút (có thể thay đổi màu theo ý thích)
    borderRadius: 8, // Bo tròn góc nút
    elevation: 2, // Thêm hiệu ứng đổ bóng (để nhìn nổi bật hơn)
  },
  socialButtonText: {
    marginLeft: 8, // Khoảng cách giữa biểu tượng và văn bản
    fontSize: 16, // Kích thước chữ
    color: COLORS.surface, // Màu chữ của nút
    fontWeight: "bold", // Đặt chữ đậm
  },
});
