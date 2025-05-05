import React from "react";
import { Image, View } from "react-native";
import { styles } from "../styles/auth.style";

const Illustration = () => {
  return (
    <View style={styles.illustrationContainer}>
      <Image
        source={require("../assets/images/auth-bg-1.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
};

export default Illustration;
