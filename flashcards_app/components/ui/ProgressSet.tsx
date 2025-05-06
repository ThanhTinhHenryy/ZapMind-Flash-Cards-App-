import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons"; // For Expo projects
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// If not using Expo, use: import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  imageUrl: string;
  percentage: number;
  label: string;
  barColor: string;
  barWidth: number;
};

const ProgressSet = ({
  imageUrl,
  percentage,
  label,
  barColor,
  barWidth,
}: Props) => {
  // Determine if the task is completed (100%)
  const isCompleted = percentage === 100;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {isCompleted ? (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.success || "#4CAF50"}
          />
        ) : (
          <Ionicons
            name="ellipse-outline"
            size={24}
            color={COLORS.primary || "#2196F3"}
          />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.barBackground}>
          <View
            style={[styles.bar, { width: barWidth, backgroundColor: barColor }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
    width: 40,
    height: 40,
    marginRight: 8,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  percentage: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  label: {
    color: COLORS.grey,
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 3,
  },
  barBackground: {
    alignItems: "flex-start",
    backgroundColor: "#E0E0E0",
    borderRadius: 64,
    width: "100%",
  },
  bar: {
    height: 8,
    borderRadius: 64,
  },
});

export default ProgressSet;
