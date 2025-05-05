import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type TitleProps = {
  textTitle: string;
  containerStyle?: StyleProp<ViewStyle>; // nếu muốn custom thêm
};

const Title = ({ textTitle, containerStyle }: TitleProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{textTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    letterSpacing: 0.5,
    marginBottom: 2,
    fontSize: 42,
    color: COLORS.titleColor,
  },
});

export default Title;
