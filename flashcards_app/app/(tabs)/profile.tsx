import Title from "@/components/common/Title";
import LoginButton from "@/components/LoginButton";
import ProgressSet from "@/components/ui/ProgressSet";
import { COLORS } from "@/constants/theme";
import { getUser } from "@/data/userStore";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  imageUrl?: string;
  percentage?: number;
  label?: string;
  barColor?: string;
  barWidth?: number;
};

const ex_image = require("../../assets/images/set_ex.jpg");

export default function Profile({
  imageUrl,
  percentage: propPercentage,
  label: propLabel,
  barColor: propBarColor,
  barWidth: propBarWidth,
}: Props) {
  // ! set cứng
  const phanTram = 100;
  const testLabel = "Completed";
  const testBarColor = "#4CAF50"; // Green color
  const testBarWidth = 250;
  // * set cứng dữ liệu sau này đưa tên user vào
  const user = { name: "Yarushi" };

  // Sử dụng ex_image nếu imageUrl không được cung cấp
  const displayImageUrl = imageUrl ? { uri: imageUrl } : ex_image;
  // ! HARD CODE
  const percentage = phanTram;
  const label = propLabel || testLabel;
  const barColor = propBarColor || testBarColor;
  const barWidth = propBarWidth || testBarWidth;
  return (
    <View style={styles.container}>
      <Title textTitle="Profile" />
      {/* Avatar */}
      <Image source={displayImageUrl} style={styles.image} />
      {/* Ten user */}
      <Text style={{ color: COLORS.primary, marginBottom: 20 }}>
        {getUser().email}
      </Text>
      {/* Progress Set */}
      {/* *
        ở đây chưa xong, sẽ làm FlatList hiển thị tất progress của người dùng đã lưu trong bookmark
      */}
      <ProgressSet
        imageUrl={displayImageUrl}
        percentage={percentage}
        label={label}
        barColor={barColor}
        barWidth={barWidth}
      />
      <ProgressSet
        imageUrl={displayImageUrl}
        percentage={75}
        label="In Progress"
        barColor="#2196F3" // Blue
        barWidth={200}
      />
      <ProgressSet
        imageUrl={displayImageUrl}
        percentage={30}
        label="Just Started"
        barColor="#FFC107" // Amber
        barWidth={100}
      />

      <ProgressSet
        imageUrl={displayImageUrl}
        percentage={0}
        label="Not Started"
        barColor="#F44336" // Red
        barWidth={0}
      />

      {/* Log out */}
      <LoginButton
        title="Đăng xuất"
        style={{ backgroundColor: "red", height: 55, marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
});
