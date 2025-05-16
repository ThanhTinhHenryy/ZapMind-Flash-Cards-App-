// import Title from "@/components/common/Title";
// import SearchBar from "@/components/ui/SearchBar";
// import SetDiscover from "@/components/ui/SetDiscover";
// import { COLORS } from "@/constants/theme";
// import { testSets } from "@/data/data.test";
// import React, { useState } from "react";
// import { ScrollView, StyleSheet, View } from "react-native";

// export default function Discover() {
//   const [searchText, setSearchText] = useState("");

//   // * Search
//   const handleSearch = () => {
//     console.log("Searching:", searchText);
//   };
//   // * Add
//   const handleAdd = (title: string) => {
//     console.log(`Thêm set: ${title}`);
//   };
//   // * Press
//   const handlePreview = (title: string) => {
//     console.log(`Preview Set: ${title}`);
//     // navigation tới set muốn preview
//   };
//   return (
//     <View style={styles.discoverScreen}>
//       <Title textTitle="Discover"></Title>
//       <SearchBar
//         value={searchText}
//         onChangeText={setSearchText}
//         onSearch={handleSearch}
//       />
//       {/* Doi thanh flatlist */}
//       <ScrollView contentContainerStyle={styles.setList}>
//         {testSets.map((item, index) => (
//           <SetDiscover
//             key={index}
//             titleSet={item.titleSet}
//             creator={item.creator}
//             cards={item.cards}
//             imageUrl={item.imageUrl}
//             onPressAdd={() => handleAdd(item.titleSet)}
//             onPressPreview={() => handlePreview(item.titleSet)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   discoverScreen: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   setList: {
//     paddingVertical: 12,
//   },
// });
import Title from "@/components/common/Title";
import SearchBar from "@/components/ui/SearchBar";
import SetDiscover from "@/components/ui/SetDiscover";
import { COLORS } from "@/constants/theme";
import { getAllDecks, saveDeck } from "@/data/apiDeck";
import { getUser } from "@/data/userStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Discover() {
  interface Deck {
    id: 2;
    user_id: 1;
    name: "Daily Verbs";
    description: "Everyday English verbs";
    is_public: 0;
    created_at: "2025-05-04T02:10:42.000Z";
    image_url: "";
    sl: 10;
  }
  const [searchText, setSearchText] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const result = await getAllDecks();
      console.log(result);

      setDecks(result);
    };

    fetchDecks();
  }, []);

  const handleSearch = () => {
    console.log("Searching:", searchText);
    // Có thể thêm filter ở đây nếu muốn
  };

  const handleAdd = async (item: Deck) => {
    try {
      // Gọi API để lưu deck cho người dùng
      const userId = getUser().id;
      const data = await saveDeck(userId, item.id);
      console.log(`Đã lưu deck: ${item.name}`, data);
    } catch (error) {
      console.error("Error saving deck:", error);
    }
  };

  const handlePreview = (item: Deck) => {
    router.push({
      pathname: "/(set)/CardPreview",
      params: { setId: item.id, setTitle: item.name },
    });
  };

  return (
    <View style={styles.discoverScreen}>
      <Title textTitle="Discover" />
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />

      <ScrollView contentContainerStyle={styles.setList}>
        {decks.map((item: Deck) => (
          <SetDiscover
            key={item.id}
            titleSet={item.name}
            creator={`${item.user_id}` || "Unknown"}
            cards={item.sl}
            imageUrl={"http://192.168.193.121:5000" + item.image_url || ""}
            onPressAdd={() => handleAdd(item)}
            onPressPreview={() => handlePreview(item)}
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
