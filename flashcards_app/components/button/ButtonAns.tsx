import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  context: string;
  nameAns: string;
  onPress: () => void;
};

const ButtonAns = ({ context, onPress, nameAns }: Props) => {
  return (
    // <TouchableOpacity style={styles.button} onPress={onPress}>
    //   <Text style={styles.text}>{nameAns}</Text>
    //   <Text style={styles.context}>{context}</Text>
    // </TouchableOpacity>
    // Co dinh chieu cao 90
    <TouchableOpacity style={[styles.button, { height: 90 }]} onPress={onPress}>
      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
        {context}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: COLORS.primary || "#4CAF50",
    backgroundColor: "#c3b6b6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",
  },
  context: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default ButtonAns;
