import Title from "@/components/common/Title";
import SearchBar from "@/components/ui/SearchBar";
import SetDiscover from "@/components/ui/SetDiscover";
import { COLORS } from "@/constants/theme";
import { testSets } from "@/data/data.test";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Discover() {
  const [searchText, setSearchText] = useState("");

  // * Search
  const handleSearch = () => {
    console.log("Searching:", searchText);
  };
  // * Add
  const handleAdd = (title: string) => {
    console.log(`Thêm set: ${title}`);
  };
  // * Press
  const handlePreview = (title: string) => {
    console.log(`Preview Set: ${title}`);
    // navigation tới set muốn preview
  };
  return (
    <View style={styles.discoverScreen}>
      <Title textTitle="Discover"></Title>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />
      {/* Doi thanh flatlist */}
      <ScrollView contentContainerStyle={styles.setList}>
        {testSets.map((item, index) => (
          <SetDiscover
            key={index}
            titleSet={item.titleSet}
            creator={item.creator}
            cards={item.cards}
            imageUrl={item.imageUrl}
            onPressAdd={() => handleAdd(item.titleSet)}
            onPressPreview={() => handlePreview(item.titleSet)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  discoverScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  setList: {
    paddingVertical: 12,
  },
});
