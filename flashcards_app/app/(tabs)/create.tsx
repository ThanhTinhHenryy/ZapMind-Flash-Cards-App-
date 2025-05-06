import Title from "@/components/common/Title";
import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <Title textTitle="Tạo Card || Set" />
      <TouchableOpacity
        style={styles.setButton}
        onPress={() => console.log("Navigate to Create Set")}
      >
        <Text style={styles.buttonText}>Tạo set</Text>
      </TouchableOpacity>

      {/* Nút Tạo card và thêm vào Set */}
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => console.log("Navigate to Create Card")}
      >
        <Text style={styles.buttonText}>Tạo card và{"\n"}thêm vào Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  setButton: {
    backgroundColor: "#0F208CB0",
    borderRadius: 41,
    paddingVertical: 38,
    paddingLeft: 37,
    paddingRight: 24,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  cardButton: {
    backgroundColor: "#0F218DB0",
    borderRadius: 41,
    paddingVertical: 38,
    paddingLeft: 37,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "bold",
    flex: 1,
  },
  arrowIcon: {
    width: 24,
    height: 49,
  },
});
