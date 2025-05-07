import Header from "@/components/common/Header";
import SetHome from "@/components/ui/SetHome";
import { COLORS } from "@/constants/theme";
import { testSets } from "@/data/data.test";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const ChooseSet = () => {
  // ! HARDCODE
  const set = testSets;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Chọn set chứa card sẽ tạo" />
      <View style={styles.setFrame}>
        <FlatList
          data={set}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SetHome
              titleSet={item.titleSet}
              creator={item.creator}
              cards={item.cards}
              imageUrl={item.imageUrl}
              onPressView={() =>
                // chinh dieu huong o day
                router.push({
                  pathname: "/(learn)/LearnCard",
                  params: { setId: item.id },
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  setFrame: {
    padding: 16,
  },
});

export default ChooseSet;
