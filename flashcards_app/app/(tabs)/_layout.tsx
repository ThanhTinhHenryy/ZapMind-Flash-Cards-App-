// ** File này chứa tab của app
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      // * cấu hình style
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      {/* Trang chủ || Home page*/}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Tìm Kiếm || Discover */}
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      {/* Tạo set || thẻ */}
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={size} color={COLORS.secondary} />
          ),
        }}
      />
      {/* Bookmark */}
      <Tabs.Screen
        name="bookmark"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
