import React from "react";
import { StyleSheet, View } from "react-native";

const HeroSection = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    height: "10%", // cho nó bằng bên signUP =))))
  },
  input: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default HeroSection;
